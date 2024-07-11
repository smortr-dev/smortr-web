import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const maxDuration = 60;
export const runtime = 'nodejs';

// Define a type for the file object
type ProjectFile = {
    name: string;
    description: string;
    content_type: string;
    phase: string;
    share: string;
    skills: string[];
    original_name: string;
};

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const uploaded_File = data.get('file') as File;
        const userId = data.get('userId') as string;
        const projectId = data.get('projectId') as string;
        const imageURL = data.get('fileURL') as string;

        if (!uploaded_File || !userId || !projectId) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }

        const projectRef = doc(db, "users", userId, "projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (!projectSnapshot.exists()) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const projectData = projectSnapshot.data();
        const files = projectData.files as ProjectFile[] || [];

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text", 
                            text: `
        title
        Format: [Project Name] - [Design Feature or Element] - [Content Type]
        Example: Encapsulate 01 - Urban Skyscraper - Concept Render
        
        description
        Context: Start with the setting or context of the asset with respect to the project.
        Word Limit: 80 Words or 500 characters - whichever is lesser.
        Features: Detail the specific elements shown, such as design or construction techniques, materials, and the integration of building systems.
        Domain Specific Description: Highlight any domain specific information informed by project scope and role.
        Relevance: Explain the significance of the asset in the overall project and how it plays a role in “resolving a conflict”.
        Format: [Context] + [Features] + [Domain Specific Description] + [Relevance] in one concise paragraph under Description
        
        content_type
        Categories: Render, Photograph, Sketch, Plan, Section, Elevation, Detail, Conceptual Graphic, Physical Model, Axonometric View, Map
        Selection: Choose the category that accurately reflects the nature of the uploaded content.
        
        sharing_suggestions
        Format: [Platform/Forum] as [medium of showcase] about [highlight domain expertise from asset] for [Audience]
        Word Limit: 30 Words or 200 characters - whichever is lesser.
        Example: 
        - LinkedIn as a blog about adaptive reuse for prospective clients
        - Architecture Schools as hands-on workshop about circular systems for prospective talent
        
        project_phase
        Phases: Site Study, Concept Design, Reference/Mood Board, Schematic Design, Design Development, Construction Documentation, Implementation
        Phase: Align the content with the relevant phase of the architectural project.
        
        skills
        Tagging: Avoid generic tags. Highlight domain specific skills and expertise showcased in the asset for the layman. 
        Example: Space Planning and Access Control in Architecture
        
        instructions: You are to analyze the contents of the uploaded image file and generate a JSON output based on the provided structure. The output should accurately reflect the details of the image, not the examples provided. Ensure each field (title, description, content_type, project_phase, sharing_suggestions, skills) is filled with relevant information extracted from the image. For more context, assume that the uploaded images are somewhat related to architecture and engineering to generate more sensible output in the required format.
        ` 
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageURL,
                            },
                        },
                    ],
                },
            ],
        });

        let jsonObject;
        let jsonResponse = response.choices[0].message.content;
        if (jsonResponse !== null) {
            jsonResponse = jsonResponse.replace(/```json\n|```/g, ''); // Remove the ```json and ``` from the response

            // Parse the JSON string into an object
            jsonObject = JSON.parse(jsonResponse);
        }

        // Find the index of the file that matches the uploaded file name
        const fileIndex = files.findIndex((file: ProjectFile) => file.original_name === uploaded_File.name);

        // Ensure the file is found
        if (fileIndex === -1) {
            throw new Error('File not found');
        }

        // Create a new file object with the data to be added
        const newFileData: ProjectFile = {
            name: jsonObject.title,
            description: jsonObject.description,
            content_type: jsonObject.content_type,
            phase: jsonObject.project_phase,
            share: jsonObject.sharing_suggestions,
            skills: jsonObject.skills,
            original_name: uploaded_File.name,
        };

        // Update the Firestore document with the new files array
        files[fileIndex] = newFileData; // Replace or update the file at fileIndex
        await updateDoc(projectRef, { files });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

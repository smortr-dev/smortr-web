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

        if (!uploaded_File || !userId || !projectId) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }

        const projectRef = doc(db, "users", userId, "projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (!projectSnapshot.exists()) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const file = await openai.files.create({
            file: uploaded_File,
            purpose: "assistants",
        });

        console.log(file);

        // Attach file to OpenAI thread
        const thread = await openai.beta.threads.create({
            messages: [
                {
                    role: "user",
                    content: "Follow the instructions of the assistant and return the output in JSON",
                    attachments: [
                        {
                            file_id: file.id,
                            tools: [{ type: "file_search" }]
                        }
                    ]
                }
            ]
        });

        // Run OpenAI thread
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: "asst_BsEn8iNGAiR9GEXrvSH7PDQb",
            model: "gpt-4o",
            instructions: `Task: Analyze the contents of the uploaded PDF file (related to architecture/engineering/construction) and generate a structured JSON output for upload based on the provided details. Do not include placeholder terms or examples (such as "Urban Skyscraper" or "<title>") in the output. The output must be based entirely on the content of the PDF file.

             Instructions:

            Title: Format the title as [Design Feature or Element] - [Content Type]. Create the title based on the content of the PDF and do not use any example titles.

            Description: Include [Context] + [Features] + [Domain-Specific Description] + [Relevance] in a concise paragraph under 80 words or 500 characters. The description should relate to the PDF content only, and avoid using placeholder terms.

            Content Type: Choose only for from - Render, Photograph, Sketch, Plan, Section, Elevation, Detail, Conceptual Graphic, Physical Model, Axonometric View, Map. Do not include placeholder text.

            Timestamp: Use the file creation date from metadata or information on asset if available else look up and use the current date. Format as YYYY-MM-DDTHH:MM:SSZ. Avoid using placeholder terms.

            Project Phase: Select the appropriate phase only from - Programming, Schematic Design, Design Development, Construction Documents, Bidding/Permitting, Construction Admin, References, Site Study, Post Construction. Do not use example terms.

            Skills: Tag relevant domain-specific skills, avoiding generic tags and not using placeholders or example skills.

            Output JSON format: The final output must look like this, but with real data based on the PDF content, and without any placeholder values.
            {
            "title": "Site Boundary Analysis - Plan",
            "description": "The "THIRUVERKADU[MAHALAKSHMI AVENUE]" document presents a model plan of the VHouse project, detailing the precise boundary measurements like 18.237 meters [59'-10"] and the relations with adjacent properties. This plan is crucial for understanding how VHouse fits within its immediate urban context, the constraints posed by the plot size, and the architect's response to these challenges through strategic design.",
            "content_type": "Plan",
            "timestamp": "2024-09-11T18:15:36Z",
            "project_phase": "Site Study",
            "skills": ["Urban Context Analysis" , "Land Surveying"]
            }
`,
            tools: [{ type: "file_search" }]
        });

        const messages = await openai.beta.threads.messages.list(thread.id, {
            run_id: run.id,
        });

        const message = messages.data.pop();
        if (message && message.content[0].type === "text") {
            const { text } = message.content[0];
            const { annotations } = text;
            const citations: string[] = [];

            let index = 0;
            for (let annotation of annotations) {
                const { file_citation }: any = annotation; // Type assertion or use 'any' type
                text.value = text.value.replace(annotation.text, "[" + index + "]");
                if (file_citation) {
                    const citedFile = await openai.files.retrieve(file_citation.file_id);
                    citations.push("[" + index + "]" + citedFile.filename);
                }
                index++;
            }

            console.log(typeof text.value);
            console.log(text.value);
            console.log(citations.join("\n"));

            // Clean text value to ensure it's valid JSON
            const jsonStartIndex = text.value.indexOf('{');
            const jsonEndIndex = text.value.lastIndexOf('}') + 1;
            const jsonData = text.value.substring(jsonStartIndex, jsonEndIndex);

            console.log('Extracted JSON:', jsonData);

            try {
                const texts = JSON.parse(jsonData);
                console.log(texts);
                // Retrieve the current files array from Firestore
                const files = projectSnapshot.data().files as ProjectFile[] || [];
            
                // Find the index of the file that matches the uploaded file name
                const fileIndex = files.findIndex((file: ProjectFile) => file.original_name === uploaded_File.name);
            
                // Ensure the file is found
                if (fileIndex === -1) {
                    throw new Error('File not found');
                }
            
                // Create a new file object with the data to be added
                const newFileData: ProjectFile = {
                    name: texts.title,
                    description: texts.description,
                    content_type: texts.content_type,
                    phase: texts.project_phase,
                    share: texts.sharing_suggestions,
                    skills: texts.skills,
                    original_name: uploaded_File.name,
                };
            
                // Update the Firestore document with the new files array
                files[fileIndex] = newFileData; // Replace or update the file at fileIndex
                await updateDoc(projectRef, { files });
            
                return NextResponse.json({ success: true });
            } catch (error) {
                console.error('Error updating Firestore document:', error);
                return NextResponse.json({ error: 'Failed to update Firestore' }, { status: 500 });
            }
        }

        return NextResponse.json({ success: false, message: 'No valid response from OpenAI' }, { status: 500 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

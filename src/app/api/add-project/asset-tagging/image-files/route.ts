import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const maxDuration = 60;
export const runtime = 'nodejs';

// const jsonData = {
//     title: 'Artificial Intelligence Course Project - Sudoku Solver - Report',
//     description: 'The report dives into solving Sudoku puzzles using AI, focusing on state spaces and state space trees. It utilizes an array to represent state spaces and describes the generation of state space trees from initial puzzle states. This detailed approach highlights AI methodologies in constraint-based problem-solving, demonstrating the application of theoretical principles to practical puzzles. This approach helps in resolving the complexity of large puzzle state spaces.',
//     content_type: 'Report',
//     sharing_suggestions: 'LinkedIn as a blog about AI applications in logical puzzles for computer science students',
//     project_phase: 'Research and Methodology Documentation',
//     skills: [
//       'AI Problem-Solving Techniques',
//       'State Space Representation',
//       'Constraint Satisfaction Problems'
//     ]
//   };
export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const uploaded_File = data.get('file') as File;
        const userId = data.get('userId') as string;
        const projectId = data.get('projectId') as string;
        const fileIndex = parseInt(data.get('fileIndex') as string);

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
                            tools: [{ type: "code_interpreter" }]
                        }
                    ]
                }
            ]
        });

        // Run OpenAI thread
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: "asst_c5fQIi0Vd9GHTqEri5AUAuOR",
            model: "gpt-4o",
            instructions: `title
Format: [Project Name] - [Design Feature or Element] - [Content Type]
Example: Encapsulate 01 - Urban Skyscraper - Concept Render

description
Context: Start with the setting or context of the asset with respect to the project.
Word Limit: 80 Words or 500 characters - whichever is lesser.
Features: Detail the specific elements shown, such as design or construction techniques, materials, and the integration of building systems.
Domain Specific Description: Highlight any domain specific information informed by project scope and role.
Relevance: Explain the significance of the asset in the overall project and how it plays a role in “resolving a conflict”.
Format: [Context] + [Features]+[Domain Specific Description]+[Relevance] in one concise paragraph under Description

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

Instructions:
You are to analyze the contents of the uploaded image file  and generate a JSON output based on the provided structure. The output should accurately reflect the details of the image , not the examples provided. Ensure each field  (title,description,content_type,project_phase, sharing_suggestions,skills) is filled with relevant information extracted from the image.

`,
            tools: [{ type: "code_interpreter" }]
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
            const files = projectSnapshot.data().files || [];
        
            // Ensure fileIndex is within bounds
            if (fileIndex < 0 || fileIndex >= files.length) {
                throw new Error('Invalid file index');
            }
        
            // Create a new file object with the data to be added
            const newFileData = {
                name: texts.title,
                description: texts.description,
                content_type: texts.content_type,
                phase: texts.project_phase,
                share: texts.sharing_suggestions,
                skills: texts.skills
            };
        
            // Update the Firestore document with the new files array
            files[fileIndex] = newFileData; // Replace or update the file at fileIndex
            console.log(file)
            await updateDoc(projectRef, { files });
        
            return NextResponse.json({ success: true });
        } catch (error) {
            console.error('Error updating Firestore document:', error);
            return NextResponse.json({ error: 'Failed to update Firestore' }, { status: 500 });
        }}

        return NextResponse.json({ success: false, message: 'No valid response from OpenAI' }, { status: 500 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 

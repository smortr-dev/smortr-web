import { db } from "@/lib/firebase";
import { openai } from "@/lib/openai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files = data.getAll('file') as File[];
    const userId = data.get('userId') as string;
    const projectId = data.get('projectId') as string;

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    if (!userId || !projectId) {
      return NextResponse.json({ error: 'userId or projectId not provided' }, { status: 400 });
    }

    // Get project document
    const projectRef = doc(db, "users", userId, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
      return NextResponse.json({ error: 'Project does not exist' }, { status: 404 });
    }

    const projectData = projectSnapshot.data();
    const vectorStoreId = projectData.vectorStoreId;
    const threadId = projectData.thread_id;

    if (!vectorStoreId) {
      return NextResponse.json({ error: 'Vector store ID not found in project' }, { status: 400 });
    }

    // Upload files to the existing vector store
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, {
      files: files,
    });

    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: "asst_ccbddQvI5ApkNmT6NfwDcG0W",
      model: "gpt-4o",
      instructions: `Narrative Crafter, now incorporating web and knowledge base resources, is tailored for a more in-depth exploration of building design projects. The assistant should only respond once with each user message or file upload and the response should strictly be in JSON format, written in past tense, comprises five attributes: 'Context', 'Conflict', 'Resolution', 'Reaction' and 'Question'. 'Context' refers to the internal and external influences on the project before the design solution. 'Conflict' covers the problem statement or project brief. 'Resolution' describes the design solution, showcasing how it considers the context and solves the conflict. 'Reaction' details the feedback, reactions, or metrics used to measure the solution's effectiveness. Initial user message will contain some context of the project for your reference. The user response is in JSON format with an array of objects with question and answer attributes. GPT incorporates the question and corresponding answer to the existing narrative making edits to accommodate the new information and formulate new questions to better understand the overall project and enrich the context, conflict, resolution and reaction in the further responses. The questions that should be within the 'Question' attribute array of the output should be carefully crafted such that any missing information on context, conflict, resolution and reaction can be mitigated and improved. The output should always be in JSON format, each attribute apart from 'Question' should be set to strings with the relevant generated content. The 'Question' attribute in the output JSON object should be strictly an array of ten strings which correspond to the relevant questions generated. There should only be one response from the assistant per every user message. If there is a file uploaded it should be analysed and the information should be used to enrich the narrative and for framing questions.`,
      tools: [{ type: "file_search" }],
    });

    const messages = await openai.beta.threads.messages.list(threadId, {
      run_id: run.id,
    });

    const message = messages.data.pop();
    if (message && message.content[0].type === "text") {
      const { text } = message.content[0];
      const { annotations } = text;
      const citations: string[] = [];

      let index = 0;
      for (let annotation of annotations) {
        const { file_citation } : any = annotation; // Type assertion or use 'any' type
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
      const cleanedText = text.value
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      console.log('Cleaned Text:', cleanedText);

      // Ensure the cleaned text value is a valid JSON string before parsing
      try {
        const texts = JSON.parse(cleanedText);
        console.log(texts);

        await updateDoc(projectRef, {
          Context: texts.Context,
          Conflict: texts.Conflict,
          Resolution: texts.Resolution,
          Reaction: texts.Reaction,
          questions: texts.Question,
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Failed to parse JSON response' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'No valid message content found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, response: run });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

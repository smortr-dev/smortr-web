import { db } from "@/lib/firebase";
import { openai } from "@/lib/openai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    if (!vectorStoreId) {
      return NextResponse.json({ error: 'Vector store ID not found in project' }, { status: 400 });
    }

    // Upload files to the existing vector store
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, {
      files: files,
    });

    // Create the thread using the assistant and vector store ID
    const thread = await openai.beta.threads.create({
      messages: [{ role: "user", content: "Please analyze the uploaded files." }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStoreId]
        }
      }
    });

    // Retrieve messages or responses from the thread
    const threadMessages = await openai.beta.threads.retrieve(thread.id);

    return NextResponse.json({ success: true, response: threadMessages });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

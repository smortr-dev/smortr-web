import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Ensure your API key is set in environment variables
});

// Disable Next.js's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

async function modelOpenai() {
    try {
        const assistant = await openai.beta.assistants.create({
            name: 'Test1',
            instructions: "Give summary",
            model: "gpt-3.5-turbo",
            tools: [{type: 'file_search'}]
        });
        console.log('Assistant created:', assistant);
    } catch (error) {
        console.error('Error creating assistant:', error);
    }
}

modelOpenai();

// Main handler function
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    console.log('File:', file); // Check if file is received

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create a vector store
    const vectorStore = await openai.beta.vectorStores.create({
      name: 'Test2',
    });

    // Upload the file to OpenAI
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
      files: [file], // Directly pass the File object
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading file to OpenAI:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

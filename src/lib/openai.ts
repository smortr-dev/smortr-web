require("dotenv").config()
import OpenAI,{toFile} from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Ensure your API key is set in environment variables
});

// Disable Next.js's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// export async function modelOpenai() {
//   try {
//     const assistant = await openai.beta.assistants.create({
//       name: 'Test1',
//       instructions: "Give summary for the respective pdfs uploaded.",
//       model: "gpt-3.5-turbo",
//       tools: [{ type: 'file_search' }]
//     });
//     console.log('Assistant created:', assistant);

//     // Create a vector store
//     const vectorStore = await openai.beta.vectorStores.create({
//       name: 'Test2',
//     });

//     // Link the vector store to the assistant
//     await openai.beta.assistants.update(assistant.id, {
//       tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
//     });

//     return { assistant, vectorStore };
//   } catch (error) {
//     console.error('Error creating assistant or vector store:', error);
//     throw error;
//   }
// }


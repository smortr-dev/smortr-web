import { promises as fs } from 'fs';
import path from 'path';
import OpenAI from 'openai';

const VECTOR_STORE_DIR = path.resolve(process.cwd(), 'vectorStores');

export async function getOrCreateVectorStore(openai: OpenAI, projectName: string, forceNew = false) {
    const vectorStoreFile = path.join(VECTOR_STORE_DIR, `${projectName}.txt`);

    try {
        if (!forceNew) {
            const storedId = await fs.readFile(vectorStoreFile, 'utf-8');
            return storedId.trim();
        }
    } catch (error) {
        if (!(error instanceof Error) || error.message !== 'ENOENT') {
            throw error; // Rethrow if it's not a known error
        }
    }

    // Create a new vector store
    const vectorStore = await openai.beta.vectorStores.create({ name: projectName });
    await fs.writeFile(vectorStoreFile, vectorStore.id, 'utf-8');
    return vectorStore.id;
}

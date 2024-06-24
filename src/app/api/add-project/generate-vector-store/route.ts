import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getFirestore,doc,updateDoc,getDoc } from 'firebase/firestore';
import {db,storage} from "@/lib/firebase";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "", 
});


export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request, response: Response) {
    const {userId, projectId}: {userId: string, projectId: string} = await request.json();

    try{
        const projectRef = doc(db, 'users', userId, 'projects', projectId);
        const projectSnapshot = await getDoc(projectRef);
        
        if(!projectSnapshot.exists) {
            return NextResponse.json({error: 'Project does not exist'}, {status: 404});
        }

        // const projectData = projectSnapshot.data();

        const vectorStore = await openai.beta.vectorStores.create({name: projectId});
        await updateDoc(projectRef, {vectorStoreId: vectorStore.id});

        return NextResponse.json({vectorStoreId: vectorStore.id}, {status: 200});



    }
    catch(error){
        console.error('Error processing request:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}   
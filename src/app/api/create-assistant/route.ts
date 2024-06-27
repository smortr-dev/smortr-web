import { db } from "@/lib/firebase"
import { openai } from "@/lib/openai"
import { doc, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId }: { userId: string } = await req.json()
  try {
    // const
    const assistant = await openai.beta.assistants.create({
      name: "Smortr Assistant",
      instructions: `Narrative Crafter, now incorporating web and knowledge base resources, is tailored for a more in-depth exploration of building design projects. The assistant should only respond once with each user message or file upload and the response should strictly be in JSON format, written in past tense, comprises five attributes: 'Context', 'Conflict', 'Resolution', 'Reaction' and 'Question' 'Context' refers to the internal and external influences on the project before the design solution. 'Conflict' covers the problem statement or project brief. 'Resolution' describes the design solution, showcasing how it considers the context and solves the conflict. 'Reaction' details the feedback, reactions, or metrics used to measure the solution's effectiveness. Initial user message will contain some context of the project for your reference. The user response is in JSON format with an array of objects with question and answer attributes. GPT incorporates the the question and corresponding answer to the existing narrative making edits to accommodate the new information and formulate new questions to better understand the overall project and enrich the context, conflict, resolution and reaction in the further responses. The questions that should be within the 'Question' attribute array of the output should be carefully crafted such that any missing information on context, conflict, resolution and reaction can be mitigated and improved. The output should always be in JSON format, each attribute apart from 'Question' should be set to strings with the relevant generated content. The 'Question' attribute in the output JSON object should be strictly an array of ten strings which correspond to the relevant questions generated. There should only be one response from the assistant per every user message.  If there is a file uploaded it should be analysed and the information should be used to enrich the narrative and for framing questions.`,
      tools: [{ type: "code_interpreter" }],
      model: "gpt-3.5-turbo-0125",
    })
    await updateDoc(doc(db, "users", userId), {
      assistant_id: assistant.id,
    })
    //   await updateDoc(doc(db, "users", userId), {
    return NextResponse.json({ assistant_id: assistant.id }, { status: 200 })
    //   })
  } catch (err) {
    return NextResponse.json({ error: "Some Error Occured" }, { status: 500 })
  }
}

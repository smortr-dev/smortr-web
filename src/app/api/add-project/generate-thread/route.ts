import { db } from "@/lib/firebase"
import { openai } from "@/lib/openai"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("called generate thread")
  const { userId, projectId }: { userId: string; projectId: string } =
    await req.json()
  const docRef = doc(db, "users", userId, "projects", projectId)
  try {
    const user_doc = await getDoc(doc(db, "users", userId))
    let assistant_id = undefined
    if (user_doc.exists()) {
      console.log("inside exist")
      if (user_doc.data().assistant_id) {
        assistant_id = user_doc.data().assistant_id
      } else {
        const assistant = await openai.beta.assistants.create({
          name: "Smortr Assistant",
          instructions: `Narrative Crafter, now incorporating web and knowledge base resources, is tailored for a more in-depth exploration of building design projects. The assistant should only respond once with each user message or file upload and the response should strictly be in JSON format, written in past tense, comprises five attributes: 'Context', 'Conflict', 'Resolution', 'Reaction' and 'Question' 'Context' refers to the internal and external influences on the project before the design solution. 'Conflict' covers the problem statement or project brief. 'Resolution' describes the design solution, showcasing how it considers the context and solves the conflict. 'Reaction' details the feedback, reactions, or metrics used to measure the solution's effectiveness. Initial user message will contain some context of the project for your reference. The user response is in JSON format with an array of objects with question and answer attributes. GPT incorporates the the question and corresponding answer to the existing narrative making edits to accommodate the new information and formulate new questions to better understand the overall project and enrich the context, conflict, resolution and reaction in the further responses. The questions that should be within the 'Question' attribute array of the output should be carefully crafted such that any missing information on context, conflict, resolution and reaction can be mitigated and improved. The output should always be in JSON format, each attribute apart from 'Question' should be set to strings with the relevant generated content. The 'Question' attribute in the output JSON object should be strictly an array of ten strings which correspond to the relevant questions generated. There should only be one response from the assistant per every user message.  If there is a file uploaded it should be analysed and the information should be used to enrich the narrative and for framing questions.`,
          tools: [{ type: "retrieval" }],
          // : {},
          // model: "gpt-3.5-turbo-0125",
          model: "gpt-4-turbo-preview",
        })
        await updateDoc(doc(db, "users", userId), {
          assistant_id: assistant.id,
        })
      }
      // if()
      try {
        console.log("thread creation init")
        const thread = await openai.beta.threads.create()
        await updateDoc(docRef, {
          thread_id: thread.id,
        })
        console.log("thread creation end")
        //   console.log("inside")

        return NextResponse.json(
          { thread_id: thread.id, projectId: projectId },
          { status: 200 },
        )
      } catch (err) {
        console.log(err, "error here")
        return NextResponse.json(
          { error: "Thread Creation Error" },
          { status: 500 },
        )
      }
    } else {
      return NextResponse.json({ error: "No user exists" }, { status: 500 })
    }
  } catch (err) {
    console.log(err, "error outer boundary")
    return NextResponse.json({ error: "Some issue occured" }, { status: 500 })
  }
  //   const thread = await openai.beta.threads.create()
}
// const completion = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo-0125",
//   response_format: { type: "json_object" },
//   messages: [],
// })

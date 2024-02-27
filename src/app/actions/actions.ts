"use server"

import { db } from "@/lib/firebase"
import { sendMessage } from "@/lib/sendMessage"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { moveActiveQuestions } from "@/lib/moveActiveQuestions"
import { revalidatePath } from "next/cache"
require("dotenv").config()
import sgMail from "@sendgrid/mail"
export async function initialQuestionGenerate(
  userId: string,
  projectId: string,
) {
  console.log("called intitial generate")
  //   const { userId, projectId }: { userId: string; projectId: string } =
  //   await req.json()
  try {
    // console.log("called")
    const userSnap = await getDoc(doc(db, "users", userId))
    const projectSnap = await getDoc(
      doc(db, "users", userId, "projects", projectId),
    )

    if (userSnap.exists() && projectSnap.exists()) {
      if (projectSnap.data().progress == 1) {
        return { status: "successful" }
      } else {
        await sendMail(userId, projectId)
        await updateDoc(doc(db, "users", userId, "projects", projectId), {
          progress: 1,
        })
      }
      //   console.log("inside")
      const assistant_id = userSnap.data().assistant_id
      const thread_id = projectSnap.data().thread_id

      const data = projectSnap.data()
      let msg_str = ""
      if (data.projectName) {
        msg_str += `Name of the Project:\n ${data.projectName} \n`
      }
      if (data.description) {
        msg_str += `Description:\n ${data.description}\n`
      }
      if (data.design_sector) {
        msg_str += `Design Sector:\n`
        if (typeof data.design_sector == "string") {
          msg_str += `${data.design_sector}`
        } else {
          msg_str += data.design_sector.concat(", ") + "\n"
        }
      }
      if (data.typology) {
        msg_str += `Typology:\n ${data.typology}`
      }
      if (data.scope_role) {
        msg_str += `Scope:\n`
        if (typeof data.scope_role == "string") {
          msg_str += `${data.scope_role}`
        } else {
          msg_str += data.scope_role.concat(", ") + "\n"
        }
      }
      if (data.project_type) {
        msg_str += `Project Phase:\n ${data.project_type}\n`
      }
      console.log(msg_str)
      const thread_out = await sendMessage(thread_id, assistant_id, msg_str)
      try {
        const json_message = (thread_out.data[0].content[0] as any).text.value
        const parsed_message = await JSON.parse(json_message)
        console.log(parsed_message)
        if (!parsed_message.Question)
          throw new Error("Question was not generated")
        await moveActiveQuestions(userId, projectId)
        await updateDoc(doc(db, "users", userId, "projects", projectId), {
          ...parsed_message,
          Question: undefined,
          questions: parsed_message.Question,
        })
        // parsed_message.Question.map((question))
      } catch (err) {
        console.log(err)
        return { error: "Something Happened", status: "failed" }
      }

      //   console.log(thread_out, "thread_out")
      // thread_out.data.map((dataSnip, index) => {
      //   dataSnip.content.map((content, index) => {
      //     console.log(content)
      //   })
      // })

      // const parsed_message = await

      //   print(json_message)
      // console.log(json_message)
      // console.log(thread_out)
      let pass = { status: "successful" }
      return Object({ status: "successful" })
    } else {
      throw new Error("Project or User does not exist!")
    }
  } catch (err) {
    console.log(err)
    // return NextResponse.json({ error: err }, { status: 500 })
    // Object({ status: "failed", error: err })
    return Object({ status: "failed", error: "Project or User does not exist" })
  }
}
export async function regenerateNarrative(userId: string, projectId: string) {
  
  try {
    const projectSnap = await getDoc(
      doc(db, "users", userId, "projects", projectId),
    )
    const userSnap = await getDoc(doc(db, "users", userId))
    if (projectSnap.exists() && userSnap.exists()) {
      const data = projectSnap.data()
      if (data.questions && data.answer) {
        let obj_arr: any[] = []
        data.questions.map((question: string, index: number) => {
          if (data.answer[index]) {
            obj_arr.push({ question: question, answer: data.answer[index] })
          }
        })
        if (
          obj_arr.length > 0 &&
          userSnap.data().assistant_id &&
          projectSnap.data().thread_id
        ) {
          const thread_out = await sendMessage(
            projectSnap.data().thread_id,
            userSnap.data().assistant_id,
            JSON.stringify(obj_arr),
          )
          const json_message = (thread_out.data[0].content[0] as any).text.value
          const parsed_message = await JSON.parse(json_message)
          await moveActiveQuestions(userId, projectId)
          await updateDoc(doc(db, "users", userId, "projects", projectId), {
            ...parsed_message,
            Question: undefined,
            questions: parsed_message.Question,
          })
          revalidatePath(`/add-project/edit/${projectId}`)
        }
      }
      return { status: "successful" }
    }
  } catch (err) {
    return { status: "failed", error: "An error occured" as string }
  }
}
export async function sendMail(userId: string, projectId: string) {
  try {
    const path = `users/${userId}/projects/${projectId}`
    // const body: { path: string } = await req.json()

    // const path = body.path
    console.log(process.env.TWILIO_API_KEY)
    const TWILIO_API_KEY = process.env.TWILIO_API_KEY || ""
    sgMail.setApiKey(TWILIO_API_KEY)
    const msg = {
      to: "smortrportfolios@gmail.com",
      from: "rookie26092003@gmail.com",
      subject: "New User Project Regenerate",
      text: path,
    }
    await sgMail.send(msg)
    console.log("mail sent")
    // return NextResponse.json({})
    return
    // console.log(name);
    // Get the path of the json file
  } catch (err) {
    console.log(err)
  }
  // return NextResponse.json({})
  return
}

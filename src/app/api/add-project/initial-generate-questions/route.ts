import { db } from "@/lib/firebase"
// import { Description } from "@radix-ui/react-toast"
import { doc, getDoc } from "firebase/firestore"
import { NextResponse } from "next/server"
// import sendMessage
function SpecificError() {}

SpecificError.prototype = new Error()
import { sendMessage } from "@/lib/sendMessage"
export async function POST(req: Request) {
  //   console.log("called igq")
  const { userId, projectId }: { userId: string; projectId: string } =
    await req.json()
  try {
    const userSnap = await getDoc(doc(db, "users", userId))
    const projectSnap = await getDoc(
      doc(db, "users", userId, "projects", projectId),
    )
    if (userSnap.exists() && projectSnap.exists()) {
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
      const json_message = thread_out.data[0].content[0]
      // thread_out.data.map((dataSnip, index) => {
      //   dataSnip.content.map((content, index) => {
      //     console.log(content)
      //   })
      // })

      // const parsed_message = await

      //   print(json_message)
      // console.log(json_message)
      // console.log(thread_out)
      return NextResponse.json({}, { status: 200 })
    } else {
      throw new Error("Project or User does not exist!")
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { redirect } from "next/navigation"
export const dynamic = "force-dynamic"
// import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from "next/server"

// interface projectData {
//   projectName?: string
//   uid: string
//   description?: string
//   cover?: string
// }

export async function POST(req: Request) {
  const { user, uid }: { user: string; uid: string } = await req.json()
  //   console.log("called")
  try {
    const docRef = doc(db, "users", user, "projects", uid)
    const document = await getDoc(docRef)
    if (document.exists()) {
      // console.log("document api question", document.data())
      return NextResponse.json({ questions: document.data().questions || [] })
    } else {
      throw Error("Document Doesn't Exist")
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err, questions: [] })
  }
  // console.log(user)
  //   if (user) return NextResponse.json({ ...user })
}

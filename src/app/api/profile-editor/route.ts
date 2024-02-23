import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { redirect } from "next/navigation"
export const dynamic = "force-dynamic"
// import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from "next/server"

interface projectData {
  projectName?: string
  uid: string
  description?: string
  cover?: string
}

export async function POST(req: Request) {
  // console.log("called")
  try {
    const body: { uid: string } = await req.json()

    const uid = body.uid
    // console.log(name);
    // Get the path of the json file
    const docRef = doc(db, "users", uid)
    const document = await getDoc(docRef)
    let projectData: projectData[] = []
    if (document.exists()) {
      const data = document.data()
      const projects = await getDocs(collection(db, "users", uid, "projects"))
      projects.forEach((project) => {
        let robj: projectData = { uid: project.id }

        const doc = project.data()
        if (!doc.projectName && !doc.cover) return
        if (doc.projectName) {
          robj["projectName"] = doc.projectName
        }
        if (doc.description) {
          robj["description"] = doc.description.substring(0, 100)
        }
        if (doc.cover) {
          robj["cover"] = doc.cover
        }
        projectData.push(robj)
      })
      // const projectData = projects.forEach((project)=>{
      //   let returnobj = {}

      // })
      // console.log({ ...data, projects: [...projectData] })
      // console.log(data)
      return NextResponse.json({ ...data, projects: [...projectData] })
    } else {
      return NextResponse.redirect(new URL("../feed", req.url))
    }
  } catch (err) {
    console.log("error", err)
  }
  // console.log(user)
  //   if (user) return NextResponse.json({ ...user })
}

export async function DELETE(req: Request) {
  const { projectId, caller }: { projectId: string; caller: string } =
    await req.json()
  const docRef = doc(db, "users", caller, "projects", projectId)
  try {
    const doc = await getDoc(docRef)
    if (doc.exists()) {
      console.log(doc.data(), "data")
      if (doc.data().assets) {
        await Promise.all(
          doc.data().assets.map(async (asset: string, index: number) => {
            const assetRef = ref(storage, asset)
            try {
              await deleteObject(assetRef)
            } catch (err) {
              console.log("asset", err, "number", index)
              return
            }
          }),
        )
      }
      await deleteDoc(docRef)
      console.log("done-deleting")
      let document = await getDoc(docRef)
      if (document.exists()) {
        console.log("document", document.data())
      } else {
        console.log("document-not-present")
      }
      // console.log(req.url)
      // NextResponse.json
    } else {
      throw Error("No Such Document Exists or You're not Authorized")
    }
    console.log(new URL("../profile-editor", req.url).href)
    return NextResponse.json({ status: "successful" })

    // return NextResponse.json({})
  } catch (err) {
    console.log(err)
  }
  return NextResponse.json({ status: "failed" })
}

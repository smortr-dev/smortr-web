import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
  const { projectId, caller }: { projectId: string; caller: string } =
    await req.json()
  const docRef = doc(db, "users", caller, "projects", projectId)
  try {
    const doc = await getDoc(docRef)
    if (doc.exists()) {
      // console.log(doc.data(), "data")
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
    } else {
      throw Error("No Such Document Exists or You're not Authorized")
    }
    // console.log(new URL("../profile-editor", req.url).href)
    return NextResponse.json({ status: "successful" })
  } catch (err) {
    console.log(err)
  }
  return NextResponse.json({ status: "failed" })
}

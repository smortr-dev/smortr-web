import { db, storage } from "@/lib/firebase"
import { error } from "console"
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { deleteObject, getMetadata, ref } from "firebase/storage"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
  try {
    const {
      user,
      project,
      path,
      ...rest
    }: { user: string; project: string; path: string; [key: string]: unknown } =
      await req.json()
    const docRef = doc(db, "users", user, "projects", project)
    const document = await getDoc(docRef)
    if (
      document &&
      document.data()?.assets &&
      document.data()?.files &&
      document.data()?.assets.includes(path)
    ) {
      let update = document.data()
      // console.log(path, "path")
      // console.log(update?.assets, "assets")
      const index = update?.assets?.indexOf(path)
      // console.log(index, "index")
      if (index == -1) {
        throw Error("File Not Found")
      }
      update?.assets?.splice(index, 1)
      update?.files?.splice(index, 1)
      let cover: string | undefined = undefined
      await Promise.all(
        update?.assets?.map(async (asset: string, index: number) => {
          const assetRef = ref(storage, asset)
          const meta = await getMetadata(assetRef)
          if (meta.contentType?.split("/")[0] == "image" && !cover) {
            cover = asset
          }
        }),
      )
      await updateDoc(docRef, {
        assets: update?.assets!,
        files: update?.files!,
        cover: cover,
      })
      const assetRef = ref(storage, path)
      await deleteObject(assetRef)
      return NextResponse.json({ status: "successful" })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err, status: "error" })
  }
  return NextResponse.json({ status: "error" })
}

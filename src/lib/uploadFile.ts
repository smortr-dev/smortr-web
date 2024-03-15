import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { StorageReference, uploadBytesResumable } from "firebase/storage"
import { number } from "zod"
import { db } from "./firebase"

export async function uploadFile(
  ref: StorageReference,
  files: any,
  num: number,
  userId: string,
  name: string,
  projectId?: string,
  successHandler?: () => Promise<any>,
  errHandler?: () => Promise<any>,
) {
  return new Promise((res, rej) => {
    const uploadTask = uploadBytesResumable(ref, files)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused")
            break
          case "running":
            // console.log("Upload is running")
            break
        }
      },
      async (error) => {
        try {
          if (errHandler) await errHandler
          rej(error)
        } catch (err) {
          rej(err)
        }

        // Handle unsuccessful uploads
      },
      async () => {
        try {
          if (successHandler) await successHandler()
          res(null)
        } catch (err) {
          rej(err)
        }
      },
    )
    for (let i = 0; i < num; i++) {
      setTimeout(() => {
        // console.log("uploading", i)
      }, 1000)
    }
  })
}

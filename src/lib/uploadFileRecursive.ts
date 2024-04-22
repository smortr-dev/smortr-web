import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { StorageReference, uploadBytesResumable } from "firebase/storage"
import { number } from "zod"
import { db } from "./firebase"
import { UseFormReturn } from "react-hook-form"

export async function uploadFileRecursive(
  ref: StorageReference,
  files: any,
  num: number,
  userId: string,
  projectId: string,
  name: string,
  form: UseFormReturn<
    {
      projectName: string
      files: any[]
      description?: string | undefined
      design_sector?: string[] | undefined
      typology?: string | undefined
      scope_role?: string[] | undefined
      project_type?: string | undefined
    },
    any,
    undefined
  >,
  index: number,
) {
  form.setValue(`files.${index}.isUploading`, true)
  // console.log(form.getValues(`files`)[index].percentage)
  return new Promise((res, rej) => {
    const uploadTask = uploadBytesResumable(ref, files)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log("Upload is " + progress + "% done")
        form.setValue(`files.${index}.percentage`, progress)
        // console.log(form.getValues(`files`)[index].progress, "test")

        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused")
            break
          case "running":
            // console.log("Upload is running")
            break
        }
      },
      (error) => {
        rej(error)
        // Handle unsuccessful uploads
      },
      async () => {
        const docRef = doc(db, "users", userId, "projects", projectId)
        await updateDoc(docRef, {
          assets: arrayUnion(
            `user-assets/${userId}/projects/${projectId}/${name}`,
          ),
          files: arrayUnion({
            privacy: "private",
            description: "",
            content_type: "",
            share: "",
            // privacy: "",
            note: "",
            // phase:
            phase: "",
            skills: [],
            name: `${name}`,
            original_name: files.name
          }),
        })

        console.log(
          "completed uploading",
          `user-assets/${userId}/projects/${projectId}/${name}`,
        )
        res("completed")
        // console.log("done updating", index)
        // if (
        //   !foundCover &&
        //   file.type.split("/").splice(0, 1).join("") == "image"
        // ) {
        //   try {
        //     await updateDoc(docRef, {
        //       cover: `user-assets/${current}/projects/${params.id}/${name}`,
        //     })
        //   } catch (err) {
        //     console.error(err)
        //   }
        //   foundCover = true
        // }
        // await sendMail(current!, params.id)

        // await loadInitialValues()
      },
    )
    for (let i = 0; i < num; i++) {
      setTimeout(() => {
        // console.log("uploading", i)
      }, 1000)
    }
  })
}

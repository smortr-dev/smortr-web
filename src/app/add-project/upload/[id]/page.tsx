"use client"
import { useForm } from "react-hook-form"
import Section from "../../Section"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { MultiLineInputProject } from "@/components/ui/multilineInput"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputProject } from "@/components/ui/input"
import Previews from "../../Dropzone"
// import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/app/context/AuthContext"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db, storage } from "@/lib/firebase"
import { ref, uploadBytesResumable } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function Upload({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { current } = useContext(AuthContext)
  const formSchema = z.object({
    projectName: z.string().min(1),
    description: z.string().optional(),
    files: z.any().array(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  })
  useEffect(() => {
    if (!current) return
    async function loadInitialValues() {
      try {
        const res = await fetch("/api/add-project/view", {
          method: "POST",
          body: JSON.stringify({ user: current!, uid: params.id }),
        })
        const preData = await res.json()
        console.log("preData", preData)
        if (preData?.projectName) {
          form.setValue("projectName", preData.projectName)
        }
        if (preData?.description) {
          form.setValue("description", preData.description)
        }
      } catch (err) {
        console.log(err)
      }
    }
    loadInitialValues()
  }, [])
  async function uploadContent(values: z.infer<typeof formSchema>) {
    let document: any = {}
    const docRef = doc(db, "users", current!, "projects", params.id)
    try {
      if (values.files.length > 0) {
        values.files.forEach((file: File) => {
          const name =
            file.name.split(".").slice(0, -1).join() +
            new Date().getTime() +
            "." +
            file.name.split(".").slice(-1).join()
          const storageRef = ref(
            storage,
            `user-assets/${current}/projects/${params.id}/${name}`,
          )
          const uploadTask = uploadBytesResumable(storageRef, file)
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log("Upload is " + progress + "% done")
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused")
                  break
                case "running":
                  console.log("Upload is running")
                  break
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //   const docRef = doc(db, "users", current!)
              //   setImageUrl(downloadURL)
              //   console.log("File available at", downloadURL)
              //   form.setValue("image", [])
              //   return updateDoc(docRef, {
              //     image: downloadURL,
              //     imageName: `user-assets/${current}/${name}`,
              //   })
              // })
              const docRef = doc(db, "users", current!, "projects", params.id)

              await updateDoc(docRef, {
                assets: arrayUnion(
                  `user-assets/${current}/projects/${params.id}/${name}`,
                ),
              })
            },
          )
        })
      }
      if (values.description) {
        document.description = values.description
      }
      if (values.projectName) {
        document.projectName = values.projectName
      }
      await updateDoc(docRef, document)
    } catch (err) {
      console.log(err)
    }
  }
  async function submitHandler(values: z.infer<typeof formSchema>) {
    await uploadContent(values)
    router.push(`/add-project/edit/${params.id}`)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="py-8">
            <div className="flex justify-between">
              <h3 className="inline-block text-[1.375rem] font-[500] text-[#151515] tracking-[0.01375rem] mb-6">
                {form.watch("projectName", "New Project")}
              </h3>
            </div>
            <Section active="upload" />

            <div className="mt-8 rounded-[0.88rem] px-8 bg-white py-4 ">
              <FormField
                control={form.control}
                name={`projectName`}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FormItem>
                        <FormControl>
                          <InputProject
                            {...field}
                            className={` w-[100%]  ${
                              fieldState.error
                                ? "border-[#CC3057]"
                                : " border-[#848484]"
                            }`}
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#CC3057]" />
                      </FormItem>
                    </>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`description`}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FormItem className="text-left  mt-4 w-[100%]">
                        <FormControl>
                          <MultiLineInputProject
                            placeholder={`Description

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}
                            maxLength={200}
                            rows={6}
                            {...field}
                            className={` ${
                              fieldState.error
                                ? "border-[#CC3057]"
                                : "  border-[#848484]"
                            }`}
                            required
                          />
                          {/* <span>{}</span> */}
                        </FormControl>
                        <FormMessage className="text-xs text-[#CC3057]" />
                      </FormItem>
                    </>
                  )
                }}
              />
            </div>
          </div>
          <div className="p-4 bg-white rounded-[0.88rem]">
            <h3 className="font-[500] text-[1.25rem]">Upload Content</h3>
            <Previews
              setFiles={form.setValue}
              getValues={form.getValues}
              form={form}
            />
          </div>
          <div className="my-2 relative ">
            <Button
              // onClick={()=>}
              type="submit"
              className="inline-block absolute right-0 py-2 mt-3 rounded-[0.38rem] text-white hover:border-[#6563FF] hover:bg-white hover:text-[#6563FF] transition-colors px-8 border border-transparent bg-[#6563FF] cursor-pointer"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

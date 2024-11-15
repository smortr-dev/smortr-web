// /* eslint-disable @next/next/no-img-element */
// "use client"
// import { useForm } from "react-hook-form"
// import Section from "../../Section"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { usePathname } from "next/navigation"
// import { MultiLineInputProject } from "@/components/ui/multilineInput"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { InputProject } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { UserAuth } from "@/app/context/AuthContext"
// import { doc, getDoc, updateDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { count } from "console"
// import clsx from "clsx"
// import { useHeader } from "@/app/context/HeaderContext"
// // import { regenerateNarrative, sendMail } from "@/app/actions/actions"
// import { toast } from "@/components/ui/use-toast"
// import { cn } from "@/lib/utils"
// import Regenerate from "@/components/ui/Regenerate"
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import Link from "next/link"
// import Info from "@/components/ui/info"
// // const questions: string[] = [
// //   "Who was your client, and how did you engage with them?",
// //   "What was the primary purpose of this project?",
// //   "Where did you face a challenge, and how was it overcome?",
// //   "When working on this project, was it a team effort or did you work alone?",
// //   "What is the proposed Return on Investment (ROI) for the end user? Consider financial, lifestyle, and mental aspects.",
// // ]
// export default function Edit({ params }: { params: { id: string } }) {
//   const [questions, setQuestions] = useState<string[]>([])
//   const [load, setLoad] = useState(false)
//   // const [submitStatus, setSubmitStatus] = useState(true)
//   const [projectName, setProjectName] = useState()
//   const router = useRouter()
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const formSchema = z.object({
//     answer: z.record(z.optional(z.string())),
//     Context: z.string().optional(),
//     Conflict: z.string().optional(),
//     Resolution: z.string().optional(),
//     Reaction: z.string().optional(),
//   })
//   function assignAnswer(questions: string[]): {
//     [x: string]: string | undefined
//   } {
//     let object: { [x: string]: string | undefined } = {}
//     questions.map((question) => {
//       object[question] = ""
//     })
//     return object as { [x: string]: string | undefined }
//   }
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     // defaultValues: {
//     //   answer: assignAnswer(),
//     // },
//     defaultValues: {
//       answer: {},
//       Context: "",
//       Conflict: "",
//       Resolution: "",
//       Reaction: "",
//     },
//   })
//   // form.register

//   const { setName } = useHeader()
//   const { current } = UserAuth()
//   const [deleteStatus, setDeleteStatus] = useState(false)
//   const [deleteOpen, setDeleteOpen] = useState(false)
//   const [save, setSave] = useState(false)
//   async function uploadContent(values: z.infer<typeof formSchema>) {
//     // console.log(values.answer, "values")
//     // console.log("upload called")
//     // let document: any = {}
//     setSave(true)
//     const docRef = doc(db, "users", current!, "projects", params.id)
//     try {
//       // if (values.answer) {
//       //   document.answer = values.answer
//       // }
//       // if (values.summary) {
//       //   document.summary = values.summary
//       // }
//       // document.status = "submitted"
//       // setSubmitStatus(true)

//       await updateDoc(docRef, { ...values })
//       // console.log("Upload Done")
//       // console.log("don")
//       setSave(false)
//       toast({
//         // variant: "destructive",
//         title: "Updated Successfully",
//         // className: cn(
//         //   "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
//         // ),
//       })
//     } catch (err) {
//       setSave(false)
//       toast({
//         // className: cn(
//         //   "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
//         // ),
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//       })
//       console.log(err)
//     }
//   }

//   async function submitHandler(values: z.infer<typeof formSchema>) {
//     // if (submitStatus) return
//     // console.log(values)
//     // console.log("init")
//     try {
//       // console.log("initiated")
//       await uploadContent(values)
//       // console.log("called submit")
//       // const res = await fetch("/api/profile", {
//       //     method: "POST",
//       //     body: JSON.stringify({ name: name }),
//       //   })
//       //   const profileData: Profile = await res.json()
//       //   // console.log(profileData, "profileData");
//       //   // console.log(profileData);
//       // await fetch("/api/send-mail", {
//       //   method: "POST",
//       //   body: JSON.stringify({
//       //     path: `users/${current!}/projects/${params.id}`,
//       //   }),
//       // })
//       // await sendMail(current!, params.id)
//     } catch (err) {
//       console.log(err)
//     }
//     // router.push(`/add-project/view/${params.id}`)
//   }

//   useEffect(() => {
//     if (!current) return

//     // if (typeof window === "undefined") return
//     async function getData() {
//       try {
//         const questions_res = await fetch("/api/get-questions", {
//           method: "POST",
//           body: JSON.stringify({ user: current!, uid: params.id }),
//         })
//         const questions_data = await questions_res.json()
//         // console.log(questions_data, "questions_data")
//         if (!questions_data.error) {
//           setQuestions(questions_data.questions)
//         } else {
//           setQuestions([])
//         }
//         const docRef = doc(db, "users", current!, "projects", params.id)
//         const docRes = await getDoc(docRef)
//         if (docRes.exists()) {
//           // console.log(docRes.data())
//           // const assets: any[] = docRes.data().assets
//           const data = docRes.data()
//           if (!data.progress || data?.progress == 0) {
//             router.push(`/add-project/upload/${params.id}`)
//             return
//           }
//           // if (data?.progress == 0) {
//           //   return
//           // }
//           if (data.projectName) {
//             setProjectName(docRes.data().projectName)
//           }
//           if (data.answer) {
//             if (Array.isArray(data.answer)) {
//               let obj: any = {}
//               data.answer.map((item, index) => {
//                 obj[`${index}`] = item
//               })
//               await updateDoc(docRef, { answer: obj })
//               form.setValue("answer", obj)
//             } else {
//               form.setValue("answer", data.answer)
//             }
//             // console.log(form.getValues("answer"))
//           }
//           if (data.Context) {
//             form.setValue("Context", data.Context)
//           }
//           if (data.Conflict) {
//             form.setValue("Conflict", data.Conflict)
//           }
//           if (data.Resolution) {
//             form.setValue("Resolution", data.Resolution)
//           }
//           if (data.Reaction) {
//             form.setValue("Reaction", data.Reaction)
//           }
//           // if (data.summary) {
//           //   form.setValue("summary", data.summary)
//           // }
//           // if (data.status) {
//           //   if (data.status == "generated") {
//           //     setSubmitStatus(false)
//           //   } else {
//           //     setSubmitStatus(true)
//           //   }
//           // } else {
//           //   setSubmitStatus(false)
//           // }
//           // console.log(data)
//           setLoad(true)
//           // console.log(assets, "assets")
//         } else {
//           throw Error("No document Exists")
//         }
//       } catch (err) {
//         console.log("error")
//         console.log(err)
//       }
//     }
//     getData()
//   }, [])

//   return (
//     load && (
//       <>
//         <div className="sticky  mb-4 w-full py-1 top-0 z-[100] justify-center px-16 flex bg-white">
//           {/* <div className="absolute translate-x-[-50%] left-[50%]"> */}
//           <div className="absolute left-16">
//             <Link href={`/profile-editor`}>
//               <div className=" hover:bg-gray-200 p-2 rounded-md transition-colors flex justify-center items-center font-bold text-xl">
//                 <div className="inline-block  mr-2">Projects</div>
//                 <div className="inline-block  mr-2">&gt;</div>
//                 <div className="inline-block ">{projectName}</div>
//               </div>
//             </Link>
//           </div>
//           <div className="absolute right-16">
//             <Button
//               disabled={!load || save}
//               onClick={async () => {
//                 try {
//                   // console.log("clicked")
//                   // form.trigger()
//                   // console.log("form values", form.getValues())
//                   // console.log(form.formState.errors, "errors")
//                   await form.handleSubmit(submitHandler)()
//                   // // form.trigger()
//                   // if (form.formState.isValid)
//                   // await submitHandler(form.getValues())
//                 } catch (err) {
//                   console.log(err)
//                 }
//                 // if (move) {
//                 //   router.push(`/add-project/edit/${params.id}`)
//                 // }
//               }}
//               className="ml-2 inline-block bg-[#6563FF] border border-transparent text-white rounded-[0.38rem] hover:text-[#6563FF] hover:border-[#6563FF] hover:bg-white transition-colors"            >
//               Save
//             </Button>
//             <Button
//               disabled={!load || save}
//               onClick={async (e) => {
//                 e.preventDefault()
//                 router.push("/profile-editor")
//               }}
//               className="ml-2 inline-block bg-white border border-[#6563FF] text-[#6563FF] rounded-[0.38rem] hover:text-white hover:bg-[#6563FF] hover:border-transparent transition-colors"
//             >
//               Cancel
//             </Button>
//           </div>
//           <div className="flex relative items-center">
//             <Button
//               onClick={async (e) => {
//                 e.preventDefault()
//                 // console.log("done")

//                 await form.handleSubmit(submitHandler)()
//                 // console.log("done submitting")
//                 router.push(`/add-project/upload/${params.id}`)
//               }}
//               disabled={save}
//               className="mx-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"

//               // type="submit"
//               // className="ml-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
//             >
//               <img src="/arrow_prev.svg" className="w-8" alt="prev" />
//             </Button>
//             <Section active="edit" load={load} move={true} />
//             <Button
//               onClick={async (e) => {
//                 e.preventDefault()
//                 // console.log("done")
//                 await form.handleSubmit(submitHandler)()
//                 router.push(`/add-project/view/${params.id}`)
//               }}
//               // disabled={ }
//               disabled={!load || save}
//               className="ml-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
//             >
//               <img src="/arrow_next.svg" className="w-8" alt="next" />
//             </Button>
//           </div>
//           {/* </div> */}
//         </div>
//         <div className="bg-[#ECECEC] pt-10 px-32 pb-20">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(submitHandler, (err, e) =>
//                 console.log(err, e),
//               )}
//             >
//               {/* <Form {...form2}>
//         <form> */}
//               <div className="px-8 pt-4 pb-4 bg-white rounded-[0.88rem]">
//                 <div className=" flex ">
//                   <span className="inline-block font-[600] text-[1.2rem] text-[#060606]">
//                     Project Narrative
//                   </span>
//                   <div className="ml-4">
//                     <Info
//                       text="A project narrative typically encompasses a detailed description of the project's objectives, background information, methods, anticipated challenges, expected results, timeline, team responsibilities, and communication strategies

// This breakdown allows for a clear and logical progression from setting the stage (Context), introducing challenges or obstacles (Conflict), outlining how these are addressed (Resolution), and finally, describing the outcomes or responses (Reaction). This framework helps in presenting a cohesive and engaging narrative that effectively communicates the project's journey and impact.
// "
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center font-[500] text-[0.875rem]">
//                     {/* {load && submitStatus && (
//                   <span className="mr-6 text-[#cc3057] ">
//                     We will email you when your content has been processed
//                   </span>
//                 )} */}
//                     {/* <Button
//                     // disabled={submitStatus}
//                     // type="submit"
//                     type="submit"
//                     onClick={async (e) => {
//                       e.preventDefault()
//                       try {
//                         console.log("clicked")
//                         await form.handleSubmit(uploadContent)()
//                         const res = await regenerateNarrative(
//                           current!,
//                           params.id,
//                         )
//                         console.log("regenerate", res)
//                       } catch (err) {
//                         console.log(err, "error")
//                       }
//                     }}
//                     className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
//                   >
//                     Regenerate
//                   </Button> */}
//                     {/* <Regenerate
//                       handler={async (e) => {
//                         e.preventDefault()
//                         try {
//                           console.log("clicked")
//                           await form.handleSubmit(uploadContent)()
//                           const res = await regenerateNarrative(
//                             current!,
//                             params.id,
//                           )
//                           console.log("regenerate", res)
//                         } catch (err) {
//                           console.log(err, "error")
//                         }
//                       }}
//                     /> */}
//                   </div>
//                 </div>
//                 <p className="ml-3 mt-2 text-sm text-gray-600">
//                   Crafting the project&apos;s compelling story from inception to
//                   impact, encapsulating its objectives, strategies, challenges,
//                   and achievements in a concise narrative.
//                 </p>
//                 <FormField
//                   control={form.control}
//                   name={`Context`}
//                   render={({ field, fieldState }) => {
//                     return (
//                       <>
//                         <FormItem className="text-left  mt-4 w-[100%]">
//                           <FormField
//                             control={form.control}
//                             name={`Context`}
//                             render={({ field, fieldState }) => {
//                               return (
//                                 <>
//                                   <FormItem className="text-left  mt-4 w-[100%]">
//                                     <FormLabel className="pl-4 text-[0.95rem] font-[500]">
//                                       Context
//                                     </FormLabel>
//                                     <FormControl>
//                                       <MultiLineInputProject
//                                         placeholder={`Write your answers here..`}
//                                         // maxLength={3000}

//                                         rows={5}
//                                         {...field}
//                                         // defaultValue={""}
//                                         className={` ${
//                                           fieldState.error
//                                             ? "border-[#CC3057]"
//                                             : "  border-[#848484]"
//                                         }`}
//                                         // required
//                                       />
//                                       {/* <span>{}</span> */}
//                                     </FormControl>
//                                     <FormMessage className="text-xs text-[#CC3057]" />
//                                   </FormItem>
//                                 </>
//                               )
//                             }}
//                           />
//                           <FormMessage className="text-xs text-[#CC3057]" />
//                         </FormItem>
//                       </>
//                     )
//                   }}
//                 />
//                 <FormField
//                   control={form.control}
//                   name={`Conflict`}
//                   render={({ field, fieldState }) => {
//                     return (
//                       <>
//                         <FormItem className="text-left  mt-4 w-[100%]">
//                           <FormLabel className="pl-4 text-[0.95rem] font-[500]">
//                             Conflict
//                           </FormLabel>
//                           <FormControl>
//                             <MultiLineInputProject
//                               placeholder={`Write your answers here..`}
//                               // maxLength={3000}
//                               // maxLength={3000}
//                               rows={5}
//                               {...field}
//                               // defaultValue={""}
//                               className={` ${
//                                 fieldState.error
//                                   ? "border-[#CC3057]"
//                                   : "  border-[#848484]"
//                               }`}
//                               // required
//                             />
//                             {/* <span>{}</span> */}
//                           </FormControl>
//                           <FormMessage className="text-xs text-[#CC3057]" />
//                         </FormItem>
//                       </>
//                     )
//                   }}
//                 />
//                 <FormField
//                   control={form.control}
//                   name={`Resolution`}
//                   render={({ field, fieldState }) => {
//                     return (
//                       <>
//                         <FormItem className="text-left  mt-4 w-[100%]">
//                           <FormLabel className="pl-4 text-[0.95rem] font-[500]">
//                             Resolution
//                           </FormLabel>
//                           <FormControl>
//                             <MultiLineInputProject
//                               placeholder={`Write your answers here..`}
//                               // maxLength={3000}
//                               rows={5}
//                               {...field}
//                               // defaultValue={""}
//                               className={` ${
//                                 fieldState.error
//                                   ? "border-[#CC3057]"
//                                   : "  border-[#848484]"
//                               }`}
//                               // required
//                             />
//                             {/* <span>{}</span> */}
//                           </FormControl>
//                           <FormMessage className="text-xs text-[#CC3057]" />
//                         </FormItem>
//                       </>
//                     )
//                   }}
//                 />
//                 <FormField
//                   control={form.control}
//                   name={`Reaction`}
//                   render={({ field, fieldState }) => {
//                     return (
//                       <>
//                         <FormItem className="text-left  mt-4 w-[100%]">
//                           <FormLabel className="pl-4 text-[0.95rem] font-[500]">
//                             Reaction
//                           </FormLabel>
//                           <FormControl>
//                             <MultiLineInputProject
//                               placeholder={`Write your answers here..`}
//                               // maxLength={3000}
//                               rows={5}
//                               {...field}
//                               // defaultValue={""}
//                               className={` ${
//                                 fieldState.error
//                                   ? "border-[#CC3057]"
//                                   : "  border-[#848484]"
//                               }`}
//                               // required
//                             />
//                             {/* <span>{}</span> */}
//                           </FormControl>
//                           <FormMessage className="text-xs text-[#CC3057]" />
//                         </FormItem>
//                       </>
//                     )
//                   }}
//                 />
//               </div>
//               <div className="py-8 pt-6">
//                 {/* <Section active="edit" move={true} load={load} /> */}

//                 <div className="mt-8 rounded-[0.88rem] px-8 bg-white py-4 ">
//                   <div className=" flex ">
//                     <span className="inline-block font-[600] text-[1.2rem] text-[#060606]">
//                       Questions
//                     </span>
//                     <div className="ml-4">
//                       <Info
//                         text="These questions will help in delving deeper into the project's narrative, ensuring a comprehensive and detailed account of its journey and impact.

// Engage users in a structured dialogue to enhance their project narrative by exploring key aspects such as goals, challenges, strategies, outcomes, timeline, team roles, communication plans and so on."
//                       />
//                     </div>
//                   </div>
//                   <p className="ml-3 mt-2 text-sm text-gray-600">
//                     Answer a series of questions that delve into the core
//                     aspects of the project to enhance the project narrative.
//                   </p>
//                   <div className="flex justify-between items-center mt-3 text-[0.875rem] font-[400] text-[##060606]">
//                     <div className="inline-block select-none text-[1rem] font-[600]">
//                       {/* What was the initial inspiration behind the Thamizh Futurism
//                   movement and this gallery show? */}
//                       {questions[currentQuestion]}
//                     </div>
//                     <div className="flex ">
//                       <Button
//                         disabled={currentQuestion == 0}
//                         onClick={(e) => {
//                           e.preventDefault()
//                           // console.log(form.getValues())
//                           setCurrentQuestion((prev) => currentQuestion - 1)
//                         }}
//                         // type="submit"
//                         className="select-none border border-[#6563FF] bg-[#EAEAEA] px-8 text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
//                       >
//                         Back
//                       </Button>
//                       <Button
//                         disabled={currentQuestion == questions.length - 1}
//                         onClick={(e) => {
//                           e.preventDefault()
//                           // console.log(form.getValues())
//                           setCurrentQuestion((prev) => currentQuestion + 1)
//                         }}
//                         // type="submit"
//                         className="select-none border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
//                       >
//                         Next
//                       </Button>
//                     </div>
//                   </div>
//                   {questions.map((question, index) => {
//                     return (
//                       <FormField
//                         key={index}
//                         control={form.control}
//                         name={`answer.${index}`}
//                         // name={`answer.${currentQuestion}`}
//                         render={({ field, fieldState }) => {
//                           return (
//                             <>
//                               <FormItem
//                                 className={clsx(
//                                   "text-left mt-2 w-[100%]",
//                                   currentQuestion == index ? "block" : "hidden",
//                                 )}
//                               >
//                                 <FormControl>
//                                   <MultiLineInputProject
//                                     placeholder={`Write your answers here..`}
//                                     maxLength={1000}
//                                     rows={6}
//                                     {...field}
//                                     value={field.value || ""}
//                                     onChange={(e) => {
//                                       // console.log("called")
//                                       // let prev = form.getValues("answer")
//                                       // prev![currentQuestion] = e.target.value
//                                       // return form.setValue(`answer`, prev)
//                                       return field.onChange(e.target.value)
//                                       // console.log(form.getValues("answer"))
//                                     }}
//                                     // onChange={()}
//                                     className={` ${
//                                       fieldState.error
//                                         ? "border-[#CC3057]"
//                                         : "  border-[#848484]"
//                                     }`}
//                                     // required
//                                   />
//                                   {/* <span>{}</span> */}
//                                 </FormControl>
//                                 <FormMessage className="text-xs text-[#CC3057]" />
//                               </FormItem>
//                             </>
//                           )
//                         }}
//                       />
//                     )
//                   })}
//                   <div className="flex my-2 mt-4 justify-end">
//                     <Button
//                       disabled={!load || save}
//                       className="inline p-1 px-2 rounded-md text-sm bg-black text-white border-black border"
//                       onClick={async (e) => {
//                         // print("submit")
//                         // console.log("submit")
//                         e.preventDefault()
//                         // console.log(form.getValues(), "submite Values")
//                         try {
//                           await uploadContent(form.getValues())
//                           // console.log("submission complete")
//                         } catch (err) {
//                           console.log(err, "submit error")
//                         }
//                       }}
//                     >
//                       Submit Changes
//                     </Button>
//                     {/* <Regenerate handler={} /> */}
//                   </div>
//                 </div>
//               </div>
//               <div className=" h-[1px] w-full"></div>

//               {/* </form>
//       </Form> */}
//             </form>
//           </Form>
//         </div>
//       </>
//     )
//   )
// }

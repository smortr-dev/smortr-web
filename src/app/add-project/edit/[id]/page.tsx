"use client"
import { useForm } from "react-hook-form"
import Section from "../../Section"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserAuth } from "@/app/context/AuthContext"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { count } from "console"
import clsx from "clsx"
import { useHeader } from "@/app/context/HeaderContext"
// const questions: string[] = [
//   "Who was your client, and how did you engage with them?",
//   "What was the primary purpose of this project?",
//   "Where did you face a challenge, and how was it overcome?",
//   "When working on this project, was it a team effort or did you work alone?",
//   "What is the proposed Return on Investment (ROI) for the end user? Consider financial, lifestyle, and mental aspects.",
// ]
export default function Edit({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<string[]>([])
  const [load, setLoad] = useState(false)
  // const [submitStatus, setSubmitStatus] = useState(true)
  const [projectName, setProjectName] = useState()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const formSchema = z.object({
    answer: z.record(z.optional(z.string())),
    summary: z.string().optional(),
  })
  function assignAnswer(): { [x: string]: string | undefined } {
    let object: { [x: string]: string | undefined } = {}
    questions.map((question) => {
      object[question] = ""
    })
    return object as { [x: string]: string | undefined }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   answer: assignAnswer(),
    // },
    // defaultValues: {
    //   answer: assignAnswer(),
    // },
  })
  form.register

  const { setName } = useHeader()
  const { current } = UserAuth()

  async function uploadContent(values: z.infer<typeof formSchema>) {
    // console.log(values, "values")
    let document: any = {}
    const docRef = doc(db, "users", current!, "projects", params.id)
    try {
      if (values.answer) {
        document.answer = values.answer
      }
      if (values.summary) {
        document.summary = values.summary
      }
      // document.status = "submitted"
      // setSubmitStatus(true)
      await updateDoc(docRef, document)
      // console.log("Upload Done")
    } catch (err) {
      console.log(err)
    }
  }
  async function submitHandler(values: z.infer<typeof formSchema>) {
    // if (submitStatus) return
    await uploadContent(values)
    // const res = await fetch("/api/profile", {
    //     method: "POST",
    //     body: JSON.stringify({ name: name }),
    //   })
    //   const profileData: Profile = await res.json()
    //   // console.log(profileData, "profileData");
    //   // console.log(profileData);
    await fetch("/api/send-mail", {
      method: "POST",
      body: JSON.stringify({
        path: `users/${current!}/projects/${params.id}`,
      }),
    })
    router.push(`/add-project/view/${params.id}`)
  }
  useEffect(() => {
    if (!current) return

    // if (typeof window === "undefined") return
    async function getData() {
      try {
        const questions_res = await fetch("/api/get-questions", {
          method: "POST",
          body: JSON.stringify({ user: current!, uid: params.id }),
        })
        const questions_data = await questions_res.json()
        // console.log(questions_data, "questions_data")
        if (!questions_data.error) {
          setQuestions(questions_data.questions)
        } else {
          setQuestions([])
        }
        const docRef = doc(db, "users", current!, "projects", params.id)
        const docRes = await getDoc(docRef)
        if (docRes.exists()) {
          // console.log(docRes.data())
          // const assets: any[] = docRes.data().assets
          const data = docRes.data()
          if (!data.progress || data?.progress == 0) {
            router.push(`/add-project/upload/${params.id}`)
            return
          }
          if (data.projectName) {
            setProjectName(docRes.data().projectName)
          }
          if (data.answer) {
            form.setValue("answer", data.answer)
            // console.log(form.getValues("answer"))
          }
          if (data.summary) {
            form.setValue("summary", data.summary)
          }
          if (data?.progress == 0) {
            router.push(`/add-project/upload/${params.id}`)
            return
          }
          // if (data.status) {
          //   if (data.status == "generated") {
          //     setSubmitStatus(false)
          //   } else {
          //     setSubmitStatus(true)
          //   }
          // } else {
          //   setSubmitStatus(false)
          // }
          // console.log(data)
          setLoad(true)
          // console.log(assets, "assets")
        } else {
          throw Error("No document Exists")
        }
      } catch (err) {
        console.log("error")
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    load && (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="py-8">
              <div className="flex justify-between">
                <h3 className="inline-block text-[1.375rem] font-[500] text-[#151515] tracking-[0.01375rem] mb-6">
                  {projectName}
                </h3>
                {/* <div></div> */}
              </div>

              <Section active="edit" />

              <div className="mt-8 rounded-[0.88rem] px-8 bg-white py-4 ">
                <div className="flex justify-between items-center text-[0.875rem] font-[400] text-[##060606]">
                  <div className="inline-block select-none">
                    {/* What was the initial inspiration behind the Thamizh Futurism
                  movement and this gallery show? */}
                    {questions[currentQuestion]}
                  </div>
                  <div className="flex ">
                    <Button
                      disabled={currentQuestion == 0}
                      onClick={(e) => {
                        e.preventDefault()
                        // console.log(form.getValues())
                        setCurrentQuestion((prev) => currentQuestion - 1)
                      }}
                      type="submit"
                      className="select-none border border-[#6563FF] bg-[#EAEAEA] px-8 text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={currentQuestion == questions.length - 1}
                      onClick={(e) => {
                        e.preventDefault()
                        // console.log(form.getValues())
                        setCurrentQuestion((prev) => currentQuestion + 1)
                      }}
                      type="submit"
                      className="select-none border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
                {questions.map((question, index) => {
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`answer.${index}`}
                      // name={`answer.${currentQuestion}`}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <FormItem
                              className={clsx(
                                "text-left mt-2 w-[100%]",
                                currentQuestion == index ? "block" : "hidden",
                              )}
                            >
                              <FormControl>
                                <MultiLineInputProject
                                  placeholder={`Write your answers here..`}
                                  maxLength={200}
                                  rows={6}
                                  {...field}
                                  // defaultValue={""}
                                  value={field.value}
                                  onChange={(e) => {
                                    // console.log("called")
                                    // let prev = form.getValues("answer")
                                    // prev![currentQuestion] = e.target.value
                                    // return form.setValue(`answer`, prev)
                                    return field.onChange(e.target.value)
                                    // console.log(form.getValues("answer"))
                                  }}
                                  // onChange={()}
                                  className={` ${
                                    fieldState.error
                                      ? "border-[#CC3057]"
                                      : "  border-[#848484]"
                                  }`}
                                  // required
                                />
                                {/* <span>{}</span> */}
                              </FormControl>
                              <FormMessage className="text-xs text-[#CC3057]" />
                            </FormItem>
                          </>
                        )
                      }}
                    />
                  )
                })}
              </div>
            </div>
            {/* <Form {...form2}>
        <form> */}
            <div className="px-8 pt-6 pb-4 bg-white rounded-[0.88rem]">
              <div className="flex justify-between items-center">
                <span className="inline-block px-3 font-[400] text-[0.875rem] text-[#060606]">
                  Summary of narrative
                </span>
                <div className="flex items-center font-[500] text-[0.875rem]">
                  {/* {load && submitStatus && (
                  <span className="mr-6 text-[#cc3057] ">
                    We will email you when your content has been processed
                  </span>
                )} */}
                  <Button
                    // disabled={submitStatus}
                    type="submit"
                    className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name={`summary`}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FormItem className="text-left  mt-4 w-[100%]">
                        <FormControl>
                          <MultiLineInputProject
                            placeholder={`Write your answers here..`}
                            maxLength={3000}
                            rows={20}
                            {...field}
                            className={` ${
                              fieldState.error
                                ? "border-[#CC3057]"
                                : "  border-[#848484]"
                            }`}
                            // required
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
            {/* </form>
      </Form> */}
            <div className="flex justify-end pt-4">
              <div className="flex ">
                <Button
                  onClick={() => {
                    router.push(`/add-project/upload/${params.id}`)
                  }}
                  type="submit"
                  className="border border-[#6563FF] bg-[#EAEAEA] px-8 text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    router.push(`/add-project/view/${params.id}`)
                  }}
                  type="submit"
                  className="border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </>
    )
  )
}

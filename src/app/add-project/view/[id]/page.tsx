/* eslint-disable @next/next/no-img-element */

"use client"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import Link from "next/link"
import { InputFeed, InputProject } from "@/components/ui/input"
import Section from "../../Section"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import SearchBar from "./search-bar"
import { Dialog, DialogContentAddProjectView } from "@/components/ui/dialog"
import { useContext, useEffect, useState } from "react"
import { type CarouselApi } from "@/components/ui/carousel"
// import "./embla.module.css"
import { AuthContext } from "@/app/context/AuthContext"
import { db, storage } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
// import { error } from "console"
import { getBlob, getDownloadURL, getMetadata, ref } from "firebase/storage"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MultiLineInputProject } from "@/components/ui/multilineInput"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import { FormLabel } from "@mui/material"
// import EmblaCarousel from "./EmblaCarousel"
import { useRouter } from "next/navigation"
import Toggle from "../../Toggle"
import { FONT_MANIFEST } from "next/dist/shared/lib/constants"
import clsx from "clsx"
import Skills from "../../Skills"
import PDFViewer from "./Pdf-viewer"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import CarouselDisplay from "./CarouselDisplay"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Bugs from "@/components/ui/bugs"
import Feedback from "@/components/ui/feedback"
// import { AlertDialog, Alter } from "@/components/ui/alert-dialog"
const privacy = z.enum(["public", "private"])
const formSchema = z.object({
  files: z
    .object({
      name: z.string().optional(),
      // link: z.string().optional(),
      description: z.string().optional(),
      content_type: z.string().optional(),
      share: z.string().optional(),
      privacy: z.string(),
      notes: z.string().optional(),
      phase: z.string().optional(),
      skills: z.string().array().optional(),
      // filePath: z.string().optional(),
    })
    .array(),
})

// const formSchema = z.object({
//   name: z.string().optional(),
//   link: z.string().optional(),
//   description: z.string().optional(),
//   category: z.string().optional(),
//   privacy: privacy,
//   // tags: z.string().array(),
// })
export default function View({ params }: { params: { id: string } }) {
  const [key, setKey] = useState<string>("")
  const router = useRouter()
  const [load, setLoad] = useState(false)
  // const [visible, setVisible] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [save, setSave] = useState(false)
  useEffect(() => {
    // console.log("called", trigger)
    // if (trigger) {
    // setVisible(true)
    if (trigger) {
      const timer = setTimeout(() => {
        // After 3000 milliseconds (3 seconds), hide the component
        // setVisible(false)
        setTrigger(false)
        // console.log("called timeout")
      }, 3000)

      return () => {
        // setTrigger(false)
        // console.log("unmount")
        // Cleanup the timer on component unmount or if it's updated before the timeout
        clearTimeout(timer)
        // }
      }
    }
  }, [trigger])
  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()

  const [files, setFiles] = useState<
    {
      fileName: string
      preview: string
      filePath: string
      index: number
      type: string
      description?: string
      content_type?: string
      share?: string
      notes?: string
      phase?: string
      skills?: string[]
    }[]
  >([])
  const [count, setCount] = useState(0)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleFiles, setVisibleFiles] = useState<
    {
      fileName: string
      preview: string
      filePath: string
      index: number
      type: string
      description?: string
      content_type?: string
      share?: string
      notes?: string
      phase?: string
      skills?: string[]
    }[]
  >([])
  const [projectName, setProjectName] = useState("New Project")
  // const [selectedIndex, setSelectedIndex] = useState(0)
  function findIndex(k: number): number {
    for (let i = 0; i < visibleFiles.length; i++) {
      if (visibleFiles[i].index == k) {
        return i
      }
    }
    return 0
  }
  useEffect(() => {
    if (!api1 || !api2) {
      return
    }
    api1.scrollTo(currentIndex)
    api2.scrollTo(currentIndex)
    // setCount(api1.scrollSnapList().length)
    // setCurrentIndex(currentIndex)
    // console.log(api1.selectedScrollSnap())
    // setCount(api2.scrollSnapList().length)
    // setCurrentIndex(currentIndex)
    // console.log(api2.selectedScrollSnap())

    api1.on("select", (_: any, e: any) => {
      setCurrentIndex(api1.selectedScrollSnap())
    })
    api2.on("select", (_: any, e: any) => {
      setCurrentIndex(api2.selectedScrollSnap())
    })
  }, [api1, api2, currentIndex])
  const { current } = useContext(AuthContext)
  useEffect(() => {
    if (!current) return
    // if (typeof window === "undefined") return
    getData()
  }, [])


  async function getData() {
    console.log('getData called')
    try {
      const docRef = doc(db, "users", current!, "projects", params.id)
      const docRes = await getDoc(docRef)
      if (docRes.exists()) {
        if (!docRes.data()?.progress || docRes.data()?.progress == 0) {
          router.push(`/add-project/upload/${params.id}`)
          return
        }

        const assets: string[] = docRes.data()?.assets || []
        if (docRes.data().projectName) {
          setProjectName(docRes.data().projectName)
        }
        if (assets) {
          let save: {
            fileName: string
            // filePath: string
            preview: string
            filePath: string
            index: number
            type: string
            description?: string
            content_type?: string
            share?: string
            notes?: string
            phase?: string
            skills?: string[]
          }[] = []
          await Promise.all(
            assets.map(async (asset, index) => {
              try {
                const storeRef = ref(storage, asset)
                const meta = await getMetadata(storeRef)
                let res = ""
                let type = ""
                let filePath = await getDownloadURL(storeRef)
                if (meta.contentType?.split("/")[0] == "image") {
                  res = filePath
                  type = meta.contentType?.split("/")[0]
                } else if (meta.contentType?.split("/")[1] == "pdf") {
                  res = "/pdf.png"
                  type = meta.contentType?.split("/")[1]
                }
                console.log(filePath)
                save.push({
                  type: type,
                  index: index,
                  preview: res,
                  filePath: filePath,
                  fileName:
                    docRes.data()?.files[index]?.name ||
                    asset.split("/").slice(-1).join(),
                  description: docRes.data()?.files[index]?.description || "",
                  content_type: docRes.data()?.files[index]?.content_type || "",
                  share: docRes.data()?.files[index]?.share || "",
                  notes: docRes.data()?.files[index]?.notes || "",
                  phase: docRes.data()?.files[index]?.phase || "",
                  skills: docRes.data()?.files[index]?.skills || [],
                })
              } catch (err) {
                console.log(err)
              }
            }),
          )
          setFiles([...save])
          setVisibleFiles([...save])
          console.log([...save], "visibleFiles", currentIndex)

          // if(docRes.data().)
          const fileData: {
            content_type?: string
            privacy: string
            name?: string | undefined
            skills?: string[] | undefined
            // link?: string | undefined
            description?: string | undefined
            share?: string | undefined
            notes?: string | undefined
            // filePath?: string
            phase?: string | undefined
          }[] = docRes.data()?.files || []
          // fileData.forEach((file, index) => {
          //   if (!file.privacy) {
          //     fileData[index].privacy = "private"
          //   }
          // })
          form.setValue("files", fileData)
          // console.log(form.getValues("files"), "files")

          // assets.forEach((asset, index) => {
          //   if (!form.getValues(`files.${index}.name`)) {
          //     form.setValue(
          //       `files.${index}.name`,
          //       asset
          //         .split("/")
          //         .slice(-1)
          //         .join()
          //         .split(".")
          //         .slice(0, 1)
          //         .join(""),
          //     )
          //   }
          // })
        } else {
          throw Error("Assets Not Found")
        }
        // const init = assets.map((asset) => {
        //   delete asset["filePath"]
        //   return asset
        // })
        // form.setValue("files", assets)
        // console.log(form.getValues("files"), "init")
        setLoad(true)
      } else {
        throw Error("No document Exists")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // files: [],
      // privacy: "private",
      files: [],
    },
  })

  async function submitHandler(values: z.infer<typeof formSchema>) {
    const docRef = doc(db, "users", current!, "projects", params.id)
    setSave(true)
    try {
      await updateDoc(docRef, { ...values })
      toast({
        // variant: "destructive",
        title: "Updated Successfully",
        // className: cn(
        //   "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 ",
        // ),
      })
      getData()
    } catch (err) {
      toast({
        // className: cn(
        //   "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
        // ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      })
      console.error(err)
    }
    setSave(false)

    // console.log("submission done")
  }
  return (
    load && (
      <>
        <div className="sticky  w-full py-1 top-0 z-[100] justify-center px-16 flex bg-white">
          {/* <div className="absolute translate-x-[-50%] left-[50%]"> */}
          <div className="absolute left-16">
            <Link href={`/profile-editor`}>
              <div className=" hover:bg-gray-200 p-2 rounded-md transition-colors flex justify-center items-center font-bold text-xl">
                <div className="inline-block  mr-2">Projects</div>
                <div className="inline-block  mr-2">&gt;</div>
                <div className="inline-block ">{projectName}</div>
              </div>
            </Link>
          </div>
          <div className="absolute right-16">
            <Button
              disabled={!load || save}
              onClick={async () => {
                await form.handleSubmit(submitHandler)()
              }}
              className="ml-2 inline-block bg-white border border-[#6563FF] text-[#6563FF] rounded-[0.38rem] hover:text-white hover:bg-[#6563FF] hover:border-transparent transition-colors"
            >
              Save
            </Button>
            <Button
              disabled={!load || save}
              onClick={async () => {
                await form.handleSubmit(
                  async (values: z.infer<typeof formSchema>) => {
                    try {
                      await submitHandler(values)
                      const docRef = doc(
                        db,
                        "users",
                        current!,
                        "projects",
                        params.id,
                      )
                      await updateDoc(docRef, {
                        published: true,
                      })
                      router.push("/profile-editor")
                    } catch (err) {
                      console.error(err)
                    }
                  },
                )()
              }}
              className="ml-2 inline-block bg-[#6563FF] border border-transparent text-white rounded-[0.38rem] hover:text-[#6563FF] hover:border-[#6563FF] hover:bg-white transition-colors"
            >
              Publish
            </Button>
          </div>
          <div className="flex relative items-center">
            <Button
              onClick={async (e) => {
                e.preventDefault()
                // console.log("done")

                await form.handleSubmit(submitHandler)()
                // console.log("done submitting")
                router.push(`/add-project/upload/${params.id}`)
              }}
              // disabled={save}
              disabled={!load || save}
              className="mx-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"

              // type="submit"
              // className="ml-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
            >
              <img src="/arrow_prev.svg" className="w-8" alt="prev" />
            </Button>
            <Section active="view" load={load} move={true} />
            <Button
              onClick={async (e) => {
                e.preventDefault()
                // console.log("done")
                await form.handleSubmit(submitHandler)()
                router.push(`/add-project/view/${params.id}`)
              }}
              // disabled={ }
              disabled={true}
              className="ml-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
            >
              <img src="/arrow_next.svg" className="w-8" alt="next" />
            </Button>
          </div>
          {/* </div> */}
        </div>

        <div className="bg-[#ECECEC] px-32 pb-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              {/* <div className=""></div> */}
              <div className="py-4">
                <Dialog
                  open={open && visibleFiles.length > 0}
                  onOpenChange={setOpen}
                >
                  <DialogContentAddProjectView className="bg-[#FFFFFFE5] z-[250]">
                    <div className="h-[100vh] w-[75vw] relative justify-center items-center flex flex-col">
                      <div className="px-16 flex justify-between items-center w-full max-h-[8vh]">
                        {/* <div></div> */}
                        <span className="inline-block text-[1.15rem] font-[600] py-2">
                          {(currentIndex < visibleFiles.length &&
                            form.watch(
                              `files.${visibleFiles[currentIndex].index}.name`,
                              "Name",
                            )) ||
                            "Name"}
                        </span>
                        <div className="flex">
                          <div className="mr-2">
                            <Bugs />
                          </div>
                          <div className="mr-2">
                            <Feedback />
                          </div>
                          <DialogPrimitive.Close className="rounded-full hover:bg-gray-100 p-1 aspect-square inline-block ml-3 right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                          </DialogPrimitive.Close>
                        </div>
                      </div>

                      <Carousel
                        setApi={setApi1}
                        className="h-[72vh] flex align-center justify-center max-w-full px-8"
                        opts={{
                          align: "center",
                        }}
                      >
                        <CarouselContent className="h-[72vh] relative">
                          {visibleFiles.map((file, index) => (
                            <CarouselItem
                              key={index}
                              className="flex justify-center h-full items-center"
                              onClick={() => {
                                setCurrentIndex(index)
                              }}
                            >
                              <CarouselDisplay file={file} />
                              {/* {file.type == "pdf" && (
                              <PDFViewer file={file.filePath} />
                            )} */}
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                      <Carousel
                        setApi={setApi2}
                        opts={{
                          align: "center",
                          loop: true,
                        }}
                        className="w-[90%]"
                      >
                        <CarouselContent className="max-h-[20vh]">
                          {visibleFiles.map((file, index) => (
                            <CarouselItem
                              onClick={() => {
                                // console.log("clicked", index)
                                // api2?.scrollTo(index)
                                // api1?.scrollTo(index)
                                setCurrentIndex(index)
                              }}
                              key={index}
                              // md:basis-1/2
                              className="basis-1/6 hover:cursor-pointer max-h-[20vh]"
                            >
                              <Card className="bg-transparent max-h-[20vh] border-0 flex hover:bg-gray-400 rounded-md transition-colors justify-center items-center">
                                <CardContent className="flex p-0 aspect-square items-center justify-center h-[20vh]">
                                  <img
                                    src={file.preview}
                                    alt="index"
                                    className="inline-block object-contain max-h-[18vh] max-w-[18vh]"
                                  />
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="border-2 border-black" />
                        <CarouselNext className="border-2 border-black" />
                      </Carousel>
                    </div>
                    <div className="py-10 px-6 w-[25vw] h-[100vh] min-w-full bg-[#BCBCBC] overflow-y-auto">
                      {visibleFiles.length > currentIndex &&
                        visibleFiles.map((file, index) => {
                          return (
                            // <>
                            <div
                              key={index}
                              className={clsx(
                                index == currentIndex ? "" : "hidden",
                              )}
                            >
                              <div className="flex justify-between">
                                <h3 className="inline-block text-[1.25rem] font-[500] ml-2">
                                  Details
                                </h3>
                                <Toggle form={form} currentIndex={file.index} />
                              </div>

                              <FormField
                                control={form.control}
                                name={`files.${file.index}.name`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="mt-4">
                                        <FormLabel className="text-[0.875rem] ml-2 font-[500] text-black">
                                          Name
                                        </FormLabel>

                                        <FormControl>
                                          <InputProject
                                            placeholder="File Name"
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

                              {/* <FormField
                              control={form.control}
                              name={`files.${file.index}.description`}
                              render={({ field, fieldState }) => {
                                return (
                                  <>
                                    <FormItem className="text-left mt-4 w-[100%]">
                                      <FormLabel className="ml-2">
                                        Description
                                      </FormLabel>
                                      <FormControl>
                                        <MultiLineInputProject
                                          placeholder={`Description

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}
                                          maxLength={500}
                                          rows={9}
                                          {...field}
                                          className={` ${
                                            fieldState.error
                                              ? "border-[#CC3057]"
                                              : "  border-[#848484]"
                                          }`}
                                          required
                                        />
                                      </FormControl>
                                      <FormMessage className="text-xs text-[#CC3057]" />
                                    </FormItem>
                                  </>
                                )
                              }}
                            />*/}
                              <FormField
                                control={form.control}
                                name={`files.${file.index}.description`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="text-left mt-4 w-[100%]">
                                        <div className="flex justify-between items-center">
                                          <FormLabel className="ml-2 inline-block">
                                            Description
                                          </FormLabel>

                                          {/* <div className="flex items-center">
                                          {trigger && (
                                            <span className="text-[0.75rem] font-[500] text-[#818181]">
                                              Copied To Clipboard!
                                            </span>
                                          )}
                                          <img
                                            src="/share.svg"
                                            onClick={() => {
                                              // console.log(trigger)
                                              setTrigger(true)
                                              navigator.clipboard.writeText(
                                                form.getValues(
                                                  `files.${index}.share`,
                                                ) || "",
                                              )
                                              // setVisible(true)
                                            }}
                                            alt="share"
                                            className="ml-2 cursor-pointer h-4 w-4 mr-2"
                                          />
                                        </div> */}
                                        </div>
                                        <FormControl>
                                          <MultiLineInputProject
                                            placeholder={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}
                                            maxLength={1000}
                                            rows={9}
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
                              {/* <FormField
                              control={form.control}
                              name={`files.${file.index}.content_type`}
                              render={({ field, fieldState }) => (
                                <FormItem className="mt-4 w-full">
                                  <FormLabel>Content Type</FormLabel>

                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    
                                    <FormControl>
                                      <SelectTrigger
                                        className={`prompt bg-white rounded-[0.88rem] w-full border-2  view ${
                                          fieldState.error
                                            ? "border-[#CC3057]"
                                            : "  border-transparent"
                                        }`}
                                      >
                                        <SelectValue
                                          placeholder="Select your category"
                                          className="text-[#848484] text-[0.875rem] font-[400]"
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <FormMessage className="text-xs text-[#CC3057]" />
                                    <SelectContent className="hover:opacity-1 bg-white">
                                      <SelectItem
                                        value="render"
                                        className="bg-white text-[0.875rem] font-[500] hover:cursor-pointer hover:bg-gray-100"
                                      >
                                        Render
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            /> */}
                              <FormField
                                control={form.control}
                                name={`files.${file.index}.content_type`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="mt-4">
                                        <FormLabel className="text-[0.875rem] ml-2 font-[500] text-black">
                                          Content Type
                                        </FormLabel>

                                        <FormControl>
                                          <InputProject
                                            placeholder="Phase"
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
                                name={`files.${file.index}.share`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="text-left mt-4 w-[100%]">
                                        <div className="flex justify-between items-center">
                                          <FormLabel className="ml-2 inline-block">
                                            Share it with
                                          </FormLabel>

                                          <div className="flex items-center">
                                            {trigger && (
                                              <span className="text-[0.75rem] font-[500] text-[#818181]">
                                                Copied To Clipboard!
                                              </span>
                                            )}
                                            <img
                                              src="/share.svg"
                                              onClick={() => {
                                                // console.log(trigger)
                                                setTrigger(true)
                                                navigator.clipboard.writeText(
                                                  file.filePath,
                                                )
                                                // setVisible(true)
                                              }}
                                              alt="share"
                                              className="ml-2 cursor-pointer h-4 w-4 mr-2"
                                            />
                                          </div>
                                        </div>
                                        <FormControl>
                                          <MultiLineInputProject
                                            placeholder={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}
                                            maxLength={500}
                                            rows={4}
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
                              <FormField
                                control={form.control}
                                name={`files.${file.index}.phase`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="mt-4">
                                        <FormLabel className="text-[0.875rem] ml-2 font-[500] text-black">
                                          Phase
                                        </FormLabel>

                                        <FormControl>
                                          <InputProject
                                            placeholder="Phase"
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
                              <Skills form={form} index={file.index} />
                              <FormField
                                control={form.control}
                                name={`files.${file.index}.notes`}
                                render={({ field, fieldState }) => {
                                  return (
                                    <>
                                      <FormItem className="text-left mt-4 w-[100%]">
                                        <FormLabel className="ml-2">
                                          Notes
                                        </FormLabel>
                                        <FormControl>
                                          <MultiLineInputProject
                                            placeholder={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}
                                            maxLength={200}
                                            rows={10}
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
                            // </>
                          )
                        })}

                      {/* })} */}
                      {/* </form>
            </Form> */}
                    </div>
                  </DialogContentAddProjectView>
                </Dialog>
                {/* <Section active="view" load={load} move={true} /> */}
                <div className="bg-white p-5 mt-8 rounded-[0.88rem] h-[100vh]">
                  <h3 className=" font-[500] text-[1.25rem] text-[#060606]">
                    Files
                  </h3>
                  <SearchBar
                    setCurrentIndex={setCurrentIndex}
                    files={files}
                    setVisibleFiles={setVisibleFiles}
                    visibleFiles={visibleFiles}
                  />
                  <div className="" onClick={() => setOpen((prev) => !prev)}>
                    {visibleFiles.map((file, index) => {
                      return (
                        <div
                          key={index}
                          className="inline-block w-[7.25rem] ml-2 upload-preview"
                        >
                          <div className="flex max-w-[6.25rem] flex-col px-2 py-8 ">
                            <div className="flex justify-center w-full">
                              <img
                                src={file.preview}
                                className="max-h-[6.25rem] inline-block max-w-[6.25rem]"
                                // Revoke data uri after image is loaded
                                onClick={() => {
                                  // console.log("clicked")
                                  // if (!api2) return
                                  // api2.scrollTo(index)
                                  setCurrentIndex(index)
                                }}
                                alt="test"
                              />
                            </div>
                            <p className="text-center mt-2 text-[0.625rem] font-[400] tracking-[0.00625rem] break-all">
                              {form.watch(`files.${file.index}.name`) ||
                                file.fileName}
                            </p>
                          </div>

                          {/* <p className="text-center text-[0.625rem] font-[400] tracking-[0.00625rem] break-all">
                {file.name}
              </p> */}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className=" h-[1px] w-full"></div>
                {/* <div className="flex justify-end pt-4">
                <Button
                  // onClick={() => {
                  //   console.log(form.getValues())
                  //   console.log(form.formState.errors)
                  //   // form.trigger()
                  //   // router.push(`/add-project/edit/${params.id}`)
                  // }}
                  onClick={async (e) => {
                    e.preventDefault()
                    await form.handleSubmit(submitHandler)()
                    // console.log("done submitting")
                    // router.push(`/add-project/edit/${params.id}`)
                  }}
                  // type="submit"
                  className="border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
                >
                  Back
                </Button>
              </div> */}
              </div>
            </form>
          </Form>
        </div>
      </>
    )
  )
}

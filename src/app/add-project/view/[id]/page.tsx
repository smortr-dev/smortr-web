/* eslint-disable @next/next/no-img-element */

"use client"
import * as DialogPrimitive from "@radix-ui/react-dialog"

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
import { getBlob, getDownloadURL, ref } from "firebase/storage"
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
    { fileName: string; filePath: string; index: number }[]
  >([])
  const [count, setCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleFiles, setVisibleFiles] = useState<
    {
      fileName: string
      filePath: string
      index: number
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
    async function getData() {
      try {
        const docRef = doc(db, "users", current!, "projects", params.id)
        const docRes = await getDoc(docRef)
        if (docRes.exists()) {
          if (!docRes.data()?.progress || docRes.data()?.progress == 0) {
            router.push(`/add-project/upload/${params.id}`)
            return
          }
          // console.log(docRes.data())
          const assets: string[] = docRes.data()?.assets || []
          if (docRes.data().projectName) {
            setProjectName(docRes.data().projectName)
          }
          // user-assets/o1MWNdo2xweMsSPP60fWfQoeZVn2/projects/6Womfe0BRcx7wUGIcfno/test1706262702654.png
          // console.log(assets, "assets")
          if (assets) {
            // console.log(assets, "assets")
            let save: { fileName: string; filePath: string; index: number }[] =
              []
            // console.log(assets, "inside")
            await Promise.all(
              assets.map(async (asset, index) => {
                try {
                  const storeRef = ref(storage, asset)
                  const res = await getDownloadURL(storeRef)
                  // console.log(asset, asset.split("/").splice(-1), "asset")
                  // form.
                  save.push({
                    index: index,
                    filePath: res,
                    fileName:
                      docRes.data()?.files[index]?.name ||
                      asset.split("/").slice(-1).join(),
                  })
                } catch (err) {
                  console.log(err)
                }
              }),
            )
            // delete
            // console.log(save, "files save")
            setFiles([...save])
            setVisibleFiles([...save])

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
    getData()
  }, [])
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
    // console.log("clicked")
    const docRef = doc(db, "users", current!, "projects", params.id)
    // console.log(values, "values submit")

    // return
    try {
      await updateDoc(docRef, { ...values })
    } catch (err) {
      console.error(err)
    }
    // console.log("submission done")
  }
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
                <div className="flex">
                  <Button
                    onClick={async () => {
                      await form.handleSubmit(submitHandler)()
                    }}
                    className="inline-block bg-white border border-[#6563FF] text-[#6563FF] rounded-[0.38rem] hover:text-white hover:bg-[#6563FF] hover:border-transparent transition-colors"
                  >
                    Save
                  </Button>
                  <Button
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
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContentAddProjectView className="bg-[#FFFFFFE5]">
                  <div className="h-[100vh] relative justify-center items-center flex flex-col">
                    <div className="px-16 flex justify-between w-full">
                      {/* <div></div> */}
                      <span className="inline-block text-[1.15rem] font-[600] py-4">
                        {form.watch(
                          `files.${visibleFiles[currentIndex].index}.name`,
                          "Name",
                        ) || "Name"}
                      </span>
                      <DialogPrimitive.Close className="inline-block right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </DialogPrimitive.Close>
                    </div>

                    <Carousel
                      setApi={setApi1}
                      className="h-[65vh] max-w-full px-16"
                      opts={{
                        align: "center",
                      }}
                    >
                      <CarouselContent className="max-h-[60vh] relative">
                        {visibleFiles.map((file, index) => (
                          <CarouselItem
                            key={index}
                            className="flex justify-center"
                            onClick={() => {
                              // if(api)
                              // api1?.scrollTo(index)
                              // api2?.scrollTo(index)
                              setCurrentIndex(index)
                            }}
                          >
                            <img
                              src={file.filePath}
                              alt="img"
                              className="object-contain max-h-[60vh] "
                            />
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
                            <Card className="bg-transparent border-0 flex justify-center items-center">
                              <CardContent className="flex p-0 aspect-square items-center justify-center max-h-[20vh]">
                                <img
                                  src={file.filePath}
                                  alt="index"
                                  className="inline-block max-h-[20vh] w-auto"
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
                  <div className="py-10 px-6  h-[100vh] w-full bg-[#BCBCBC] overflow-y-auto">
                    {files.map((file, index) => {
                      return (
                        // <>
                        <div
                          key={index}
                          className={clsx(
                            index == visibleFiles[currentIndex].index
                              ? ""
                              : "hidden",
                          )}
                        >
                          <div className="flex justify-between">
                            <h3 className="inline-block text-[1.25rem] font-[500] ml-2">
                              Details
                            </h3>
                            <Toggle form={form} currentIndex={index} />
                          </div>

                          <FormField
                            control={form.control}
                            name={`files.${index}.name`}
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

                          <FormField
                            control={form.control}
                            name={`files.${index}.description`}
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
                                        maxLength={200}
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
                          <FormField
                            control={form.control}
                            name={`files.${index}.content_type`}
                            render={({ field, fieldState }) => (
                              <FormItem className="mt-4 w-full">
                                <FormLabel>Content Type</FormLabel>
                                {/* <FormLabel>Profession</FormLabel> */}
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  {/* defaultValue={field.value} */}
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
                          />
                          <FormField
                            control={form.control}
                            name={`files.${index}.share`}
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
                                              form.getValues(
                                                `files.${index}.share`,
                                              ) || "",
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
                                        maxLength={200}
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
                            name={`files.${index}.phase`}
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
                          <Skills form={form} index={index} />
                          <FormField
                            control={form.control}
                            name={`files.${index}.notes`}
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
              <Section active="view" />
              <div className="bg-white p-5 mt-8 rounded-[0.88rem] h-[100vh]">
                <h3 className=" font-[500] text-[1.25rem] text-[#060606]">
                  Files
                </h3>
                <SearchBar
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
                              src={file.filePath}
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
                            {form.watch(
                              `files.${visibleFiles[index].index}.name`,
                            ) || file.fileName}
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
              <div className="flex justify-end pt-4">
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
              </div>
            </div>
          </form>
        </Form>
      </>
    )
  )
}

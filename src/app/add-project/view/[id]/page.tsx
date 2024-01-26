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
import { doc, getDoc } from "firebase/firestore"
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
export default function View({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()

  const [files, setFiles] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleFiles, setVisibleFiles] = useState<string[]>([])
  const [projectName, setProjectName] = useState("New Project")
  // const [selectedIndex, setSelectedIndex] = useState(0)
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

    // api1.on("select", (_: any, e: any) => {
    //   // console.log(e, "e")
    //   console.log("selected")
    //   setCurrentIndex(api1.selectedScrollSnap())
    //   console.log(api1.selectedScrollSnap())
    //   // api.scrollTo()
    //   // console.log()
    //   // console.log(c)
    // })
    // api2.on("select", (_: any, e: any) => {
    //   console.log(e, "e")
    //   console.log("selected")
    //   setCurrentIndex(api2.selectedScrollSnap())
    //   console.log(api2.selectedScrollSnap())
    //   // api.scrollTo()
    //   // console.log()
    //   // console.log(c)
    // })
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
          console.log(docRes.data())
          const assets: any[] = docRes.data().assets
          if (docRes.data().projectName) {
            setProjectName(docRes.data().projectName)
          }
          // console.log(assets, "assets")
          if (assets) {
            console.log(assets, "assets")
            let save: string[] = []
            // console.log(assets, "inside")
            await Promise.all(
              assets.map(async (asset) => {
                const storeRef = ref(storage, asset)
                const res = await getDownloadURL(storeRef)
                save.push(res)
              }),
            )

            setFiles([...save])
            setVisibleFiles([...save])
          } else {
            throw Error("Assets Not Found")
          }
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
  const formSchema = z.object({
    name: z.string(),
    link: z.string(),
    description: z.string(),
    category: z.string(),
    // tags: z.string().array(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // files: [],
    },
  })
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h3 className="inline-block text-[1.375rem] font-[500] text-[#151515] tracking-[0.01375rem] mb-6">
          {projectName}
        </h3>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContentAddProjectView className="bg-[#FFFFFFE5]">
          <div className="h-[100vh] relative justify-center items-center flex flex-col">
            <div className="px-16 flex justify-between w-full">
              {/* <div></div> */}
              <span className="inline-block text-[1.25rem] font-[500]">
                Name
              </span>
              <DialogPrimitive.Close className="inline-block right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>

            <Carousel
              setApi={setApi1}
              className="h-[60vh] max-w-full px-16"
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
                      src={file}
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
                          src={file}
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
          <div className="py-10 px-6  min-h-[100vh] w-full bg-[#BCBCBC] overflow-y-scroll">
            <h3 className="text-[1.25rem] font-[500] ml-2">Details</h3>
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name={`name`}
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
                  name={`link`}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <FormItem className="mt-4">
                          <FormLabel className="text-[0.875rem] ml-2 font-[500] text-black">
                            Link
                          </FormLabel>

                          <FormControl>
                            <InputProject
                              placeholder="URL"
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
                        <FormItem className="text-left mt-4 w-[100%]">
                          <FormLabel className="ml-2">Description</FormLabel>
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
                  name="category"
                  render={({ field, fieldState }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel>Category</FormLabel>
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
              </form>
            </Form>
          </div>
        </DialogContentAddProjectView>
      </Dialog>
      <Section active="view" />
      <div
        className="bg-white p-5 mt-8 rounded-[0.88rem] h-[100vh]"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className=" font-[500] text-[1.25rem] text-[#060606]">Files</h3>
        <SearchBar
          files={files}
          setVisibleFiles={setVisibleFiles}
          visibleFiles={visibleFiles}
        />
        {files.map((file, index) => {
          return (
            <div
              key={file}
              className="inline-block max-w-[7.25rem] ml-2 upload-preview"
            >
              <div className="p-2">
                <img
                  src={file}
                  className="max-h-[6.25rem] max-w-[6.25rem] inline-block"
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
              {/* <p className="text-center text-[0.625rem] font-[400] tracking-[0.00625rem] break-all">
                {file.name}
              </p> */}
            </div>
          )
        })}
      </div>
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => {
            router.push(`/add-project/edit/${params.id}`)
          }}
          type="submit"
          className="border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
        >
          Back
        </Button>
      </div>
    </div>
  )
}

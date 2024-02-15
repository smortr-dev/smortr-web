/* eslint-disable @next/next/no-img-element */
"use client"
import clsx from "clsx"
import { Option } from "react-multi-select-component"
const questions: string[] = [
  "Who was your client, and how did you engage with them?",
  "What was the primary purpose of this project?",
  "Where did you face a challenge, and how was it overcome?",
  "When working on this project, was it a team effort or did you work alone?",
  "What is the proposed Return on Investment (ROI) for the end user? Consider financial, lifestyle, and mental aspects.",
]
const languagesArray: Option[] = [
  // { label: "Malayalam", value: "Malayalam" },
  { label: "English", value: "English" },
  { label: "Tamil", value: "Tamil" },
  { label: "Hindi", value: "Hindi" },
  { label: "Gujarati", value: "Gujarati" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
  { label: "German", value: "German" },
]
type workPreferencesElements = "Current Location" | "Remote" | "Hybrid"
const workPreferences = new Array<workPreferencesElements>(
  "Current Location",
  "Remote",
  "Hybrid",
)
import { HubspotProvider } from "next-hubspot"
import { styled } from "@mui/material/styles"
import { Button } from "@/components/ui/button"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import { error, profile, profileEnd } from "console"
// import { type } from "os";
import { useContext, useEffect, useState } from "react"
import Header from "./Header"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MultiLineInput } from "@/components/ui/multilineInput"
import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import CertificationOrLicense from "./CertificationOrLicense"
import Bio from "./Bio"
import Education from "./Education"
import Experience from "./Experience"
import Portfolio from "./Portfolio"
import Tabs from "@mui/material/Tabs"
import { useStepContext } from "@mui/material"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { userInfo } from "os"
import { AuthContext } from "@/app/context/AuthContext"
import { db, storage } from "@/lib/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { MultiSelect } from "react-multi-select-component"
import { Checkbox } from "@/components/ui/checkbox"
import { useHeader } from "../context/HeaderContext"
// import Setting from "./Settings"
import Setting from "./Settings"

// export async function getStaticProps(params:type) {

// }
// import { profile } from "console";
// import type { InferGetStaticPropsType, GetStaticProps } from "next";
type userInfo = {
  name: string
  image: string
  location: string
  position: string
  pronouns: string
  about: string
  thought: string
  background: string
  thoughtPostDate: string
  connections: number
  shares: number
  joinDate: string
  languages: string[]
  workPreference: string[]
}

type bio = {
  question: string
  mediaType: string
  filelink: string
  caption: string
}

type portfolio = {
  title: string
  description: string
  type: string
  image: string
}

type education = {
  image: string
  degree: string
  description: string
  startDate: string
  endDate: string
  skills: string[]
  school: string
}

type experience = {
  image: string
  place: string
  description: string
  startDate: string
  position: string
  endDate: string
  company: string
  skills: string[]
}

type certificationOrLicense = {
  type: string
  from: string
  date: string
  id: string
  link: string
}

type Profile = {
  name: string
  userInfo: userInfo
  bio: bio[]
  skills: { skillName: string; proficiency: number }[]
  portfolio: portfolio[]
  education: education[]
  experience: experience[]
  certificationOrLicense: certificationOrLicense[]
}

type ProfileEditor = {
  name: string
}

type dataTypes =
  | {
      type: "bio"
      cardData: bio
    }
  | {
      type: "certificationOrLicense"
      cardData: certificationOrLicense
    }
  | {
      type: "experience"
      cardData: experience
    }
  | {
      type: "education"
      cardData: education
    }
  | {
      type: "portfolio"
      cardData: portfolio
    }

type data = dataTypes[]

export type { bio, experience, certificationOrLicense, portfolio, education }
// export const getStaticProps = (async () => {

// const AntTabs = styled(Tabs)({
//   borderBottom: "1px solid #e8e8e8",
//   "& .MuiTabs-indicator": {
//     backgroundColor: "transparent", //6563FF
//   },
// })

// const AntTab = styled((props: StyledTabProps) => <Tab {...props} />)(
//   ({ theme }) => ({
//     textTransform: "none",
//     minWidth: 0,
//     [theme.breakpoints.up("sm")]: {
//       minWidth: 0,
//     },
//     // padding: "0.4rem",
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(0),
//     color: "rgba(0, 0, 0, 0.85)",
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:hover": {
//       color: "#40a9ff",
//       opacity: 1,
//     },
//     "&.Mui-selected": {
//       color: "#6563FF",
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     "&.Mui-focusVisible": {
//       backgroundColor: "#d1eaff",
//     },
//   }),
// )

// interface StyledTabsProps {
//   children?: React.ReactNode
//   value: number
//   onChange: (event: React.SyntheticEvent, newValue: number) => void
// }

// const StyledTabs = styled((props: StyledTabsProps) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   "& .MuiTabs-indicator": {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//   },
//   "& .MuiTabs-indicatorSpan": {
//     maxWidth: 40,
//     width: "100%",
//     backgroundColor: "#635ee7",
//   },
// })

// interface StyledTabProps {
//   label: string
// }

// const StyledTab = styled((props: StyledTabProps) => (
//   <Tab disableRipple {...props} />
// ))(({ theme }) => ({
//   textTransform: "none",
//   fontWeight: theme.typography.fontWeightRegular,
//   fontSize: theme.typography.pxToRem(15),
//   marginRight: theme.spacing(1),
//   color: "rgba(255, 255, 255, 0.7)",
//   "&.Mui-selected": {
//     color: "#fff",
//   },
//   "&.Mui-focusVisible": {
//     backgroundColor: "rgba(100, 95, 228, 0.32)",
//   },
// }))

// }) satisfies GetStaticProps<{
//   profileData: Profile;
// }>;
// async function getData(name: string) {
//   // console.log("called");
//   const res = await fetch("/api/profile", {
//     method: "POST",
//     body: JSON.stringify({ name: name }),
//   })
//   const profileData: Profile = await res.json()
//   // console.log(profileData, "profileData");
//   // console.log(profileData);
//   return profileData
// }

// function getAllData(profileData: Profile) {
//   if (!profileData) return undefined
//   else {
//     let bioData: data = profileData.bio.map((bio): dataTypes => {
//       return { type: "bio", cardData: bio }
//     })
//     let certificationOrLicenseData: data =
//       profileData.certificationOrLicense.map(
//         (certificationOrLicense): dataTypes => {
//           return {
//             type: "certificationOrLicense",
//             cardData: certificationOrLicense,
//           }
//         },
//       )

//     let experienceData: data = profileData.experience.map(
//       (experience): dataTypes => {
//         return { type: "experience", cardData: experience }
//       },
//     )
//     let educationData: data = profileData.education.map(
//       (education): dataTypes => {
//         return { type: "education", cardData: education }
//       },
//     )

//     let portfolio: data = profileData.portfolio.map((portfolio): dataTypes => {
//       return { type: "portfolio", cardData: portfolio }
//     })

//     let totalData: data = [
//       ...bioData,
//       ...experienceData,
//       ...educationData,
//       ...portfolio,
//       ...certificationOrLicenseData,
//     ]
//     totalData = totalData.sort(() => {
//       let num: number = Math.floor(Math.random() * 2)
//       let arr = [-1, 1]
//       return arr[num]
//     })

//     return totalData
//   }
// }

const formSchema = z.object({
  name: z.string().optional(), //.min(1),
  profession: z.string().optional(),
  location: z.string().optional(),
  pronouns: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  background: z.any().optional(),
  language: z.string().array(),
  workPreference: z.string().array(),
  image: z.any(),
})

// type profileEditorForm = {
//   name?:string;
//   profession?:string;
//   pronouns?:string;
//   description?:string;
//   status?:string;
//   background?:string;
//   language?:string[];
//   workPreference?:string[];
// }

export default function Profile({ params }: { params: { name: string } }) {
  const router = useRouter()

  const { current } = useContext(AuthContext)

  // console

  let fetchMonth = function (date: Date) {
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthList[date.getMonth()]
  }

  type qualificationSelectionOption =
    | "education"
    | "experience"
    | "certificationOrLicense"

  // const [qualificationSelection, setQualificationSelection] =
  //   useState<qualificationSelectionOption>("education")
  const [profileData, setProfileData] = useState<any>()
  // const [cover]
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    "/user-thumbnail.png",
  )
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(
    "/image-thumbnail.png",
  )
  const [open, setOpen] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  // const [allData, setAllData] = useState<data>()
  const [load, setLoad] = useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: [],
      workPreference: [],
    },
  })

  // function updateForm() {
  //   if (profileData) {
  //     form.setValue(
  //       "image",
  //       form.getValues("image")
  //         ? form.getValues("image")
  //         : profileData.userInfo.image,
  //     )
  //     form.setValue(
  //       "background",
  //       form.getValues("background")
  //         ? form.getValues("background")
  //         : profileData.userInfo.image,
  //     )
  //   }
  // }
  async function submitHandler(values: z.infer<typeof formSchema>) {
    // console.log("called")
    let document: any = {}
    console.log(values, "values")
    if (values.image.length > 0) {
      const name = values.image[0].name + new Date().getTime()
      const storageRef = ref(storage, `user-assets/${current}/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, values.image[0])
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, "users", current!)
            setImageUrl(downloadURL)
            // console.log("File available at", downloadURL)
            form.setValue("image", [])
            return updateDoc(docRef, {
              image: downloadURL,
              imageName: `user-assets/${current}/${name}`,
            })
          })
        },
      )
    }
    // console.log("background file", values.background)

    if (values.background.length > 0) {
      const name = new Date().getTime().toString()
      const storageRef = ref(storage, `user-assets/${current}/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, values.background[0])
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, "users", current!)
            setBackgroundUrl(downloadURL)
            // console.log("File available at background", downloadURL)
            form.setValue("background", [])

            return updateDoc(docRef, {
              background: downloadURL,
              backgroundName: `user-assets/${current}/${name}`,
            })
          })
        },
      )
    }

    if (values.name) {
      setName(values.name)
      document.name = values.name
    }
    if (values.profession) {
      document.profession = values.profession
    }
    if (values.location) {
      document.location = values.location
    }
    if (values.pronouns) {
      document.pronouns = values.pronouns
    }
    if (values.description) {
      document.description = values.description
    }
    if (values.status) {
      document.status = values.status
    }
    if (values.language) {
      document.language = values.language
    }
    if (values.workPreference) {
      document.workPreference = values.workPreference
    }
    // document.progress = 0

    const docRef = doc(db, "users", current!)
    await updateDoc(docRef, document)
    const docSaved = await getDoc(docRef)
    // console.log(docSaved.data(), "docSaved")
    await getData()
  }
  async function addProject() {
    // console.log("clicked")
    addDoc(collection(db, "users", current!, "projects"), {
      progress: 0,
      timestamp: serverTimestamp(),
      owner: current,
      stage: "upload",
      published: false,
      questions: questions,
      // status:""
    })
      .then((docRef) => {
        router.push(`/add-project/upload/${docRef.id}`)
      })
      .catch((error) => console.error(error))
  }

  const { name, setName } = useHeader()

  // await fetch()
  async function getData() {
    // console.log("called")
    fetch("/api/profile-editor", {
      method: "POST",
      cache: "no-store",
      next: { revalidate: 0 },
      body: JSON.stringify({ uid: current }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data)
        // console.log(data, "data")
        // console.log(data, "data")
        // if()
        await Promise.all(
          data?.projects?.map(async (project: any, index: number) => {
            if (project.cover) {
              const storageRef = ref(storage, project.cover)
              try {
                const res = await getDownloadURL(storageRef)
                // console.log(res, project)
                const image = new Image()
                image.src = res
                await image.decode()
                data.projects[index] = {
                  ...data.projects[index],
                  coverLink: res,
                  aspectRatio: image.width / image.height,
                }
                URL.revokeObjectURL(image.src)
              } catch (err) {
                console.log(err, "asset", index, "not found")
              }

              // data.projects[index].coverLink = res
            }
          }),
        )
        // console.log(data.projects, "projectData")
        setProfileData(data)
        if (data.image) {
          setImageUrl(data.image)
          console.log("data get image", data.image)
        }
        if (data.background) {
          console.log("data get background", data.background)
          setBackgroundUrl(data.background)
        }
        // var c: userInfo
        if (data.name) {
          setName(data.name)
          // console.log("name", data.name)
          form.setValue("name", data.name)
        }
        if (data.description) {
          form.setValue("description", data.description)
        }
        if (data.location) {
          form.setValue("location", data.location)
        }
        if (data.language) {
          form.setValue("language", data.language)
          // console.log("language", data.language)
        }
        if (data.pronouns) {
          form.setValue("pronouns", data.pronouns)
        }

        if (data.profession) {
          form.setValue("profession", data.profession)
        }

        if (data.position) {
          form.setValue("profession", data.position)
        }
        if (data.workPreference) {
          // console.log("workPreference", data.workPreference)

          form.setValue("workPreference", data.workPreference)
        }
        if (data.status) {
          form.setValue("status", data.status)
        }

        // console.log(data);
        setLoad(false)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  useEffect(() => {
    if (!current) {
      router.push("/login")
      return
    }
    // console.log("refresh called")
    getData()
  }, [])

  // const profileData: Profile = await getData();
  // console.log(profileData, load, "mount");
  if (current && profileData && !load)
    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="relative">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[40%]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name={`name`}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example: Harvard"
                                  {...field}
                                  className={`rounded-[0.38rem] border-[1px] w-[100%]  ${
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
                    ></FormField>
                    <FormField
                      control={form.control}
                      name={`profession`}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Profession</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example: Harvard"
                                  {...field}
                                  className={`rounded-[0.38rem] border-[1px] w-[100%]  ${
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
                    ></FormField>
                  </div>
                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name={`location`}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example: Harvard"
                                  {...field}
                                  className={`rounded-[0.38rem] border-[1px] w-[100%]  ${
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
                    ></FormField>
                    <FormField
                      control={form.control}
                      name={`pronouns`}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Pronouns</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example: Harvard"
                                  {...field}
                                  className={`rounded-[0.38rem] border-[1px] w-[100%]  ${
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
                    ></FormField>
                  </div>
                  <Controller
                    control={form.control}
                    name="language"
                    render={({ field, fieldState }) => {
                      return (
                        <>
                          <div className="">
                            <FormLabel>Languages</FormLabel>
                            {/* languageOptionArray */}
                            <div className="rounded-[0.38rem] mt-1 border-[#848484] border-2 multiselect-editor">
                              <MultiSelect
                                labelledBy="Select Languages"
                                options={languagesArray}
                                // value={field.value ? field.value : []}
                                value={field.value.map((value): Option => {
                                  return { label: value, value: value }
                                })}
                                // control={form.control}
                                onChange={(props: Option[]) => {
                                  // console.log(props)
                                  field.onChange(
                                    props.map((option) => option.value),
                                  )
                                  // console.log(fieldState.error)
                                }}
                              />
                            </div>
                            <div className="text-xs text-[#CC3057]">
                              {fieldState.error?.message}
                            </div>
                          </div>
                        </>
                      )
                    }}
                  />
                  <FormItem>
                    <FormLabel>Set Your Work Preferences</FormLabel>
                    <div className="flex justify-between mx-1">
                      {workPreferences.map((item, id) => (
                        <FormField
                          key={id}
                          control={form.control}
                          name={`workPreference`}
                          render={({ field, fieldState }) => {
                            return (
                              <FormItem
                                key={id}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    value={item}
                                    checked={field.value.includes(item)}
                                    onCheckedChange={(checked: any) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : // : null;[...field.value, item]
                                          field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item,
                                            ),
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                  <FormField
                    control={form.control}
                    name={`description`}
                    render={({ field, fieldState }) => {
                      return (
                        <>
                          <FormItem className="text-left px-2 mt-4 w-[100%]">
                            <FormLabel>About Yourself</FormLabel>
                            <FormControl>
                              <MultiLineInput
                                maxLength={200}
                                rows={4}
                                placeholder="Example: I specialized in vernacular techniques and incorporated them to modern construction practices."
                                {...field}
                                className={`rounded-[0.38rem] w-full border-[1px] ${
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
                  <div className="flex justify-end my-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen((prev) => !prev)
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={openStatus} onOpenChange={setOpenStatus}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[40%]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <FormField
                    control={form.control}
                    name={`status`}
                    render={({ field, fieldState }) => {
                      return (
                        <>
                          <FormItem className="text-left px-2 mt-4 w-[100%]">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <MultiLineInput
                                maxLength={200}
                                rows={7}
                                placeholder="Example: I specialized in vernacular techniques and incorporated them to modern construction practices."
                                {...field}
                                className={`rounded-[0.38rem] w-full border-[1px] ${
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
                  <div className="flex justify-end my-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setOpenStatus((prev) => !prev)
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="relative min-h-[60vh] ">
                <div className="overflow-clip md:h-[60vh] h-[30vh] bg-[#8c8c8c] relative">
                  <Header />

                  <div className="inline-block px-4 py-2 text-white font-[500] text-[0.875rem] bg-[#484747] border-2 border-white hover:border-2 hover:border-transparent absolute bottom-2 right-16 rounded-[0.38rem] transition-colors hover:bg-slate-900">
                    {profileData.background ? "Edit " : "Add "}Cover Image
                    <label className=" h-full w-full block absolute top-0 left-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,audio/*,video/*"
                        {...form.register(`background`)}
                        className="hidden h-full absolute w-full top-0 left-0"
                        onChange={(e) => {
                          if (!e.target.files) {
                            setBackgroundUrl(
                              profileData && profileData.background
                                ? profileData.background
                                : "/image-thumbnail.png",
                            )
                            form.setValue("background", [])
                          } else if (e.target?.files[0]) {
                            setBackgroundUrl(
                              URL.createObjectURL(e.target.files[0]),
                            )
                            // console.log(e.target.files, "background")

                            form.setValue("background", [e.target.files[0]])
                          } else {
                            if (profileData && profileData.background) {
                              setBackgroundUrl(profileData.background)
                            } else {
                              setBackgroundUrl(
                                profileData && profileData.background
                                  ? profileData.background
                                  : "/image-thumbnail.png",
                              )
                            }
                          }
                        }}
                        // required
                      />
                    </label>
                  </div>
                  {backgroundUrl ? (
                    <img
                      loading="lazy"
                      src={`${backgroundUrl}`}
                      className="w-full object-cover h-full"
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="flex justify-center md:p-4 p-4  items-center absolute bg-white md:min-h-[10%] rounded-[6px] lg:w-[30%] md:w-[50%] w-[70%] md:left-[25%] lg:left-[35%] left-[15%] lg:translate-y-[calc(-85%-7.8rem)] translate-y-[calc(-85%-6rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
                  <span
                    className="inline-block absolute top-2 p-[0.15rem] right-2 rounded-[0.5rem] bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
                    onClick={() => {
                      setOpenStatus((prev) => !prev)
                    }}
                  >
                    <img
                      src="/edit-status.svg"
                      className="w-[1.2rem] h-[1.2rem]"
                      alt="edit-status"
                    />
                  </span>
                  <div className=" md:text-[1rem] font-[400] tracking-[-0.015rem]">
                    {/* {profileData ? profileData.userInfo.thought : ""} */}
                    {form.watch("status", "Add Status")}
                  </div>
                </div>
                <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-5rem] translate-y-[-3.8rem]"></div>
                <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3.2rem)] lg:translate-y-[-5.5rem] translate-y-[-4.1rem]"></div>
                <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.8rem)] lg:translate-y-[-6.2rem] translate-y-[-4.9rem]"></div>
                <div className="flex items-center justify-center absolute lg:h-[10rem] lg:w-[10rem] h-[8rem] bg-[rgba(217,217,217,0.80)] w-[8rem] rounded-full  lg:left-[calc(50%-5rem)]  left-[calc(50%-4rem)] lg:translate-y-[-5rem] translate-y-[-4rem] z-20">
                  <img
                    className="inline-block h-4 w-4"
                    src="/plus.png"
                    alt="plus"
                  />
                  <label className=" h-full w-full block absolute top-0 left-0 cursor-pointer">
                    {imageUrl ? (
                      <img
                        loading="lazy"
                        className="object-cover rounded-full h-full"
                        src={imageUrl}
                        alt="img"
                      />
                    ) : null}
                    <input
                      type="file"
                      accept="image/*,audio/*,video/*"
                      {...form.register(`image`)}
                      className="hidden h-full absolute w-full top-0 left-0"
                      onChange={(e) => {
                        if (!e.target.files) {
                          setImageUrl(
                            profileData && profileData.image
                              ? profileData.image
                              : "",
                          )
                          form.setValue("image", [])
                        } else if (e.target?.files[0]) {
                          setImageUrl(URL.createObjectURL(e.target.files[0]))
                          // console.log(e.target.files)
                          form.setValue("image", [e.target.files[0]])
                        } else {
                          if (profileData && profileData.image) {
                            setImageUrl(profileData.image)
                          } else {
                            setImageUrl(
                              profileData && profileData.image
                                ? profileData.image
                                : "",
                            )
                          }
                        }
                      }}
                      // required
                    />
                  </label>
                </div>

                <div className="relative z-[0]">
                  <div className="md:h-[5rem] h-[4.5rem] relative z-0"></div>
                  <div className="flex flex-col justify-between md:px-[30%] px-[5%] ">
                    <span
                      className="inline-block absolute top-4 p-1 right-[30%] rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
                      onClick={() => {
                        setOpen((prev) => !prev)
                      }}
                    >
                      <img
                        src="/edit-main.svg"
                        className="w-[1.5rem] h-[1.5rem]"
                        alt="edit-main"
                      />
                    </span>
                    <div>
                      <h1 className="text-center md:text-[2rem] text-[1.7rem] leading-7 md:leading-10 font-[700]">
                        {/* {profileData ? profileData.userInfo.name : ""} */}
                        {form.watch("name", "Profile Name")}
                      </h1>
                      <h3 className="text-center md:text-[1.3rem] text-[1.2rem] tracking-tight">
                        {/* {profileData ? profileData.userInfo.position : ""} */}
                        {form.watch("profession", "Profession")}
                      </h3>
                      <h3 className="text-center text-[1.2rem]">
                        in{" "}
                        <span className="text-[#848484] font-[700] ">
                          {/* {profileData ? profileData.userInfo.location : ""} */}
                          {form.watch("location", "Location")}
                        </span>
                      </h3>
                      <p className="text-center text-[0.8rem] font-[300] tracking-wider">
                        {/* ({profileData ? profileData.userInfo.pronouns : ""}) */}
                        ({form.watch("pronouns", "pronouns")})
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-center md:text-[0.9rem] text-[0.8rem] font-[500] tracking-tight">
                        {/* {profileData ? profileData.userInfo.about : ""} */}
                        {form.watch(
                          "description",
                          "Description about yourself",
                        )}
                      </p>
                      <div className="flex justify-center last:pr-0 mt-4">
                        <div className="inline-block pr-4">
                          <img
                            loading="lazy"
                            src="/person_add.svg"
                            alt="connections"
                            className="h-[0.8rem] w-[0.8rem] inline-block"
                          />
                          <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
                            {" "}
                            {profileData && profileData.connections
                              ? profileData.connections
                              : ""}
                          </span>
                        </div>
                        <div className="inline-block pr-4">
                          <img
                            loading="lazy"
                            src="/share.svg"
                            alt="shares"
                            className="h-[0.8rem] w-[0.8rem] inline-block"
                          />
                          <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
                            {" "}
                            {profileData && profileData.shares
                              ? profileData.shares
                              : ""}
                          </span>
                        </div>

                        <div className="inline-block">
                          <img
                            loading="lazy"
                            src="/calendar_month.svg"
                            alt="date joined"
                            className="h-[0.8rem] w-[0.8rem] inline-block"
                          />
                          <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
                            {" Joined in "}
                            {profileData
                              ? fetchMonth(
                                  new Date(
                                    profileData.timestamp?.seconds * 1000,
                                  ),
                                )
                              : ""}{" "}
                            {profileData
                              ? new Date(
                                  profileData.timestamp?.seconds * 1000,
                                ).getFullYear()
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="md:text-[0.8rem] text-[0.7rem] text-[#848484] text-center">
                        Languages:{" "}
                        {form
                          .watch("language", [])
                          .map((language: any, index: any) => (
                            <span key={language} className="font-[700]">
                              {language}
                              {profileData.language.length - 1 > index
                                ? ", "
                                : null}
                            </span>
                          ))}
                      </div>
                      <div className="md:text-[0.8rem] text-[0.7rem] text-[#848484] text-center mb-4">
                        Work Preference:{" "}
                        <span className="font-[700]">
                          {form
                            .watch("workPreference")
                            .map((item: any, index: any) => (
                              <span key={index} className="font-[700]">
                                {item}
                                {profileData.workPreference.length - 1 > index
                                  ? ", "
                                  : null}
                              </span>
                            ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-16 pt-16 pb-16 ">
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry gutter="1.5rem">
                      <div className="px-4" onClick={addProject}>
                        <div className="h-[50vh] w-full hover:bg-gradient-to-t hover:from-[#858585] transition-all ease-in-out hover:to-[rgba(255,255,255,0.00)] bg-gradient-to-b border-[1px] border-[#848484] from-[#858585] to-[rgba(255,255,255,0.00)] bg-[linear-gradient(180deg,#858585_0%,rgba(255, 255, 255, 0.00)_100%)] rounded-[1.13rem] flex items-center justify-center cursor-pointer">
                          <img src="/plus.png" className="h-8 w-8" alt="plus" />
                        </div>
                        <div className="mt-2 ">
                          <h3 className="font-[500] text-[1.5rem] tracking-tight">
                            Add new project
                          </h3>
                          <p className="text-[#848484] text-[0.875rem] font-[500]">
                            Description of the project
                          </p>
                        </div>
                      </div>
                      {profileData?.projects.map(
                        (project: any, index: number) => {
                          return (
                            // <>
                            <div className="px-4" key={index}>
                              <div className="relative group max-h-[50vh] min-h-[30vh] w-full  overflow-clip transition-all ease-in-out  rounded-[1.13rem] bg-gray-300 ">
                                {/* <img
                                  src="/plus.png"
                                  className="h-8 w-8"
                                  alt="plus"
                                /> */}
                                {project.coverLink && (
                                  <img
                                    alt=""
                                    src={`${project.coverLink}`}
                                    className={` object-cover w-full max-h-[50vh] aspect-${project.aspectRatio}}`}
                                  />
                                )}
                                <div className="absolute top-0 opacity-60 transition-colors h-full w-full group-hover:bg-black"></div>
                                <Setting
                                  uid={project.uid}
                                  index={index}
                                  setProfileData={setProfileData}
                                />
                              </div>
                              {(project.projectName || project.description) && (
                                <div className="mt-2 ">
                                  {project.projectName && (
                                    <h3 className="font-[500] text-[1.5rem] tracking-tight">
                                      {project.projectName}
                                    </h3>
                                  )}
                                  {project.description && (
                                    <p className="text-[#848484] text-[0.875rem] font-[500]">
                                      {project.description.substring(0, 20)}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                            // </>
                          )
                        },
                      )}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>

                {/* <div className="h-[4rem]"></div> */}
              </div>
            </div>
            <Button type="submit" className="fixed bottom-2 right-8">
              Update Details
            </Button>
          </form>
        </Form>
      </>
    )
  else null
}
// export const revalidate = 0

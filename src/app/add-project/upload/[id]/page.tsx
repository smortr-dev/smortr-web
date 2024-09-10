/* eslint-disable @next/next/no-img-element */
"use client"
import { Controller, useForm } from "react-hook-form"
import Section from "../../Section"
import { promise, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
// import { initialQuestionGenerate, sendMail } from "@/app/actions/actions"
// import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/context/AuthContext"
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db, storage } from "@/lib/firebase"
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Select, SelectGroup, SelectItem } from "@/components/ui/select"
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import clsx from "clsx"
import { SelectLabel } from "@radix-ui/react-select"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import UploadedSection from "../../UploadedSection"
// import { formatRFC3339 } from "date-fns"

import { MultiSelect, Option } from "react-multi-select-component"
import { rejects } from "assert"
import { uploadFileRecursive } from "@/lib/uploadFileRecursive"
import { cn } from "@/lib/utils"
import Link from "next/link"
function convertToOptions(props: string[] | undefined): Option[] {
  // console.log(props, "props")
  if (!props) return []
  else {
    let temp: Option[] = props.map((item): Option => {
      return { label: item, value: item }
    })
    return temp
  }
  return []
}
function optionCreator(array: string[]) {
  return array.map((item) => {
    let returnValue: Option = { label: item, value: item }
    return returnValue
  })
}
// let design_sector: Option[] = optionCreator([
//   "Architecture",
//   "Interior Design",
//   "Urban Design",
//   "Landscape Design",
//   "Construction Technology",
//   "Infrastructure",
//   "Services",
//   "Visualization",
//   "Concept Design",
//   "Art",
// ])
// const typology: string[] = []
let typology: { label: string; options?: string[] }[] = [
  {
    label: "Residence",
    options: [
      "House",
      "Villa",
      "Apartment",
      "Rooms",
      "Coliving",
      "Social housing",
      "Township",
    ],
  },
  {
    label: "Commercial",
    options: [
      "Retail",
      "Store",
      "Showroom",
      "Shopping center",
      "Market",
      "Exhibit",
      "Station",
      "Bank",
      "Office",
      "Workspace",
      "Institutional",
    ],
  },
  {
    label: "Hospitality",
    options: [
      "Restaurant",
      "Bar",
      "Cafe",
      "Eatery",
      "Pub",
      "Club",
      "Hotel",
      "Hostel",
      "Cabin",
      "Tourism",
    ],
  },
  {
    label: "Sports",
    options: [
      "Gymnasium",
      "Sports field",
      "Recreation",
      "Fitness",
      "Stadium",
      "Indoor hall",
    ],
  },
  {
    label: "Healthcare",
    options: [
      "Hospital",
      "Clinic",
      "Medical facilities",
      "Rehabilitation",
      "Asylum",
      "Spa",
      "Sauna",
      "Veterinary",
      "Shelter",
      "Laboratory",
    ],
  },
  {
    label: "Education",
    options: [
      "School",
      "Kindergarten",
      "Nursery",
      "Library",
      "University",
      "College",
      "Institute",
      "Research center",
      "Coaching center",
      "Dorms",
    ],
  },
  {
    label: "Cultural",
    options: [
      "Theater",
      "Auditorium",
      "Pavilion",
      "Gallery",
      "Exhibition center",
      "Installation",
      "Stall",
      "Forum",
      "Cinema",
      "Concert venue",
      "Hall",
      "Performing arts center",
      "Theme park",
      "Arcade",
      "Gaming",
      "Cultural center",
      "Museum",
      "Heritage",
      "Memorial",
      "Tower",
      "Zoo",
      "Aquarium",
      "Planetarium",
      "Interpretation center",
    ],
  },
  {
    label: "Public",
    options: [
      "Administration buildings",
      "Government buildings",
      "Public service buildings",
      "Courthouse",
      "Town & city hall",
      "Municipal building",
      "Fire station",
      "Police station",
      "Emergency services facility",
      "Headquarters",
      "Training facility",
      "Community center",
      "Monument",
    ],
  },
  {
    label: "Religious",
    options: [
      "Temple",
      "Church",
      "Mosque",
      "Chapel",
      "Monastery",
      "Cathedral",
      "Synagogue",
      "Praying room",
      "Memorial center",
      "Cemetery",
      "Crematorium",
      "Grave",
    ],
  },
  {
    label: "Industrial",
    options: [
      "Factory",
      "Workshop",
      "Industry",
      "Warehouse",
      "Plant",
      "Godown",
      "Brewery",
      "Barn",
      "Storage",
    ],
  },
  {
    label: "Infrastructure",
    options: [
      "Bridges",
      "Transit station",
      "Waste management",
      "Aviation",
      "Telecommunications",
      "Water management",
    ],
  },
  {
    label: "Urbanism",
    options: [
      "Urban planning",
      "Masterplan",
      "Parks",
      "Campus",
      "Public space",
      "Transport corridors",
    ],
  },
  {
    label: "Landscape",
    options: [
      "Greenways",
      "Green belt",
      "Garden",
      "Ground",
      "Layout",
      "Forestry design",
      "Land reclamation",
      "Flood protection",
    ],
  },
  {
    label: "Refurbishment",
    options: ["Renovation", "Extension", "Adaptive reuse", "Restoration"],
  },
]
function convertToValues(props: Option[]): string[] {
  let temp: string[] = props.map((item): string => item.value)
  return temp
}
// let scope_role: Option[] = optionCreator([
//   "Architectural Designer",
//   "Designer",
//   "Intern",
//   "Engineer",
//   "Consultant",
//   "Freelancer",
//   "Service Provider",
//   "Research",
//   "Visualization",
//   "Student",
//   "Contractor",
//   "Production",
//   "Furniture Designer",
//   "Data Analysis",
//   "Instructor",
//   "Other",
// ])
let project_type: string[] = ["Hypothetical", "Real-life"]
export default function Upload({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [design_sector, setDesignSector] = useState<Option[]>(
    optionCreator([
      "Architecture",
      "Interior Design",
      "Urban Design",
      "Landscape Design",
      "Construction Technology",
      "Infrastructure",
      "Services",
      "Visualization",
      "Concept Design",
      "Art",
    ]),
  )
  const [scope_role, setScopeRole] = useState<Option[]>(
    optionCreator([
      "Architectural Designer",
      "Designer",
      "Intern",
      "Engineer",
      "Consultant",
      "Freelancer",
      "Service Provider",
      "Research",
      "Visualization",
      "Student",
      "Contractor",
      "Production",
      "Furniture Designer",
      "Data Analysis",
      "Instructor",
      "Other",
    ]),
  )
  const [load, setLoad] = useState(false)
  const [save, setSave] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<
    {
      name?: string
      contentType?: string
      url?: string
      path: string
      user: string
      project: string
    }[]
  >([])

  const [move, setMove] = useState(false)
  const [preventSubmit, setPreventSubmit] = useState(false)
  const { current } = useContext(AuthContext)
  const formSchema = z.object({
    projectName: z.string().min(1),
    description: z.string().optional(),
    files: z.any().array(),
    design_sector: z.string().array().optional(),
    typology: z.string().optional(),
    scope_role: z.string().array().optional(),
    project_type: z.string().optional(),
    // privacy: privacy,
  })
  // form.register
  // const form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
      projectName: "",
      description: "",

      // privacy: "private",
    },
  })
  async function loadInitialValues() {
    try {
      const res = await fetch("/api/add-project/view", {
        method: "POST",
        body: JSON.stringify({ user: current!, uid: params.id }),
      })
      const preData = await res.json()
      // console.log("preData", preData)
      // form.setValue(preData)

      if (preData?.projectName) {
        form.setValue("projectName", preData.projectName)
      }
      if (preData?.description) {
        form.setValue("description", preData.description)
      }
      if (preData?.scope_role) {
        // console.log(preData.scope_role, scope_role)
        if (typeof preData?.scope_role == "string") {
          form.setValue("scope_role", [preData.scope_role])
        } else {
          let options = convertToValues(scope_role)
          let res = preData.scope_role.filter(
            (item: string) => !options.includes(item),
          )
          setScopeRole((prev) => {
            // let test = convertToOptions([...res, ...convertToValues(prev)])
            // console.log(res, "res")
            // console.log(test, "test")
            let test = convertToOptions([...res, ...convertToValues(prev)])
            console.log(test, "scope_role test")
            return test
          })
          // scope_role = convertToOptions([...options, res])
          form.setValue("scope_role", preData.scope_role)
        }
      }
      if (preData?.design_sector) {
        if (typeof preData?.design_sector == "string") {
          form.setValue("design_sector", [preData.design_sector])
        } else {
          // form.setValue("design_sector", preData.design_sector)
          let options = convertToValues(design_sector)
          let res = preData.design_sector.filter(
            (item: string) => !options.includes(item),
          )
          setDesignSector((prev) => {
            // let test = convertToOptions([...res, ...convertToValues(prev)])
            // console.log(res, "res")
            // console.log(test, "test")
            let test = convertToOptions([...res, ...convertToValues(prev)])
            console.log(test, "Design sector test")
            return test
          })
          // scope_role = convertToOptions([...options, res])
          form.setValue("design_sector", preData.design_sector)
        }
      }
      if (preData?.project_type) {
        form.setValue("project_type", preData.project_type)
      }
      if (preData?.typology) {
        form.setValue("typology", preData.typology)
      }

      if (!preData.progress || preData?.progress == 0) {
        // console.log("move", false)
        setMove(false)
      } else {
        // console.log("move", true)
        setMove(true)
      }
      // console.log(preData, "predata")
      if (preData?.status == "submitted") {
        // console.log("preventstatus", true)
        setPreventSubmit(true)
      } else {
        // console.log("preventstatus", false)
        setPreventSubmit(false)
      }
      if (preData?.assets) {
        let uploadFileData: {
          name?: string
          contentType?: string
          url?: string
          project: string
          user: string
          path: string
        }[] = []
        const asset_data = preData.files
        // console.log(asset_data, "assetdata")
        // console.log(preData.assets)
        await Promise.all(
          preData.assets.map(async (asset: string, index: number) => {
            let assetRef = ref(storage, asset)
            let uploadFile: {
              name?: string
              contentType?: string
              url?: string
              project: string
              user: string
              path: string
            } = {
              path: asset,
              user: current!,
              project: params.id,
            }
            try {
              const metaData = await getMetadata(assetRef)
              uploadFile["contentType"] = metaData.contentType
              if (metaData.contentType?.split("/")[0] == "image") {
                const url = await getDownloadURL(assetRef)
                uploadFile["url"] = url
              }
              if (asset_data && asset_data[index] && asset_data[index].name) {
                // console.log("name2")

                // let name = asset_data[index].name
                uploadFile["name"] = asset_data[index].name
                // console.log(name, index, "name 1")
              } else {
                // console.log("name1")
                // let name = asset.split("/").slice(-1).join("")
                uploadFile["name"] = asset_data[index]
                  .split("/")
                  .slice(-1)
                  .join("")
                // console.log(name, index, "name 2")
              }
              // console.log(index, uploadFile)
              uploadFileData.push(uploadFile)
            } catch (err) {
              console.log(err)
            }
          }),
        )
          .then(() => {
            // console.log(uploadFileData, "uploadFileData")
            setUploadedFiles(uploadFileData)
          })
          .catch((err) => {
            console.log(err)
          })

        // setUploadedFiles(preData.assets)
      }
      setLoad(true)
      // if()
      // if(preDa)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (!current) return

    loadInitialValues()
  }, [])
  // form

    
  async function assetTagging(files: File[], userId: string | null | undefined, projectId: string, fileURL: string[]) {
    //console.log("Entered assetTag");

    try {
        console.log("Fetching project data from Firestore...");
        // Fetch project document
        const projectRef = doc(db, "users", userId!, "projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        //console.log('Project Snapshot:', projectSnapshot.data());
        if (!projectSnapshot.exists()) {
            throw new Error("Project does not exist");
        }

        const projectData = projectSnapshot.data();
        console.log("Assets fetched:", projectData.assets);
        const assets = projectData.assets || [];
        //let fileIndex = assets.length-1;

        for (let fileIndex =0; fileIndex < files.length; fileIndex++) {
          try{
            console.log("Entered for loop");
            const file = files[fileIndex];
            const fileName = file.name;
            const fileType = fileName.split('.').pop();
            console.log(`Processing file ${fileIndex + 1}/${files.length}: ${fileName}, Type: ${fileType}`);

            let apiUrl = '';
            if (fileType === 'pdf') {
                apiUrl = '/api/add-project/asset-tagging/pdf-files';
            } else if (fileType === 'jpeg' || fileType === 'png'|| fileType === 'jpg') {
                apiUrl = '/api/add-project/asset-tagging/image-files';
            } else {
                console.warn(`Unsupported file type: ${fileType}`);
                continue; // Skip unsupported file types
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId || ''); // Safely append userId
            formData.append('projectId', projectId);
            formData.append('fileIndex', fileIndex.toString());
            formData.append('fileURL', fileURL[fileIndex]);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });
          
            if (!response.ok) {
                throw new Error(`Failed to process ${fileType} file`);
            }

            const data = await response.json();
            console.log(`${fileType} processing response:`, data);
        } catch (error) {
          console.log("Error in asset tagging:", error);
        }}
    } catch (error) {
        console.error('Error tagging assets:', error);
    }
}




  async function uploadToOpenAI(files: File[], userId: string | null | undefined, projectId: string, fileURL: string[]) {
    const formData = new FormData();
    // formData.append('file', files);
    files.forEach(file => formData.append('file', file));
    if (userId !== null && userId !== undefined) {
      formData.append('userId', userId);
    }
    formData.append('projectId', projectId);
    formData.append('fileURL', JSON.stringify(fileURL));
    try {
      const response = await fetch('/api/add-project/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload to OpenAI');
      }
  
      const data = await response.json();
      console.log('OpenAI upload response:', data);
      
      // Handle the thread response
      if (data.success) {
        console.log('Thread response:', data.response);
        // Do something with the response
      }
    } catch (error) {
      console.error('Error uploading to OpenAI:', error);
    }
  }
  
  async function uploadContent(values: z.infer<typeof formSchema>) {
    let document: any = {};
    const docRef = doc(db, 'users', current!, 'projects', params.id);
    let foundCover = false;
    let files = values.files;
    let fileURL: string[] = [];
    try {
      const doc = await getDoc(docRef);
      console.log(files.length, 'file length');
      console.log('promise called');
  
      const filePaths: string[] = []; // Array to hold file paths
  
      const promises = files.map(async (file: File, index: number) => {
        const name = file.name.split('.').slice(0, -1).join() + '-' + new Date().getTime() + '.' + file.name.split('.').slice(-1).join();
        const storageRef = ref(storage, `user-assets/${current}/projects/${params.id}/${name}`);
  
        try {
          await Promise.all([
            uploadFileRecursive(storageRef, file, 20, current!, params.id!, name, form, index)
              .then(async () => {
                if (!foundCover && file.type.split('/').splice(0, 1).join('') === 'image') {
                  try {
                    await updateDoc(docRef, {
                      cover: `user-assets/${current}/projects/${params.id}/${name}`,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                  foundCover = true;
                }
                console.log('called');
                // Add file path to the array
                filePaths.push(`public/user-assets/${current}/projects/${params.id}/${name}`);
                let fileUrl;
                if (file.type.split('/')[0] === 'image') {
                  fileUrl = await getDownloadURL(storageRef);
                  fileURL.push(fileUrl);
                  console.log('File URL:', fileUrl);
              }
              })
              .catch(err => {
                console.log('upload Error', err, index);
              }),

            //uploadToOpenAI(file, current!, params.id!,fileURL) // Convert to string

          ]);
        } catch (err) {
          console.log(err);
        }
      });
  
      await Promise.all(promises);
      
      const docData = doc.data();
      const progress = docData?.progress;
      if(progress === 0){
      await uploadToOpenAI(files, current!, params.id!,fileURL);
    }
      await assetTagging(files,current!, params.id!,fileURL);
  
      form.setValue('files', []);
      console.log(form.getValues('files'), 'after refresh');
  
      document = values;
      document.files = undefined;
      await updateDoc(docRef, { ...document, status: 'submitted',progress: 1 });
      
  
      // await sendMail(current!, params.id);
      await loadInitialValues();
  
      toast({
        title: 'Updated Successfully',
      });
  
      // if (!move) {
      //   toast({
      //     title: "We'll Email you once the content is processed!",
      //   });
      // }
    } catch (err) {
      toast({
        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4'),
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
      });
      console.log(err);
    }
  }
  

  async function submitHandler(values: z.infer<typeof formSchema>) {

    setSave(true)
    try {
      await uploadContent(values)
    } catch (err) {
      console.log(err)
    }
    setSave(false)
    setPreventSubmit(true)
  }

  return (
    load && (
      <>
        <div className="sticky w-full py-1 top-0 z-[100] px-16 grid grid-cols-[1fr_2fr_1fr] bg-white">
          {/* <div className="absolute translate-x-[-50%] left-[50%]"> */}
          {/* <div className="absolute left-16"> */}
          <div className="flex justify-start items-center">
            {/* <Button
              className="border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault()
                router.push("/profile-editor")
              }}
            >
              <span>Close</span>
            </Button> */}
            <Link href={`/profile-editor`}>
              <div className=" hover:bg-gray-200 p-2 rounded-md transition-colors flex justify-center items-center font-bold text-xl">
                <div className="inline-block  mr-2">Projects</div>
                <div className="inline-block  mr-2">&gt;</div>
                <div className="inline-block ">
                  {form.watch("projectName", "New Project")}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex relative items-center justify-center">
            <Button
              disabled={true}
              className="mx-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
            >
              <img
                src="/arrow_prev.svg"
                className="w-8 inline-block"
                alt="prev"
              />
            </Button>
            <Section active="upload" move={move} load={load} />
            <Button
              disabled={!load || (!move && preventSubmit) || save}
              onClick={async (e) => {
                e.preventDefault()
                await form.handleSubmit(submitHandler)()
                if (move) {
                  router.push(`/add-project/edit/${params.id}`)
                }
              }}
              className="mx-2 p-2 rounded-full  text-black border-gray-400 bg-white hover:bg-gray-400  transition-colors border cursor-pointer"
            >
              <img
                src="/arrow_next.svg"
                className="w-8 inline-block"
                alt="next"
              />
            </Button>
          </div>
          {/* <div className="absolute right-16"> */}
          <div className="flex justify-end">
            <Button
              disabled={!load || save}
              onClick={async (e) => {
                e.preventDefault()
                await form.handleSubmit(submitHandler)()
                // await loadInitialValues()
                // if (move) {
                //   router.push(`/add-project/edit/${params.id}`)
                // }
              }}
              className="ml-2 inline-block bg-[#6563FF] border border-transparent text-white rounded-[0.38rem] hover:text-[#6563FF] hover:border-[#6563FF] hover:bg-white transition-colors"
            >
              Save
            </Button>
            <Button
              disabled={!load || save}
              onClick={async (e) => {
                e.preventDefault()
                router.push("/profile-editor")
              }}
              className="ml-2 inline-block bg-white border border-[#6563FF] text-[#6563FF] rounded-[0.38rem] hover:text-white hover:bg-[#6563FF] hover:border-transparent transition-colors"
            >
              Cancel
            </Button>
          </div>
          

          {/* </div> */}
        </div>
        <div className="bg-[#ECECEC] px-32 pb-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <div className="pt-4">
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
                                maxLength={3000}
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

              <div className="my-4 grid grid-cols-4 gap-x-2">
                {/* <FormField
            control={form.control}
            name={`design_sector`}
            render={({ field, fieldState }) => {
              return (
                <>
                  <FormItem>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white rounded-[0.88rem] px-4 py-6 text-[0.875rem] font-[500]">
                          <SelectValue placeholder="Design Sector" />
                        </SelectTrigger>
                        <SelectContent className="overflow-y-auto max-h-[40vh]">
                          {design_sector.map((option, index) => {
                            return (
                              // <>
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                              // </>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </>
              )
            }}
          /> */}
                <Controller
                  control={form.control}
                  name="design_sector"
                  render={({ field, fieldState }) => {
                    return (
                      <MultiSelect
                        isCreatable={true}
                        className="text-black design-sector-view"
                        overrideStrings={{ selectSomeItems: "Design Sector" }}
                        labelledBy="Design Sector"
                        options={design_sector || []}
                        // value={field.value ? field.value : []}
                        value={convertToOptions(field.value)}
                        // control={form.control}
                        onChange={(props: Option[]) => {
                          console.log(props)
                          return field.onChange(convertToValues(props))
                        }}
                      />
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name={`typology`}
                  render={({ field, fieldState }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="bg-white rounded-[0.88rem] px-4 py-6 text-[0.875rem] font-[500]">
                              <SelectValue placeholder="Typology" />
                            </SelectTrigger>
                            <SelectContent className="overflow-y-auto max-h-[40vh]">
                              {typology.map((group, index) => {
                                return (
                                  <SelectGroup key={index}>
                                    <SelectLabel className="font-[500] pl-4  border-2 border-gray-100 rounded-sm">
                                      {group.label}
                                    </SelectLabel>
                                    {group.options?.map((item, index) => {
                                      return (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      )
                                    })}
                                  </SelectGroup>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />

                <Controller
                  control={form.control}
                  name="scope_role"
                  render={({ field, fieldState }) => {
                    return (
                      <MultiSelect
                        isCreatable={true}
                        className="scope-role-view text-black scop-role-view"
                        overrideStrings={{ selectSomeItems: "Scope/Role" }}
                        labelledBy="Scope/Role"
                        options={scope_role}
                        // value={field.value ? field.value : []}
                        value={convertToOptions(field.value)}
                        // control={form.control}
                        onChange={(props: Option[]) => {
                          // console.log("trigger")
                          return field.onChange(convertToValues(props))
                        }}
                      />
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name={`project_type`}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <FormItem>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="bg-white rounded-[0.88rem] px-4 py-6 text-[0.875rem] font-[500]">
                                <SelectValue placeholder="Project Type" />
                              </SelectTrigger>
                              <SelectContent className="overflow-y-auto max-h-[40vh]">
                                {project_type.map((option, index) => {
                                  return (
                                    // <>
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                    // </>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      </>
                    )
                  }}
                />
              </div>

              {/* <div className="p-4 bg-white rounded-[0.88rem]">
            {uploadedFiles}
          </div> */}
              {/* {uploadedFiles && uploadedFiles.length > 0 && ( */}
              <UploadedSection
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
              {/* )} */}
              <div className="p-4 bg-white rounded-[0.88rem]">
                <div className="flex justify-between items-center">
                  <h3 className="font-[500] text-[1.25rem]">Upload Content</h3>
                  <label
                    onClick={(e) => {
                      if (save) e.preventDefault()
                    }}
                    className={`hover:cursor-pointer inline-block font-[500] text-sm bg-black  text-white  transition-colors p-2 border border-black rounded-md ${
                      form.watch("files", []).length > 0 ? "visible" : "hidden"
                    } ${
                      save
                        ? "opacity-70"
                        : "opacity-100 hover:text-black hover:bg-white"
                    }`}
                    htmlFor="dropzone"
                  >
                    Attach More Files
                  </label>
                </div>
                <Previews
                  setFiles={form.setValue}
                  getValues={form.getValues}
                  form={form}
                  save={save}
                />
              </div>
              <div className=" h-[1px] w-full"></div>

              {/* <div className="flex justify-center">
                <div
                  className={clsx(
                    "inline-block mr-6 text-[#cc3057] ",
                    !move && preventSubmit ? "" : "hidden",
                  )}
                >
                  We will email you when your content has been processed
                </div>
              </div> */}
            </form>
          </Form>
        </div>
      </>
    )
  )
}

// <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
//                   <AlertDialogTrigger asChild>
//                     {/* <Button variant="outline">Show Dialog</Button> */}
//                     <Button className="rounded-[0.38rem] text-white bg-red-500 hover:bg-red-700 transition-colors border cursor-pointer">
//                       Delete
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                         Are you absolutely sure?
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         Are you sure you want to delete? Your content will be
//                         lost forever.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <Button
//                         disabled={deleteStatus}
//                         className="bg-black text-white hover:bg-gray-900"
//                         onClick={async () => {
//                           try {
//                             setDeleteStatus(true)
//                             const res = await fetch("/api/delete-project", {
//                               method: "POST",
//                               body: JSON.stringify({
//                                 projectId: params.id,
//                                 caller: current!,
//                               }),
//                             })
//                             console.log(res, "delete-project")
//                             setDeleteStatus(false)
//                             const res_body = await res.json()
//                             console.log(res_body, "res_body")
//                             if (res.status == 200) {
//                               console.log("status")
//                               setDeleteStatus(false)
//                               router.push("/profile-editor")
//                             } else {
//                               // const res = await fetch(
//                               //   "/api/add-project/delete-project",
//                               //   {
//                               //     method: "POST",
//                               //     body: JSON.stringify({
//                               //       projectId: params.id,
//                               //       caller: current!,
//                               //     }),
//                               //   },
//                               // )
//                             }
//                             // console.log(res_body)
//                           } catch {
//                             setDeleteStatus(false)
//                           }
//                         }}
//                       >
//                         Continue
//                       </Button>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>

"use client"
import React, { useState, useEffect, useCallback, ChangeEvent } from "react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, getMetadata, getDownloadURL, uploadBytes } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { MultiSelect, Option } from "react-multi-select-component"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PlusCircle, X } from "lucide-react"

interface ProjectDetails {
  projectName: string
  description: string
  design_sector: string[]
  typology: string
  scope_role: string[]
  project_type: string
  location: string
  area: string
  year: string
  note: string
  tags: string[]
  cover: string
}

interface ProjectSummaryProps {
  userID: string
  projectID: string
  view: "details" | "edit" | "info"
  onViewChange: (view: "details" | "edit" | "info") => void
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  userID,
  projectID,
  view,
  onViewChange,
}) => {
  const [context, setContext] = useState("")
  const [conflict, setConflict] = useState("")
  const [resolution, setResolution] = useState("")
  const [reaction, setReaction] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    design_sector: [],
    projectName: "",
    project_type: "",
    scope_role: [],
    typology: "",
    description: "",
    location: "",
    area: "",
    year: "",
    note: "",
    tags: [],
    cover: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"unsaved" | "saving" | "saved">(
    "saved",
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  const handleSaveClick = () => {
    setShowSaveConfirmation(true)
  }

  const handleSaveConfirm = async () => {
    try {
      let coverURL: any = projectDetails.cover
      if (imageFile) {
        coverURL = await handleImageUpload()
      }
      const updatedDetails = { ...projectDetails, cover: coverURL }
      await updateDoc(
        doc(db, "users", userID, "projects", projectID),
        updatedDetails,
      )
      console.log("Updated Details:", updatedDetails)
      setProjectDetails(updatedDetails)
      setShowSaveConfirmation(false)
    } catch (error) {
      console.error("Error saving data:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", userID, "projects", projectID)
        const docRes = await getDoc(docRef)
        if (docRes.exists()) {
          const data = docRes.data()
          setContext(data?.Context || "")
          setConflict(data?.Conflict || "")
          setResolution(data?.Resolution || "")
          setReaction(data?.Reaction || "")
          setProjectDetails((prevDetails) => ({
            ...prevDetails,
            design_sector: data?.design_sector || [],
            projectName: data?.projectName || "",
            project_type: data?.project_type || "",
            scope_role: data?.scope_role || [],
            typology: data?.typology || "",
            description: data?.description || "",
            area: data?.area || "",
            note: data?.note || "",
            cover: data?.cover || "",
            tags: data?.tags || [],
          }))

          if (data?.cover) {
            const storeRef = ref(storage, data.cover)
            try {
              const meta = await getMetadata(storeRef)
              if (meta.contentType?.split("/")[0] === "image") {
                const filePath = await getDownloadURL(storeRef)
                setCoverImage(filePath)
              }
            } catch (error) {
              console.error("Error fetching cover image:", error)
            }
          }
        }

        const userDocRef = doc(db, "users", userID)
        const userDocRes = await getDoc(userDocRef)
        if (userDocRes.exists()) {
          const userData = userDocRes.data()
          const timeStamp = userData?.timestamp?.toDate()
          const year = timeStamp?.getFullYear() || ""
          setProjectDetails((prevDetails) => ({
            ...prevDetails,
            location: userData?.location || "",
            year: year || "",
          }))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [userID, projectID])

  const handleProjectInfoSave = async () => {
    setEditMode(false)
  }

  const handleSave = async (data: ProjectDetails) => {
    setIsSaving(true)
    setSaveStatus("saving")
    try {
      let coverURL: any = projectDetails.cover
      if (imageFile) {
        coverURL = await handleImageUpload()
      }
      const updatedDetails = { ...data, cover: coverURL }
      console.log("Updated Details:", updatedDetails)
      await updateDoc(
        doc(db, "users", userID, "projects", projectID),
        updatedDetails,
      )
      setProjectDetails(updatedDetails)
      setSaveStatus("saved")
    } catch (error) {
      console.error("Error saving data:", error)
      setSaveStatus("unsaved")
    }
    setIsSaving(false)
  }

  const handleImageUpload = async () => {
    if (imageFile) {
      const storageRef = ref(storage, `covers/${userID}/${projectID}`)
      await uploadBytes(storageRef, imageFile)
      const downloadURL = await getDownloadURL(storageRef)
      return downloadURL
    }
    return null
  }

  const handleTextChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setter(e.target.value)
    }

  const optionCreator = (items: string[]): Option[] =>
    items.map((item) => ({ label: item, value: item }))

  const convertToOptions = (values: string[]): Option[] =>
    values.map((value) => ({ label: value, value }))

  const convertToValues = (options: Option[]): string[] =>
    options.map((option) => option.value)

  const typology = [
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
  const { register, control, handleSubmit } = useForm<ProjectDetails>({
    defaultValues: projectDetails,
  })

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
  const project_type = ["Hypothetical", "Real-life"]

  const renderHeader = () => (
    <div className="flex justify-between p-3 h-10 w-full border-[#BDBDBD] border-b-2 items-center">
      <div className="flex flex-row items-center gap-3">
        <select
          value={view}
          onChange={(e) =>
            onViewChange(e.target.value as "details" | "edit" | "info")
          }
          className="text-[#1769FF] bg-[#FFFFFF] border-none hover:cursor-pointer font-sans"
        >
          <option value="details">Project Details</option>
          <option value="edit">Edit Project Details</option>
          <option value="info">Project Info</option>
        </select>
      </div>
      {view === "edit" && (
        <button onClick={handleSaveClick}>
          <Image src="/savemark.svg" width={30} height={30} alt="Save" />
        </button>
      )}
      {view === "info" && (
        <div className="flex flex-row gap-3 p-1">
          <Image src="/star.svg" width={25} height={25} alt="Star" />
          <button onClick={() => setEditMode(true)}>
            <Image src="/edit-main.svg" width={25} height={25} alt="Edit" />
          </button>
        </div>
      )}
      {view === "details" && (
        <div className="flex flex-row gap-3 p-1">
          <Image src="/star.svg" width={25} height={25} alt="Star" />
          <Image src="/edit-main.svg" width={25} height={25} alt="Edit" />
        </div>
      )}
    </div>
  )

  const SaveConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Save</h2>
        <p>Are you sure you want to save the changes?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={() => setShowSaveConfirmation(false)}
          >
            Cancel
          </button>
          <Button
            className="px-4 py-2  text-white rounded"
            onClick={handleSaveConfirm}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )

  const renderInfoView = () => (
    <div>
      {editMode ? (
        <>
          {["Context", "Conflict", "Resolution", "Reaction"].map((section) => (
            <div key={section} className="flex flex-col p-4">
              <p className="text-md font-semibold p-2">{section}</p>
              <Textarea
                value={eval(section.toLowerCase())}
                onChange={handleTextChange(eval(`set${section}`))}
              />
            </div>
          ))}
          <div className="flex justify-start items-center mt-4 p-3 ml-2">
            <Button onClick={handleProjectInfoSave}>Save Changes</Button>
          </div>
        </>
      ) : (
        <>
          {["Context", "Conflict", "Resolution", "Reaction"].map((section) => (
            <div key={section} className="flex flex-col p-4">
              <p className="text-md font-semibold p-2">{section}</p>
              <div className="p-3">
                <p>{eval(section.toLowerCase())}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )

  const renderDetailsView = () => (
    <div className="overflow-y-scroll">
      {coverImage && (
        <div className="flex justify-center items-center w-full p-4">
          <img
            src={coverImage}
            alt="Project Cover"
            className="object-cover rounded-2xl w-40 h-40"
          />
        </div>
      )}
      <div className="">
        <p className="text-lg font-semibold p-1 text-left ml-3">
          {projectDetails.projectName}
        </p>
        <p className="text-lg font-semibold p-1 text-left ml-3">
          {projectDetails.typology}
        </p>
      </div>
      <div className="p-2">
        <div className="flex items-center flex-row gap-3 p-1">
          <Image src="/scope.svg" alt="Scope" height={20} width={20} />
          <p className="text-base">Scope : </p>
          <p className="text-base">{projectDetails.scope_role.join(", ")}</p>
        </div>
        <div className="flex items-center flex-row gap-3 p-1">
          <Image
            src="/projecttype.svg"
            alt="ProjectType"
            height={20}
            width={20}
          />
          <p className="text-base">Project Type : </p>
          <p className="text-base">{projectDetails.project_type}</p>
        </div>
        <div className="flex items-center flex-row gap-3 p-1">
          <Image src="/location.svg" alt="Location" height={20} width={20} />
          <p className="text-base">Location : </p>
          <p className="text-base">{projectDetails.location}</p>
        </div>
        <div className="flex items-center flex-row gap-3 p-1">
          <Image src="/area.svg" alt="Area" height={20} width={20} />
          <p className="text-base">Area : </p>
          <p className="text-base">{projectDetails.area} sq.ft</p>
        </div>
        <div className="flex items-center flex-row gap-3 p-1">
          <Image src="/year.svg" alt="Year" height={20} width={20} />
          <p className="text-base">Year : </p>
          <p className="text-base">{projectDetails.year}</p>
        </div>
      </div>
      <div className="p-2">
        <p className="p-1 text-lg font-semibold">Description</p>
        <p className="p-1 h-auto overflow-scroll text-sm">
          {projectDetails.description}
        </p>
      </div>
      <div className="p-2">
        <p className="p-1 text-lg font-semibold">Tags</p>
        <div className="grid grid-cols-4 gap-2">
          {projectDetails.tags.map((tag) => (
            <div
              className="text-[11px] border-2 border-[#BDBDBD] rounded-lg h-7 w-[4.25rem] text-ellipsis text-center font-semibold"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">
        <p className="p-1 text-lg font-semibold">Note</p>
        <p className="p-1 h-auto overflow-scroll text-sm">
          {projectDetails.note}
        </p>
      </div>
    </div>
  )

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: any) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const renderEditView = () => {
    return (
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="flex justify-center items-center p-4">
          <div className="bg-[#BDBDBD] w-40 h-40 rounded-xl p-2"></div>
        </div>
        <div className="flex flex-row p-2 gap-6 justify-between items-center">
          <label className="whitespace-nowrap">Cover picture</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImageFile(file)
                const reader = new FileReader()
                reader.onloadend = () => {
                  setCoverImage(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <p className="p-1 text-md font-semibold">Project Name</p>
          <Input
            name="projectName"
            onChange={handleInputChange}
            placeholder="Project Name"
            value={projectDetails.projectName}
          />

          <p className="p-1 text-md font-semibold">Description</p>
          <Textarea
            name="description"
            onChange={handleInputChange}
            placeholder="Description"
            value={projectDetails.description}
          />

          <div className="p-1 text-md font-semibold">Design Sector</div>
          <Controller
            control={control}
            name="design_sector"
            render={({ field }) => (
              <MultiSelect
                isCreatable={true}
                options={design_sector}
                value={convertToOptions(field.value)}
                onChange={(selected: Option[]) => {
                  field.onChange(convertToValues(selected))
                  handleSelectChange("design_sector", convertToValues(selected))
                }}
                labelledBy="Design Sector"
                overrideStrings={{ selectSomeItems: "Design Sector" }}
              />
            )}
          />

          <p className="p-1 text-md font-semibold">Typology</p>
          <Controller
            control={control}
            name="typology"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleSelectChange("typology", value)
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Typology" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-auto">
                  {typology.map((group, index) => (
                    <SelectGroup key={index}>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.options?.map((item, itemIndex) => (
                        <SelectItem key={itemIndex} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <p className="p-1 text-md font-semibold">Scope/Role</p>
          <Controller
            control={control}
            name="scope_role"
            render={({ field }) => (
              <MultiSelect
                isCreatable={true}
                options={scope_role}
                value={convertToOptions(field.value)}
                onChange={(selected: Option[]) => {
                  field.onChange(convertToValues(selected))
                  handleSelectChange("scope_role", convertToValues(selected))
                }}
                labelledBy="Scope/Role"
                overrideStrings={{ selectSomeItems: "Scope/Role" }}
              />
            )}
          />

          <p className="p-1 text-md font-semibold">Project Type</p>
          <Controller
            control={control}
            name="project_type"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleSelectChange("project_type", value)
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  {project_type.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <div className="space-y-2">
            <p className="text-md font-semibold">Tags</p>
            <div className="flex flex-wrap gap-2">
              {projectDetails.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1"
                >
                  <span>{tag}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0"
                    onClick={() => {
                      const newTags = [...projectDetails.tags]
                      newTags.splice(index, 1)
                      setProjectDetails({ ...projectDetails, tags: newTags })
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="mr-2"
              />
              <Button
                onClick={() => {
                  if (newTag.trim()) {
                    setProjectDetails({
                      ...projectDetails,
                      tags: [...projectDetails.tags, newTag.trim()],
                    })
                    setNewTag("")
                  }
                }}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Input
            name="location"
            onChange={handleInputChange}
            placeholder="Location"
            value={projectDetails.location}
          />

          <Input
            name="area"
            onChange={handleInputChange}
            placeholder="Area"
            value={projectDetails.area}
          />

          <Input
            name="year"
            onChange={handleInputChange}
            placeholder="Year"
            value={projectDetails.year}
          />

          <Textarea
            name="note"
            onChange={handleInputChange}
            placeholder="Note"
            value={projectDetails.note}
          />
        </div>
      </form>
    )
  }

  return (
    <div className="flex-col justify-center items-center bg-[#FFFFFF] w-96 border-[#BDBDBD] border-2 p-3 h-screen overflow-scroll">
      {renderHeader()}
      {view === "info" && renderInfoView()}
      {view === "details" && renderDetailsView()}
      {view === "edit" && renderEditView()}
      {showSaveConfirmation && <SaveConfirmationDialog />}
    </div>
  )
}

export default ProjectSummary

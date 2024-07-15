import React, { useEffect, useState } from "react"
import { db, storage } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { getDownloadURL, getMetadata, ref } from "firebase/storage"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { InputFeed } from "@/components/ui/input"
import Image, { StaticImageData } from "next/image"

interface FileManagerProps {
  userID: string
}

const FileManager: React.FC<FileManagerProps> = ({ userID }) => {
  const [projects, setProjects] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])
  const [currentProjectID, setCurrentProjectID] = useState<string | null>(null)
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const fetchProjects = async () => {
      const userDoc = doc(db, "users", userID)
      const projectsCollection = collection(userDoc, "projects")
      const querySnapshot = await getDocs(projectsCollection)
      const projectData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProjects(projectData)
    }
    fetchProjects()
  }, [userID])

  const handleProjectClick = async (projectID: string, projectName: string) => {
    try {
      setCurrentProjectID(projectID)
      setCurrentProjectName(projectName)

      const projectDoc = doc(db, "users", userID, "projects", projectID)
      const docRes = await getDoc(projectDoc)

      if (!docRes.exists()) {
        throw new Error("No document exists")
      }

      const assets: string[] = docRes.data()?.assets || []
      const save = await Promise.all(
        assets.map(async (asset, index) => {
          const storeRef = ref(storage, asset)
          const meta = await getMetadata(storeRef)
          const filePath = await getDownloadURL(storeRef)

          let res = ""
          let type = ""
          if (meta.contentType?.split("/")[0] === "image") {
            res = filePath
            type = meta.contentType?.split("/")[0]
          } else if (meta.contentType?.split("/")[1] === "pdf") {
            res = "/pdf.png" 
            type = meta.contentType?.split("/")[1]
          }

          return {
            type: type,
            index: index,
            preview: res,
            filePath: filePath,
            fileName: 
              docRes.data()?.files[index]?.name ||
              asset.split("/").slice(-1).join(),
            fileOriginalName: docRes.data()?.files[index]?.original_name||asset.split("/").slice(-1).join(),
            description: docRes.data()?.files[index]?.description || "",
            content_type: docRes.data()?.files[index]?.content_type || "",
            share: docRes.data()?.files[index]?.share || "",
            notes: docRes.data()?.files[index]?.notes || "",
            phase: docRes.data()?.files[index]?.phase || "",
            skills: docRes.data()?.files[index]?.skills || [],
          }
        }),
      )

      setFiles([...save])
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className="flex flex-col justify-start w-full p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => setCurrentProjectID(null)}>
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentProjectID && currentProjectName && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{currentProjectName}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {!currentProjectID ? (
        <div className="flex flex-row p-4 pt-7 order-2 gap-7 col-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center p-2 cursor-pointer"
              onClick={() =>
                handleProjectClick(project.id, project.projectName)
              }
            >
              <Image
                src="/folder-icon.svg"
                width={100}
                height={100}
                alt="Folder"
              />
              <span className="p-2">{project.projectName}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col p-4 order-2">
          <p>Files for project {currentProjectName}</p>
          <div className="grid grid-cols-8 gap-3 p-2">
            {files.map((file) => (
              <div key={file.id} className="flex flex-col items-center p-2 pt-8">
                {file.type === "image" ? (
                  <img
                    src={file.preview}
                    alt={file.fileName}
                    className="w-24 h-24"
                  />
                ) : (
                  <Image src="/pdf.png" width={96} height={96} alt="PDF" />
                )}
                <span className="flex justify-center items-center p-4 text-xs">{file.fileName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-row items-center p-4 pt-8 gap-2">
        <div className="h-10 w-full border-[#BDBDBD] border-2 flex flex-row items-center p-1 rounded-sm">
          <Label htmlFor="view-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 12.8707 12.8707 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                fill="#ADADAD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6023 14.6023C14.8219 14.3826 15.1781 14.3826 15.3977 14.6023L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L14.6023 15.3977C14.3826 15.1781 14.3826 14.8219 14.6023 14.6023Z"
                fill="#ADADAD"
              />
            </svg>
          </Label>
          <InputFeed
            name="view-search"
            id="view-search"
            className="border-none"
            placeholder="Search Project"
          />
        </div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 16.52V11.98C30 10.57 29.36 10 27.77 10H23.73C22.14 10 21.5 10.57 21.5 11.98V16.51C21.5 17.93 22.14 18.49 23.73 18.49H27.77C29.36 18.5 30 17.93 30 16.52Z"
            fill="#BBBBBB"
            stroke="#BBBBBB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 27.77V23.73C30 22.14 29.36 21.5 27.77 21.5H23.73C22.14 21.5 21.5 22.14 21.5 23.73V27.77C21.5 29.36 22.14 30 23.73 30H27.77C29.36 30 30 29.36 30 27.77Z"
            fill="#BBBBBB"
            stroke="#BBBBBB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 16.52V11.98C18.5 10.57 17.86 10 16.27 10H12.23C10.64 10 10 10.57 10 11.98V16.51C10 17.93 10.64 18.49 12.23 18.49H16.27C17.86 18.5 18.5 17.93 18.5 16.52Z"
            fill="#BBBBBB"
            stroke="#BBBBBB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 27.77V23.73C18.5 22.14 17.86 21.5 16.27 21.5H12.23C10.64 21.5 10 22.14 10 23.73V27.77C10 29.36 10.64 30 12.23 30H16.27C17.86 30 18.5 29.36 18.5 27.77Z"
            fill="#BBBBBB"
            stroke="#BBBBBB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Select>
          <SelectTrigger className="w-20 border-[#BDBDBD] border-2">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-20 border-[#BDBDBD] border-2">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-row w-24 h-10 border-[#BDBDBD] border-2 rounded-md items-center justify-center gap-1">
          <p className="text-sm">Filter</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.04999 1.57501H13.95C14.775 1.57501 15.45 2.25001 15.45 3.07501V4.72501C15.45 5.32501 15.075 6.07501 14.7 6.45001L11.475 9.30001C11.025 9.67501 10.725 10.425 10.725 11.025V14.25C10.725 14.7 10.425 15.3 10.05 15.525L8.99999 16.2C8.02499 16.8 6.67499 16.125 6.67499 14.925V10.95C6.67499 10.425 6.37499 9.75001 6.07499 9.37501L3.22499 6.37501C2.84999 6.00001 2.54999 5.32501 2.54999 4.87501V3.15001C2.54999 2.25001 3.22499 1.57501 4.04999 1.57501Z"
              fill="#BBBBBB"
              stroke="#BBBBBB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.1975 1.57501L4.5 7.50001"
              stroke="#BBBBBB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default FileManager

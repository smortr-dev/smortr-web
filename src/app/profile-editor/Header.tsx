import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useHeader } from "../context/HeaderContext"
import { Dispatch, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import
import {
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react"
import { ref } from "firebase/storage"
// import { useToa/ } from "@/components/ui/toast"

/* eslint-disable @next/next/no-img-element */
export default function Header({
  visibleProjects,
  setVisibleProjects,
  profileData,
}: {
  visibleProjects: any
  setVisibleProjects: Dispatch<any>
  profileData: any
}) {
  const [floatOpen, setFloatOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: floatOpen,
    onOpenChange: setFloatOpen,
  })
  const hover = useHover(context)
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ])
  const router = useRouter()
  const { name } = useHeader()
  const [searchParam, setSearchParam] = useState<string>("")
  function filter(str: string) {
    // console.log(str, )
    // console.log(str, "stringS")
    if (str == "" || !str) {
      setVisibleProjects(profileData?.projects || [])
      return
    }
    let filtered_array: any = []
    // console.log(profileData)
    profileData?.projects.forEach((project: any, index: number) => {
      if (
        project.projectName &&
        project.projectName
          .toLocaleLowerCase()
          .includes(str?.toLocaleLowerCase())
      ) {
        filtered_array.push(project)
      } else if (
        project.description &&
        project.description
          .toLocaleLowerCase()
          .includes(str.toLocaleLowerCase())
      ) {
        filtered_array.push(project)
      }
      // console.log(filtered_array, "filtered_array")
      setVisibleProjects([...filtered_array])
      // project?.projects.forEach((
      //   // if(searchParam.)
      // ))
    })
  }
  // console.log(
  //   name,
  //   name &&
  //     name
  //       .split(" ")
  //       .map((str) => str.charAt(0).toLocaleUpperCase())
  //       .slice(0, 2)
  //       .join(""),
  // )
  return (
    <>
      <div className="flex justify-between absolute top-0 w-full pb-6 pt-4 md:px-16 px-[5%] bg-transparent backdrop-blur-sm">
        <img
          src="/logo.png"
          className="inline-block h-10 w-10 object-cover hover:cursor-pointer "
          alt="feed-logo"
          onClick={() => {
            router.push("/profile-editor")
          }}
        />

        <div className="flex justify-between items-center first:ml-0">
          {/* hover:bg-gray-500 */}
          <div className="flex items-center bg-white rounded-md h-10 py-2">
            <Input
              onKeyDown={(e) => {
                console.log(e.code)
                if (e.code == "Enter") {
                  e.preventDefault()
                }
              }}
              id="search"
              placeholder="Search For Projects..."
              className="inline-block w-[10rem] px-2"
              value={searchParam}
              onChange={(e) => {
                // console.log(e.target.value)
                e.preventDefault()
                setSearchParam(e.target.value)
                filter(e.target.value)
              }}
            />
            <Label className="inline-block" htmlFor="search">
              <img
                src="/search-black.svg"
                className=" ml-2 mr-2 h-6 w-6  hover:cursor-pointer  transition-colors"
                alt="search hover:cursor-pointer"
              />
            </Label>
          </div>
          <img
            ref={refs.setReference}
            src="/notifications.svg"
            className="ml-4 h-6 w-6 hover:cursor-pointer transition-colors"
            alt="search"
            {...getReferenceProps()}
          />
          {floatOpen && (
            <div
              className="bg-white text-gray-400 px-2 py-1 rounded-md border-1 text-[0.8rem]"
              ref={refs.setFloating}
              style={{ ...floatingStyles, top: "10px" }}
              {...getFloatingProps()}
            >
              Feature is coming soon!
            </div>
          )}
          <div
            className="ml-4 hover:cursor-pointer flex items-center justify-center text-white bg-[#6563FF]  rounded-full h-10 w-10"
            onClick={() => {
              // router.refresh()
              router.push("/profile-editor")
            }}
          >
            <span>
              {name &&
                name
                  .split(" ")
                  .map((str) => str.charAt(0).toLocaleUpperCase())
                  .slice(0, 2)
                  .join("")}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

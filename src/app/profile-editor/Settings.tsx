/* eslint-disable @next/next/no-img-element */
"use client"

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Dispatch, useState } from "react"
import { UserAuth } from "../context/AuthContext"

export default function Setting({
  uid,
  index,
  setProfileData,
  profileData,
}: {
  uid: string
  index: number
  profileData: any
  setProfileData: Dispatch<any>
}) {
  const { current } = UserAuth()
  const router = useRouter()
  const [visibility, setVisibility] = useState(false)
  return (
    <>
      <div className="absolute top-0 transition-all h-full w-full group-hover:flex p-8 hidden items-start">
        <div
          className="flex p-1 cursor-pointer justify-center items-center bg-white rounded-full"
          onClick={() => {
            setVisibility((prev) => !prev)
          }}
        >
          <img src="/settings.png" className="h-6 w-6" alt="settings" />
        </div>
        <div
          className={clsx(
            "flex-col mt-2 ml-6 font-[500] text-white tracking-wide transition-all",
            visibility ? "flex visible" : "hidden invisible",
          )}
        >
          <div
            className="inline-block mt-0 cursor-pointer"
            onClick={() => {
              router.push(`/add-project/upload/${uid}`)
            }}
          >
            Edit
          </div>
          <div
            className="inline-block mt-2 cursor-pointer"
            // onClick={() => {
            //   router.push(`/add-project/upload/${uid}`)
            // }}
            onClick={async (e) => {
              e.preventDefault()
              const res = await fetch("/api/delete-project", {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({ projectId: uid, caller: current }),
              })
              const resObj = await res.json()
              if (resObj?.status == "successful") {
                console.log(resObj)
                let obj = profileData
                obj.projects.splice(index, 1)

                setProfileData({ ...obj, projects: [...obj.projects] })
              }
              // .then((res) => res.json())

              // console.log(res)
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  )
}

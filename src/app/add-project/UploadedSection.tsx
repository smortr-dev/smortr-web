/* eslint-disable @next/next/no-img-element */
"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import { UserAuth } from "../context/AuthContext"
// import { error } from "console"

function returnPreview(asset: {
  contentType?: string
  url?: string
  path: string
}) {
  if (asset.contentType?.split("/")[0] == "image") {
    return asset.url
  } else if (asset.contentType?.split("/")[1] == "pdf") {
    return "/pdf.png"
  }
}

export default function UploadedSection({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: {
    contentType?: string
    url?: string
    project: string
    user: string
    path: string
  }[]
  setUploadedFiles: Dispatch<
    SetStateAction<
      {
        contentType?: string | undefined
        url?: string | undefined
        path: string
        user: string
        project: string
      }[]
    >
  >
}) {
  useEffect(() => {
    // console.log(uploadedFiles, "uploaded section")
  }, [uploadedFiles])
  const { current } = UserAuth()
  async function handleDelete(
    index: number,
    asset: {
      contentType?: string | undefined
      url?: string | undefined
      project: string
      user: string
      path: string
    },
  ) {
    console.log(index, asset, uploadedFiles)
    // return
    try {
      const res = await fetch("/api/add-project/delete-asset", {
        method: "POST",
        body: JSON.stringify({
          user: current,
          project: asset.project,
          path: asset.path,
        }),
      })
      const resBody = await res.json()
      if (resBody.status == "successful") {
        setUploadedFiles((prev) => {
          let change = prev
          change?.splice(index, 1)
          console.log(change)
          return [...change]
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return uploadedFiles.length > 0 ? (
    <div className="p-4 bg-white  rounded-[0.88rem] mb-4 ">
      <h3 className="text-[1.25rem] font-[500] py-2">Saved Files</h3>
      <div className="flex items-center border-dashed border rounded-[0.63rem] p-2 max-h-[40vh] overflow-y-auto view-upload">
        {uploadedFiles.map((asset, index) => (
          <div
            key={index}
            className="group hover:bg-gray-200  transition-colors relative w-[8.5rem] h-[8.5rem] p-2 rounded-[0.33rem] flex justify-center items-center"
          >
            <img
              className="max-w-[7rem] max-h-[7rem] text-center"
              alt="asset"
              src={returnPreview(asset)}
            />
            <img
              src="/delete.svg"
              className="w-[1.5rem] border hover:border-gray-400 transition-colors border-1 border-transparent h-[1.5rem] absolute top-0 right-0 hidden group-hover:inline-block cursor-pointer rounded-full p-[0.15rem] bg-white"
              alt="delete"
              onClick={async () => {
                await handleDelete(index, asset)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null
}

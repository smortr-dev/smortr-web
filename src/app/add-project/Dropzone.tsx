/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Form, UseFormReturn } from "react-hook-form"
const thumbsContainer = {
  display: "flex",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

//props
export default function Previews(props: {
  form: UseFormReturn<
    {
      projectName: string
      files: any[]
      description?: string | undefined
      design_sector?: string[] | undefined
      typology?: string | undefined
      scope_role?: string[] | undefined
      project_type?: string | undefined
    },
    any,
    undefined
  >
  save: boolean
  [key: string]: any
}) {
  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFiles: any) => {
      // if (acceptedFiles == "undefined") {
      //   props.setFiles("files", [])
      // }
      console.log(acceptedFiles)
      // console.log(acceptedFiles)
      props.setFiles("files", [
        ...props.form.getValues("files"),
        ...acceptedFiles.map((file: File) => {
          if (file.type == "application/pdf") {
            return Object.assign(file, {
              preview: "/pdf.png",
            })
          }
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
            isUploading: false,
            percentage: 0,
          })
        }),
      ])
      console.log(props.form.getValues("files"), "file upload")
    },
  })

  interface CustomFile extends File {
    preview: string
    isUploading?: boolean
    percentage?: number
  }
  interface CustomBlob extends Blob {
    preview?: string
  }
  interface CustomMediaSource extends MediaSource {
    preview?: string
  }

  // const thumbs = props.getValues("files")?

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      props
        .getValues("files")
        ?.forEach((file: CustomFile) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <>
      <div
        // onClick={() => {}}
        {...getRootProps({
          className:
            "dropzone border-dashed border-[1px] border-[rgba(0,0,0,0.25)] rounded-[0.63rem] p-4 relative mt-4",
        })}
      >
        <input id="dropzone" {...getInputProps()} />
        <div className="flex justify-start upload-container h-[50vh] flex-wrap overscroll-x-none overflow-x-scroll view-dropzone">
          {props.form
            .watch("files", [])
            .map((file: CustomFile, index: number) => (
              <div
                key={file.name}
                className={`relative group inline-block max-w-[7.25rem] max-h-[7.25rem] ml-2 upload-preview`}
              >
                <div
                  className={`${
                    file.isUploading ? "opacity-70" : "opacity-100"
                  }`}
                >
                  {!file.isUploading && (
                    <img
                      src="/delete.svg"
                      className="w-[1.5rem]  border-red-600 hover:bg-gray-200 transition-colors border  h-[1.5rem] absolute top-0 right-0 cursor-pointer rounded-full p-[0.15rem] bg-white"
                      alt="delete"
                      onClick={() => {
                        // console.log("clicked")
                        let files = props.form.getValues("files")
                        // console.log(files, "files")
                        // console.log(index, "index")
                        files.splice(index, 1)
                        // console.log(files, "update")
                        props.form.setValue("files", files)
                      }}
                    />
                  )}
                  <div className="p-2">
                    <img
                      src={file.preview}
                      className="max-h-[6.25rem] max-w-[6.25rem] inline-block"
                      // Revoke data uri after image is loaded
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview!)
                      }}
                      alt="test"
                    />
                  </div>
                  <p className="text-center text-[0.625rem] font-[400] tracking-[0.00625rem] break-all">
                    {file.name}
                  </p>
                </div>
                {file.isUploading && (
                  <>
                    <div className="absolute opacity-100 flex top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%]">
                      <div
                        className={`h-[5px]  rounded-sm bg-[#6563FF]`}
                        style={{
                          width: `${
                            props.form.watch("files")[index].percentage
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="absolute bg-gray-300 rounded-sm inline-block opacity-100 text-xs text-center font-[600] top-[70%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%]">
                      Uploading...
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>

        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <div className="select-none flex flex-col justify-center items-center">
            <img
              className="inline-block h-[3rem] w-[3rem]"
              alt="upload"
              src="/upload.svg"
            />
            <h4 className="mt-2 font-[400] text-[0.8125rem] text-center">
              Select a file or drag and drop here
            </h4>
            <p className="text-[rgba(0,0,0,0.4)] text-[0.75rem] font-[400] mt-2 text-center">
              JPG, PNG or PDF, file size no more than 30MB
            </p>
            {props.form.watch("files", []).length == 0 && !props.save ? (
              <label
                onClick={(e) => {
                  if (props.save) e.preventDefault()
                }}
                htmlFor="dropzone"
                className={`inline-block py-2 mt-3 rounded-[0.38rem] text-white  transition-colors px-4 border border-transparent bg-[#6563FF] cursor-pointer ${
                  props.save
                    ? "opacity-70"
                    : "hover:border-[#6563FF] hover:bg-white hover:text-[#6563FF]"
                }`}
              >
                Select File
              </label>
            ) : null}
          </div>
        </div>
      </div>
    </>
    // </section>
  )
}
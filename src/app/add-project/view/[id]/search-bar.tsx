/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
import { FormItem } from "@/components/ui/form"
import { InputFeed } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormControl, FormLabel } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function SearchBar({
  files,
  visibleFiles,
  setVisibleFiles,
  setCurrentIndex,
}: {
  setCurrentIndex: Dispatch<SetStateAction<number>>
  files: { fileName: string; filePath: string; index: number }[]
  visibleFiles: { fileName: string; filePath: string; index: number }[]
  setVisibleFiles: Dispatch<
    SetStateAction<{ fileName: string; filePath: string; index: number }[]>
  >
}) {
  // const [count, setCount] = useState(0)
  const [key, setKey] = useState("")
  const [sort, setSort] = useState(true)
  function searchFiles(key: string) {
    // if (!key) return
    let value: { fileName: string; filePath: string; index: number }[] = []
    console.log(files, "files")
    files.forEach((file) => {
      if (file.fileName.toLocaleLowerCase().match(key)) {
        value.push(file)
      }
    })
    setCurrentIndex(0)
    setVisibleFiles(value)
  }

  function sortFiles() {
    let value = visibleFiles.sort(function (a, b) {
      // console.log(a, b)
      // console.log(a.filePath)
      // console.log(b.filePath)

      let a_last = a.fileName
      let b_last = b.fileName
      return a_last.localeCompare(b_last)
    })
    if (!sort) value.reverse()
    setVisibleFiles([...value])
  }
  useEffect(() => {
    sortFiles()
  }, [])
  useEffect(() => {
    console.log("called sort", sort)
    sortFiles()
  }, [sort])

  // useEffect(() => {
  //   setCount((prev) => prev + 1)
  // }, [])

  return (
    <div className="flex mx-3 mt-2">
      <div className="flex items-center grow-[18]  border border-[#181818] rounded-[0.38rem]">
        <Label htmlFor="view-search">
          <img
            src="/search-logo-black.png"
            className="inline-block m-1 p-1  h-[2rem] w-[2rem] cursor-pointer"
            alt="feed-search-logo"
          />
        </Label>

        <InputFeed
          name="view-search"
          id="view-search"
          className="border-0 px-1"
          value={key}
          onChange={(e) => {
            console.log(e.target.value)
            setKey(e.target.value)
            // sortFiles()
            searchFiles(e.target.value)
          }}
          placeholder="Describe what you are searching for..."
        />
      </div>
      <Button
        // type="submit"
        onClick={(e) => {
          e.preventDefault()
          setSort((prev) => !prev)
        }}
        className="border grow-[1] border-[#060606] bg-white text-[#060606] ml-3 hover:bg-[#060606] transition-colors hover:text-white"
      >
        Sort
      </Button>
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
import { FormItem } from "@/components/ui/form"
import { InputFeed } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormControl, FormLabel } from "@mui/material"
import faIR from "date-fns/locale/fa-IR/index"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function SearchBar({
  files,
  visibleFiles,
  setVisibleFiles,
  setCurrentIndex,
}: {
  setCurrentIndex: Dispatch<SetStateAction<number>>
  files: {
    fileName: string
    filePath: string
    index: number
    type: string
    preview: string
    description: string
    content_type: string
    share: string
    notes: string
    phase: string
    skills: string[]
  }[]
  visibleFiles: {
    fileName: string
    filePath: string
    index: number
    type: string
    preview: string
    description: string
    content_type: string
    share: string
    notes: string
    phase: string
    skills: string[]
  }[]
  setVisibleFiles: Dispatch<
    SetStateAction<
      {
        fileName: string
        filePath: string
        index: number
        type: string
        preview: string
        description: string
        content_type: string
        share: string
        notes: string
        phase: string
        skills: string[]
      }[]
    >
  >
}) {
  // const [count, setCount] = useState(0)
  const [key, setKey] = useState("")
  const [sort, setSort] = useState(true)
  function searchFiles(key: string) {
    // if (!key) return
    let value: {
      fileName: string
      filePath: string
      index: number
      type: string
      preview: string
      description: string
      content_type: string
      share: string
      notes: string
      phase: string
      skills: string[]
    }[] = []
    let keyLowerCase = key.toLocaleLowerCase()
    files.forEach((file) => {
      if (file.fileName.toLocaleLowerCase().match(keyLowerCase) ||
      file.description.toLocaleLowerCase().match(keyLowerCase) ||
      file.content_type.toLocaleLowerCase().match(keyLowerCase) ||
      file.share.toLocaleLowerCase().match(keyLowerCase) ||
      file.notes.toLocaleLowerCase().match(keyLowerCase) ||
      file.phase.toLocaleLowerCase().match(keyLowerCase) ||
      file.skills.some(skill => skill.toLocaleLowerCase().match(keyLowerCase))) {
        value.push(file)
      }
    })
    setCurrentIndex(0)
    setVisibleFiles(value)
  }

  function sortFiles() {
    let value = visibleFiles.sort(function (a, b) {

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

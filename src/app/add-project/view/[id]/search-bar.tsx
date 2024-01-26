/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
import { FormItem } from "@/components/ui/form"
import { InputFeed } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormControl, FormLabel } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

export default function SearchBar({
  files,
  visibleFiles,
  setVisibleFiles,
}: {
  files: string[]
  visibleFiles: string[]
  setVisibleFiles: Dispatch<SetStateAction<string[]>>
}) {
  function searchFiles(key: string) {
    let value: string[] = []
    files.forEach((file) => {
      if (file.match("key")) {
        value.push(file)
      }
    })
    setVisibleFiles(value)
  }

  function sortFiles(key: boolean) {
    if (key) {
      let value = visibleFiles.toSorted()
      setVisibleFiles(value)
    } else {
      let value = visibleFiles.toSorted().toReversed()
      setVisibleFiles(value)
    }
  }
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
          placeholder="Describe what you are searching for..."
        />
      </div>
      <Button
        type="submit"
        className="border grow-[1] border-[#060606] bg-white text-[#060606] ml-3 hover:bg-[#060606] transition-colors hover:text-white"
      >
        Sort
      </Button>
    </div>
  )
}

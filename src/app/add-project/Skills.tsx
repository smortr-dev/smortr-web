/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
// import { FormLabel } from "@mui/material"
import { FormLabel } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

interface SkillsProps {
  index: number
  form: UseFormReturn<
    {
      files: {
        skills?: string[] | undefined
        privacy: string
        name?: string | undefined
        link?: string | undefined
        description?: string | undefined
        content_type?: string | undefined
        share?: string | undefined
        notes?: string | undefined
        phase?: string | undefined
      }[]
    },
    any,
    undefined
  >
}
export default function Skills({ form, index }: SkillsProps) {
  const [text, setText] = useState<string>("")
  useEffect(() => {
    // setText(form.getValues(`files.${index}.skills`) || [])
  }, [])
  return (
    <div className="mt-4" key={index}>
      <FormLabel className="ml-2">Skills</FormLabel>
      <div className="p-2 gap-x-2 bg-white rounded-[0.88rem]">
        <div className="grid grid-cols-[4fr_1fr]">
          <input
            className="w-full p-2 rounded-[0.88rem] border-2 border-gray-200"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                let prev = form.getValues(`files.${index}.skills`) || []
                form.setValue(`files.${index}.skills`, [...prev, text])
                setText("")
              }
            }}
          />
          <Button
            className="rounded-[0.88rem]"
            onClick={() => {
              if (text.length == 0) return
              let prev = form.getValues(`files.${index}.skills`) || []
              form.setValue(`files.${index}.skills`, [...prev, text])
              setText("")
            }}
          >
            Add
          </Button>
        </div>
        <div className=" w-full flex mt-3 flex-wrap gap-y-2">
        {(() => {
  const skills = form.watch(`files.${index}.skills`);
  return Array.isArray(skills) 
    ? skills.map((skill, nindex) => {
        // ... your existing code
     
            return (
              <div
                className="flex items-center group bg-[#6563FF] overflow-hidden rounded-[0.38rem] first:ml-0 mr-2 px-2 "
                key={nindex}
              >
                <div
                  // key={index}
                  className="relative break-words max-w-full inline-block font-[300]  tracking-wide py-1  text-white text-[0.875rem]"
                >
                  {skill}
                </div>
                <div className="group-hover:w-3 w-0 h-full transition-all"></div>
                <img
                  src="/delete.svg"
                  className="aspect-square rounded-full w-4 h-4 cursor-pointer p-[0.15rem] invisible group-hover:visible transition-all hidden group-hover:inline-block bg-white"
                  alt="delete skill"
                  onClick={() => {
                    let prev = form.getValues(`files.${index}.skills`) || []
                    prev.splice(nindex, 1)
                    form.setValue(`files.${index}.skills`, [...prev])
                  }}
                />
              </div>
            )
          })
          : null; // or some placeholder content
      })()}
        </div>
      </div>
    </div>
  )
}

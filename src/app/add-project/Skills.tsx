"use client"

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
      <div className="p-2 bg-white rounded-[0.88rem]">
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
        <div className="flex mt-3">
          {form.watch(`files.${index}.skills`, [])?.map((skill, index) => {
            return (
              <div
                key={index}
                className="inline-block first:ml-0 px-2 font-[300] mr-2 tracking-wide py-1 rounded-[0.38rem] bg-[#6563FF] text-white text-[0.875rem]"
              >
                {skill}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"
import clsx from "clsx"
import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react"
import { UseFormRegister, UseFormReturn } from "react-hook-form"
// import { formSchema } from "./view/[id]/page"
// interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {

// }
// { ; }
interface ToggleProps {
  //   name: string
  //   type: string
  currentIndex: number
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

export default function Toggle({ form, currentIndex }: ToggleProps) {
  const [privacy, setPrivacy] = useState("private")
  useEffect(() => {
    setPrivacy(form.getValues(`files.${currentIndex}.privacy`))
    // console.log(form.getValues(`files.${currentIndex}.privacy`))
  }, [])
  return (
    <>
      <div className="flex">
        <div
          className={clsx(
            "inline-block text-[0.9375rem] font-[500]",
            privacy == "private" ? "text-black" : "text-[#717171]",
            "mr-2",
          )}
        >
          Private
        </div>
        <div
          className={clsx(
            "h-[1.5rem] w-[3rem] transition-transform border-black rounded-[1.5rem] border-2 flex p-[0.15rem] bg-white",
            privacy == "private" ? "justify-begin" : "justify-end",
          )}
          onClick={() => {
            if (form.getValues(`files.${currentIndex}.privacy`) == "private") {
              form.setValue(`files.${currentIndex}.privacy`, "public")
            } else {
              form.setValue(`files.${currentIndex}.privacy`, "private")
            }
            setPrivacy(form.getValues(`files.${currentIndex}.privacy`))
            // console.log(form.getValues("privacy"))
          }}
        >
          <div className="inline-block h-[1rem] border-black w-[1rem] rounded-full bg-[#6563FF] border-2"></div>
        </div>
        <div
          className={clsx(
            "inline-block text-[0.9375rem] font-[500]",
            privacy == "public" ? "text-black" : "text-[#717171]",
            "ml-2",
          )}
        >
          Public
        </div>
      </div>
    </>
  )
}

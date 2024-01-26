"use client"
import { useForm } from "react-hook-form"
import Section from "../../Section"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname } from "next/navigation"
import { MultiLineInputProject } from "@/components/ui/multilineInput"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputProject } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function Edit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const answerSchema = z.object({
    answer: z.string().min(1),
  })
  const form1 = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
  })
  const summarySchema = z.object({
    summary: z.string().optional(),
  })
  const form2 = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
  })

  return (
    <>
      <div className="py-8">
        <div className="flex justify-between">
          <h3 className="inline-block text-[1.375rem] font-[500] text-[#151515] tracking-[0.01375rem] mb-6">
            New Project
          </h3>
          <div></div>
        </div>
        <Section active="edit" />
        <Form {...form1}>
          <form>
            <div className="mt-8 rounded-[0.88rem] px-8 bg-white py-4 ">
              <div className="flex justify-between items-center text-[0.875rem] font-[400] text-[##060606]">
                <div className="inline-block">
                  What was the initial inspiration behind the Thamizh Futurism
                  movement and this gallery show?
                </div>
                <div className="flex ">
                  <Button
                    type="submit"
                    className="border border-[#6563FF] bg-[#EAEAEA] px-8 text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
              <FormField
                control={form1.control}
                name={`answer`}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FormItem className="text-left mt-2 w-[100%]">
                        <FormControl>
                          <MultiLineInputProject
                            placeholder={`Write your answers here..`}
                            maxLength={200}
                            rows={6}
                            {...field}
                            className={` ${
                              fieldState.error
                                ? "border-[#CC3057]"
                                : "  border-[#848484]"
                            }`}
                            required
                          />
                          {/* <span>{}</span> */}
                        </FormControl>
                        <FormMessage className="text-xs text-[#CC3057]" />
                      </FormItem>
                    </>
                  )
                }}
              />
            </div>
          </form>
        </Form>
      </div>
      <Form {...form2}>
        <form>
          <div className="px-8 pt-6 pb-4 bg-white rounded-[0.88rem]">
            <div className="flex justify-between items-center">
              <span className="inline-block px-3 font-[400] text-[0.875rem] text-[#060606]">
                Summary of narrative
              </span>
              <Button
                type="submit"
                className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
              >
                Regenerate
              </Button>
            </div>
            <FormField
              control={form1.control}
              name={`answer`}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <FormItem className="text-left  mt-4 w-[100%]">
                      <FormControl>
                        <MultiLineInputProject
                          placeholder={`Write your answers here..`}
                          maxLength={3000}
                          rows={20}
                          {...field}
                          className={` ${
                            fieldState.error
                              ? "border-[#CC3057]"
                              : "  border-[#848484]"
                          }`}
                          required
                        />
                        {/* <span>{}</span> */}
                      </FormControl>
                      <FormMessage className="text-xs text-[#CC3057]" />
                    </FormItem>
                  </>
                )
              }}
            />
          </div>
        </form>
      </Form>
      <div className="flex justify-end pt-4">
        <div className="flex ">
          <Button
            onClick={() => {
              router.push(`/add-project/upload/${params.id}`)
            }}
            type="submit"
            className="border border-[#6563FF] bg-[#EAEAEA] px-8 text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              router.push(`/add-project/view/${params.id}`)
            }}
            type="submit"
            className="border ml-2 border-[#6563FF] px-8 hover:bg-white hover:text-[#6563FF] bg-[#6563FF] transition-colors text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}

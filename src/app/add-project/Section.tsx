import { cva } from "class-variance-authority"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
// import { Button } from "react-day-picker"
import { Button } from "@/components/ui/button"

const link = cva(
  [
    "px-12 py-4 text-[#6563FF] relative text-center text-[0.875rem] tracking-wide transition-colors",
  ],
  {
    variants: {
      intent: {
        active: "font-[700] bg-white hover:bg-gray-300 cursor-pointer",
        passive: "font-[400]",
      },
      navigate: {
        clickable: "bg-white hover:bg-gray-300 cursor-pointer ",
        blocked: "bg-gray-100 cursor-not-allowed",
      },
    },
  },
)

export default function Section({
  active,
  move,
  load,
}: {
  active: string
  move?: boolean
  load?: boolean
}) {
  const router = useRouter()
  const path = usePathname()
  const id = useMemo(() => path.split("/").splice(-1).join(""), [path])
  return (
    <>
      <div className="flex justify-center relative">
        <div className="inline-block absolute left-0 translate-y-[-50%] top-[50%] ">
          {/* rounded-[0.88rem] bg-gray-500 border-black */}
          <Button
            className="border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault()
              router.push("/profile-editor")
            }}
          >
            <span>Close Project Editor</span>
          </Button>
        </div>
        <div className="flex justify-center rounded-[0.88rem] bg-white overflow-clip drop-shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]">
          <div
            onClick={() => {
              if (active != "upload" && !load && move) {
                // console.log(id, "clicked")

                router.push(`/add-project/upload/${id}`)
              }
            }}
            className={clsx(
              active == "upload"
                ? link({ intent: "active" })
                : !load && move
                  ? link({ intent: "passive", navigate: "clickable" })
                  : link({ intent: "passive", navigate: "blocked" }),
            )}
          >
            <span className="relative">
              Upload
              <span
                className={clsx(
                  active == "upload" &&
                    "absolute h-[3px] bottom-[-7px] right-0 w-full bg-[#6563FF]",
                )}
              ></span>
            </span>
          </div>
          <div
            onClick={() => {
              if (active != "edit" && !load && move) {
                // console.log(id, "clicked")

                router.push(`/add-project/edit/${id}`)
              }
            }}
            className={clsx(
              active == "edit"
                ? link({ intent: "active" })
                : !load && move
                  ? link({ intent: "passive", navigate: "clickable" })
                  : link({ intent: "passive", navigate: "blocked" }),
            )}
          >
            <span className="relative">
              Edit
              <span
                className={clsx(
                  active == "edit" &&
                    "absolute h-[3px] bottom-[-7px] right-0 w-full bg-[#6563FF]",
                )}
              ></span>
            </span>
          </div>
          <div
            onClick={() => {
              if (active != "view" && !load && move) {
                // router.push()
                // console.log(id, "clicked")
                router.push(`/add-project/view/${id}`)
              }
            }}
            className={clsx(
              active == "view"
                ? link({ intent: "active" })
                : !load && move
                  ? link({ intent: "passive", navigate: "clickable" })
                  : link({ intent: "passive", navigate: "blocked" }),
            )}
          >
            <span className="relative">
              View
              <span
                className={clsx(
                  active == "view" &&
                    "absolute h-[3px] bottom-[-7px] right-0 w-full bg-[#6563FF]",
                )}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

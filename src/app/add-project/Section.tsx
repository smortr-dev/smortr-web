import { cva } from "class-variance-authority"
import clsx from "clsx"
const link = cva(
  ["px-12 py-4 relative text-center text-[0.875rem] tracking-wide bg-white"],
  {
    variants: {
      intent: {
        active: "text-[#6563FF] font-[700]",
        passive: "text-black font-[400]",
      },
    },
  },
)

export default function Section({ active }: { active: string }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center rounded-[0.88rem] bg-white overflow-clip drop-shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]">
          <div
            className={clsx(
              active == "upload"
                ? link({ intent: "active" })
                : link({ intent: "passive" }),
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
            className={clsx(
              active == "edit"
                ? link({ intent: "active" })
                : link({ intent: "passive" }),
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
            className={clsx(
              active == "view"
                ? link({ intent: "active" })
                : link({ intent: "passive" }),
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

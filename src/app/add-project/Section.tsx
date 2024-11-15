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
      <div className="inline-block relative shadow-md rounded-[0.88rem]">
        <div className="flex justify-center rounded-[0.88rem] bg-white overflow-clip drop-shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]">
          <div
            onClick={() => {
              if (active != "upload" && load && move) {
                // console.log(id, "clicked")

                router.push(`/add-project/upload/${id}`)
              }
            }}
            className={clsx(
              active == "upload"
                ? link({ intent: "active" })
                : load && move
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
              if (active != "edit" && load && move) {
                // console.log(id, "clicked")

                router.push(`/add-project/edit/${id}`)
              }
            }}
            className={clsx(
              active == "edit"
                ? link({ intent: "active" })
                : load && move
                  ? link({ intent: "passive", navigate: "clickable" })
                  : link({ intent: "passive", navigate: "blocked" }),
            )}
          >
            {/* <span className="relative">
              Edit
              <span
                className={clsx(
                  active == "edit" &&
                    "absolute h-[3px] bottom-[-7px] right-0 w-full bg-[#6563FF]",
                )}
              ></span>
            </span> */}
          </div>
          <div
            onClick={() => {
              if (active != "view" && load && move) {
                // router.push()
                // console.log(id, "clicked")
                router.push(`/add-project/view/${id}`)
              }
            }}
            className={clsx(
              active == "view"
                ? link({ intent: "active" })
                : load && move
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

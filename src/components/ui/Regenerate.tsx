import {
  useFloating,
  offset,
  arrow,
  useHover,
  useFocus,
  useInteractions,
  FloatingArrow,
} from "@floating-ui/react"
import { useRef, useState } from "react"
import { Button } from "./button"

export default function Regenerate({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<any>
}) {
  const [isOpen, setOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: "left",
    middleware: [
      offset(10),
      //   autoPlacement({}),
      arrow({
        element: arrowRef,
      }),
    ],
  })
  const hover = useHover(context)
  const focus = useFocus(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ])
  return (
    <>
      <Button
        ref={refs.setReference}
        // disabled={submitStatus}
        // type="submit"
        type="submit"
        // onClick={handler}
        // className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
        className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
      >
        Regenerate
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="inline p-1 px-2 rounded-sm text-sm bg-black text-white border-black border"
            // className="border border-[#6563FF] bg-[#EAEAEA] text-[#6563FF] hover:bg-[#6563FF] transition-colors hover:text-white"
          >
            <span>Feature Is Coming Soon!</span>
            <FloatingArrow ref={arrowRef} context={context} fill="black" />
          </div>
        )}
      </Button>
    </>
  )
}

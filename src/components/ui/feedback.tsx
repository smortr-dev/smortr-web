/* eslint-disable @next/next/no-img-element */
import {
  FloatingArrow,
  Placement,
  arrow,
  autoPlacement,
  offset,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react"
import Link from "next/link"
import { useRef, useState } from "react"

export default function Feedback({ placement }: { placement?: Placement }) {
  const [isOpen, setOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: placement ? placement : "left",
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
    <Link href={"https://forms.gle/AVa3vPzdqFPtadRQA"} target="blank">
      <div
        className="flex justify-center items-center p-1 w-8 bg-blue-700 rounded-full"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <img className="inline-block w-7" src="/pencil.png" alt="feedback" />
      </div>
      {isOpen && (
        <div
          className="inline p-1 px-2 rounded-sm text-sm bg-blue-700 text-white border-blue-700 border"
          style={{ ...floatingStyles, flexWrap: "nowrap" }}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="rgb(29 78 216)"
          />
          <span className="whitespace-nowrap">Give Feedback!</span>
        </div>
      )}
    </Link>
  )
}

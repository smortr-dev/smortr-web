/* eslint-disable @next/next/no-img-element */
import {
  FloatingArrow,
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

export default function Bugs() {
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
    <Link target="blank" href={"https://forms.gle/Q1VXeZ6Huk5Ch7Rm7"}>
      <div
        className="flex justify-center items-center p-1 w-8 bg-red-600 rounded-full"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <img className="inline-block w-7" src="/alert.png" alt="bugs" />
      </div>
      {isOpen && (
        <div
          className="inline p-1 px-2 rounded-sm text-sm bg-red-600 text-white border-red-600 border"
          style={{ ...floatingStyles, flexWrap: "nowrap" }}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="rgb(220 38 38)"
          />
          <span className="whitespace-nowrap">Report Issues</span>
        </div>
      )}
    </Link>
  )
}

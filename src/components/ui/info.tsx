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

export default function Info({
  placement,
  text,
}: {
  placement?: Placement
  text?: string
}) {
  const [isOpen, setOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: placement ? placement : "bottom",
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
      <div
        className="flex justify-center items-center p-1 w-8 bg-gray-200 rounded-full"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <img className="inline-block w-7" src="/info.png" alt="info" />
      </div>
      {isOpen && (
        <div
          className="max-w-[20vw] z-40 bg-black inline p-1 px-2 rounded-sm text-sm  text-white border-gray-600 border"
          style={{ ...floatingStyles, flexWrap: "nowrap" }}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          <FloatingArrow ref={arrowRef} context={context} fill="gray" />
          <span className="">{text ? text : ""}</span>
        </div>
      )}
    </>
  )
}

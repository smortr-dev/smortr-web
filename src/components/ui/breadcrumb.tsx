import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className,
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <div className="flex flex-row-reverse gap-2 items-center">
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5 text-lg font-bold", className)}
      {...props}
    />
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_343_2611)">
        <path
          d="M11 1.17144V0.874145C11 0.391446 10.6036 0 10.1149 0H0.885133C0.396367 0 0 0.391446 0 0.874145V16.6374H22V2.04559C22 1.56289 21.6036 1.17144 21.1149 1.17144H11Z"
          fill="#F9DF5C"
        />
        <path
          d="M10.6861 4.22732L10.3594 5.12138H0.885133C0.396367 5.12138 0 5.51283 0 5.99553V17.1255C0 17.6082 0.396367 17.9996 0.885133 17.9996H21.1149C21.6036 17.9996 22 17.6082 22 17.1255V4.52389C22 4.0412 21.6036 3.64975 21.1149 3.64975H11.5188C11.1459 3.64975 10.8126 3.88078 10.6861 4.22732Z"
          fill="#F3CC30"
        />
        <path
          d="M22 17.1259V9.86945C15.8891 15.7393 5.2899 17.3102 0.246033 17.7295C0.406999 17.8957 0.633599 18 0.885133 18H21.1149C21.6036 18 22 17.6086 22 17.1259Z"
          fill="#EDBD31"
        />
        <path
          d="M8.93383 5.82535H1.4531C1.0582 5.82535 0.738464 6.14147 0.738464 6.53111V8.09472C1.99686 7.24339 4.83633 6.17081 8.9342 5.82535H8.93383Z"
          fill="#F6D738"
        />
      </g>
      <defs>
        <clipPath id="clip0_343_2611">
          <rect width="22" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

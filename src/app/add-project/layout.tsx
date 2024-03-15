"use client"
import "../globals.css"

import FeedbackBugFloat from "@/components/ui/feedback-bugs-float"
import Header from "./Header"
import { Toaster } from "@/components/ui/toaster"
// import
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-[100vh]">
        <Header />
        <div className="bg-[#ECECEC] px-32 pb-20">{children}</div>
        <Toaster />
        <FeedbackBugFloat />
      </div>
    </>
  )
}

"use client"
import "../globals.css"

import FeedbackBugFloat from "@/components/ui/feedback-bugs-float"
import Header from "./Header"
import { Toaster } from "@/components/ui/toaster"
// import
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative min-h-[100vh] max-w-[100vw]">
        <Header />
        {children}
        <Toaster />
        <FeedbackBugFloat />
      </div>
    </>
  )
}

"use client"

import Header from "./Header"
import { Toaster } from "@/components/ui/toaster"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-[100vh]">
        <Header />
        <div className="bg-[#ECECEC] px-32 pb-20">{children}</div>
        <Toaster />
      </div>
    </>
  )
}

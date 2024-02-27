// "use client"
import "../globals.css"

import Script from "next/script"

import type { Metadata, ResolvingMetadata } from "next"
import { UserAuth } from "../context/AuthContext"
import { storage } from "@/lib/firebase"
import { getDownloadURL, ref } from "firebase/storage"
// import { profile } from "console";
import { Toaster } from "@/components/ui/toaster"
type Props = {
  params: { name: string }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body>
      {children}
      <Toaster />
    </body>
  )
}

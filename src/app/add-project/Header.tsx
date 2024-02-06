"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useHeader } from "../context/HeaderContext"
import { useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { UserAuth } from "../context/AuthContext"
/* eslint-disable @next/next/no-img-element */
export default function Header() {
  const router = useRouter()
  const { name, setName } = useHeader()
  const { current } = UserAuth()
  useEffect(() => {
    async function getName() {
      const userRef = doc(db, "users", current!)
      const user = await getDoc(userRef)
      // console.log("done")
      if (user.exists()) {
        // console.log(user.data().name)
        setName(user.data().name)
      }
    }
    getName()
  }, [])
  return (
    <>
      <div className="flex justify-between w-full pb-4 pt-4 md:px-16 px-[5%] bg-[#1C1C1C]">
        <img
          src="/logo-white.svg"
          className="inline-block h-[1.6rem] w-[1.6rem] object-cover hover:cursor-pointer "
          alt="feed-logo"
          onClick={() => {
            router.push("/")
          }}
        />

        <div className="flex justify-between items-center first:ml-0">
          {/* hover:bg-gray-500 */}
          <img
            src="/search.svg"
            className="ml-0 h-6 w-6  hover:cursor-pointer  transition-colors"
            alt="search hover:cursor-pointer"
          />
          <img
            src="/notifications.svg"
            className="ml-4 h-6 w-6 hover:cursor-pointer transition-colors"
            alt="search"
          />
          <Link href={"/profile-editor"}>
            <div className="ml-4 flex items-center justify-center text-white bg-[#6563FF]  rounded-full h-[2rem] w-[2rem]">
              <span className="text-[0.8rem]">
                {name &&
                  name
                    .split(" ")
                    .map((str) => str.charAt(0).toLocaleUpperCase())
                    .slice(0, 2)
                    .join("")}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

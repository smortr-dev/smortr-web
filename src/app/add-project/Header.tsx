"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useHeader } from "../context/HeaderContext"
/* eslint-disable @next/next/no-img-element */
export default function Header() {
  const router = useRouter()
  const { name } = useHeader()
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
          <div className="ml-4 flex items-center justify-center text-white bg-[#6563FF]  rounded-full h-[2rem] w-[2rem]">
            <span className="text-[0.8rem]">
              {name &&
                name
                  .split(" ")
                  .map((str) => str.charAt(0).toLocaleUpperCase())
                  .slice(0, 2)
                  .join()}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

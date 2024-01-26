import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
/* eslint-disable @next/next/no-img-element */
export default function Header() {
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between absolute top-0 w-full pb-6 pt-4 md:px-16 px-[5%] bg-transparent backdrop-blur-sm">
        <img
          src="/logo.png"
          className="inline-block h-10 w-10 object-cover hover:cursor-pointer "
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
          <div className="ml-4 flex items-center justify-center text-white bg-[#6563FF]  rounded-full h-10 w-10">
            <span>JW</span>
          </div>
        </div>
      </div>
    </>
  )
}

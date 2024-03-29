/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header(props: { setOpen: any }) {
  const router = useRouter()
  return (
    <>
      <nav className="flex justify-between pt-[2rem] md:px-[5rem] px-[1.25rem] bg-[#fafafa]">
        <div className="flex items-center">
          <div className="inline-block h-10 w-10">
            <img
              src="/logo.png"
              className="inline-block object-cover hover:cursor-pointer"
              alt="feed-logo"
              onClick={() => {
                router.push("/")
              }}
            />
          </div>
          <Link href={"/"} className="inline-block md:ml-10 ml-3">
            <div className="inline-block md:text-[1.15rem] text-[1rem] text-[#848484]  hover:text-black hover:underline transition-all">
              About
            </div>
          </Link>
          <Link href={"/feed"} className="inline-block md:ml-10 ml-3">
            <div className="inline-block md:text-[1.15rem] text-[1rem] text-[#848484]  hover:text-black hover:underline transition-all">
              Feed
            </div>
          </Link>
        </div>
        <div className="flex float-right z-[5]">
          <Button
            className="relative hidden md:inline-block  px-2 py-1 text-[1rem] mr-2 bg-white text-black border-2 border-black rounded-[6px] hover:text-white hover:bg-black hover:border-white"
            onClick={() => {
              // props.setOpen((prev: boolean) => !prev)
              router.push("/login")
            }}
          >
            Login
          </Button>
          <Button
            className="relative text-[1rem] bg-black text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
            onClick={() => {
              props.setOpen((prev: boolean) => !prev)
            }}
          >
            Join waitlist!
          </Button>
        </div>
      </nav>
    </>
  )
}

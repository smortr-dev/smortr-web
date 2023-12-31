import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between pb-6 pt-4">
        <div className="flex items-center">
          <div className="inline-block h-10 w-10">
            <img
              src="/logo.png"
              className="inline-block object-cover hover:cursor-pointer"
              alt="feed-logo"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <Link href={"/"} className="inline-block md:ml-10 ml-3">
            <div className="inline-block text-[1.15rem] text-[#848484]  hover:text-black hover:underline transition-all">
              About
            </div>
          </Link>
          <Link href={"/feed"} className="inline-block md:ml-10 ml-3">
            <div className="inline-block text-[1.15rem] text-[#DD5D33]  hover:text-black hover:underline transition-all">
              Feed
            </div>
          </Link>
        </div>

        <Button
          className="relative z-[5] inline-block  bg-black float-right text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
          onClick={() => {
            router.push("/");
          }}
        >
          Join waitlist!
        </Button>
      </div>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Header(props: { setOpen: any }) {
  return (
    <>
      <nav className="py-[2.25rem] md:px-[5rem] px-[1.25rem] bg-[#fafafa]">
        <img
          src="/testlogo.png"
          className="float-left inline-block w-[2.5rem] h-[2.5rem] "
          alt="logo"
        />

        {/* <Button className="md:inline-block hidden bg-black float-right text-white h-[2.5rem] border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black " onClick={()=>{
            props.setOpen((prev:boolean)=>!prev)
          }}>
            Join waitlist!
          </Button> */}
      </nav>
    </>
  );
}

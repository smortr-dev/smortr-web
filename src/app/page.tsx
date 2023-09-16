/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import Header from "./Header";
// import { Swiper } from "swiper/types";
import Swiper from "./Swiper";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <Script
        src="//js-eu1.hsforms.net/forms/embed/v2.js"
        type="text/javascript"
      />
      {/* <Script id="show-banner">
        {`hbspt.forms.create({
            region: "eu1",
            portalId: "26500126",
            formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c"
          });`}
      </Script> */}
      <Header />
      <div className="mt-8 md:mb-20 mb-0">
        <div className="relative md:ml-[5rem] ml-0 lg:h-[87.5vh] md:h-[75vw] bg-[#7696F2] md:rounded-l-[18px] rounded-tl-[18px] md:px-[2.5rem] md:py-0 p-10 pb-32 border-[3px] border-r-0 border-[rgba(0,0,0,0.30)] border-b-0 md:border-b-[3px]">
          <div className="md:mt-16 lg:w-[25vw] md:w-[40vw] md:float-left">
            <h1 className="font-[800] lg:text-[3rem] leading-tight text-[2.4rem] tracking-tighter text-[#333]">
              We’re Building Smortr
            </h1>
            <p className="mt-4 text-[1.25rem] leading-[1.75rem] text-[#333] tracking-tight">
              The global social network for people in the building design
              industry to showcase, connect and collaborate.
            </p>
            <Link
              href="https://share-eu1.hsforms.com/1b7cmFaXvReORge98WazfXAfrzmm"
              target="_blank"
            >
              <Button
                className="relative z-[5] lg:mt-8 md:mt-4 mt-8 block w-[100%]  bg-black float-right text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
                onClick={() => {
                  console.log("clicked");
                  // router.push(
                  //   "https://share-eu1.hsforms.com/1b7cmFaXvReORge98WazfXAfrzmm"
                  // );
                }}
              >
                Sign up now!
              </Button>
            </Link>
          </div>
          <img
            src="logo_big.png"
            className="md:inline-block absolute hidden lg:bottom-[-4rem] bottom-[-2rem] right-0 lg:h-[40vw] md:h-[50vw]"
            alt="logo-large"
          />
          <div className="md:inline-block overflow-clip hidden aspect-video lg:w-[50vw] md:w-[60vw] h-auto bg-red-400 absolute bottom-0 right-0 rounded-l-[18px]">
            <iframe
              src="https://player.vimeo.com/video/862315644?h=c43452d2aa&autoplay=1&loop=1&title=0&byline=0&portrait=0"
              // style="position:absolute;top:0;left:0;width:100%;height:100%;"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
            <Script src="https://player.vimeo.com/api/player.js" />
          </div>
        </div>
      </div>
      <div className="relative md:hidden block aspect-video w-full h-auto bg-red-300 ">
        <iframe
          src="https://player.vimeo.com/video/862315644?h=c43452d2aa&autoplay=1&loop=1&title=0&byline=0&portrait=0"
          // style="position:absolute;top:0;left:0;width:100%;height:100%;"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
        <Script src="https://player.vimeo.com/api/player.js" />
      </div>
      <div className=" bg-[#1B1B2D] py-16 overflow-hidden">
        <p className="px-8 text-white bg-transparent text-center lg:mb-8 mb-4 md:text-[1.25rem] text-[1rem]">
          Creators are powerful.
        </p>
        <p className="px-8 text-white bg-transparent text-center md:mb-24 mb-12 md:text-[1.25rem] text-[1rem]">
          Showcase your work where it matters.
        </p>
        <Swiper />
      </div>
      <div className="p-16 pb-20">
        <h2 className="text-center text-[#1B1B2D] lg:text-[3rem] text-[2.4rem] font-[800] tracking-tighter">
          Foundations
        </h2>
        <p className="text-center text-[#1B1B2D] text-[1.25rem]  tracking-tight">
          Questions that lead to building Smortr
        </p>
      </div>
      <div className="mt-8 lg:px-16 px-8">
        <h4 className="text-[1.125rem] font-[700] text-[#479F70]">
          Time Taken
        </h4>
        <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#479F70] mb-8">
          “How long does it take to effectively showcase work and skill sets?”
        </h1>
      </div>
      <div className="md:pr-20 mr-0">
        <img
          src="/why.svg"
          className="rounded-r-[18px] border-[3px] border-l-0 border-[rgba(0,0,0,0.3)] w-full h-auto"
          alt="why"
        />
      </div>

      <div className="mt-24 lg:px-16 px-8">
        <h4 className="text-[1.125rem] font-[700] text-[#1769FF]">
          Connections in 3 Clicks
        </h4>
        <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#1769FF] mb-8">
          “Can we foster meaningful connections, potentially leading to
          collaborations in 3 clicks or less?”
        </h1>
      </div>
      <div className="md:pr-20 mr-0">
        <img
          src="/connect.svg"
          className="rounded-r-[18px]  w-full h-auto"
          alt="why"
        />
      </div>
      <div className="mt-24 lg:px-16 px-8">
        <h4 className="text-[1.125rem] font-[700] text-[#CC3057]">
          Modular but Versatile
        </h4>
        <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#CC3057] mb-4">
          “How many types of building designers can we help showcase their work
          for different contexts?”
        </h1>
      </div>
      <div className="md:mr-20 mr-0">
        <img
          src="/comment.svg"
          className="rounded-r-[18px] w-full h-auto"
          alt="why"
        />
      </div>
      <div className="lg:p-64 p-16">
        <h1 className=" leading-tight lg:text-[3rem] text-[2.4rem] tracking-tight text-center font-[800]">
          Be a part of the next big thing for buildings
        </h1>
        <div className="flex justify-center mt-8">
          <Link
            href="https://share-eu1.hsforms.com/1b7cmFaXvReORge98WazfXAfrzmm"
            target="_blank"
          >
            <Button className="relative md:w-[40vw] w-[70vw] z-[5] lg:mt-8 md:mt-4 mt-8 block  bg-black float-right text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

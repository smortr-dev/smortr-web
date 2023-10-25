/* eslint-disable @next/next/no-img-element */
"use client";
import { HubspotProvider } from "next-hubspot";
import { Button } from "@/components/ui/button";
import Header from "./Header";
// import { Swiper } from "swiper/types";
import Swiper from "./Swiper";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form from "./Form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-landing";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <>
      <HubspotProvider>
        <Header setOpen={setOpen} />
        {/* <Script
        src="https://js-eu1.hsforms.net/forms/embed/v2.js"
        type="text/javascript"
        onLoad={() => {
          console.log("load");
        }}
        onReady={() => {
          console.log("ready");
          hbspt.forms.create({
            region: "eu1",
            portalId: "26500126",
            formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c",
          });
        }}
      /> */}
        {/* <Script
        id="show-banner"
        onLoad={() => {
          console.log("load");
        }}
      >
        {`(async () => {
          const script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.src = "https://js.hsforms.net/forms/embed/v2.js";

          script.addEventListener("load", () => {
            hbspt.forms.create({
              region: "eu1",
              portalId: "26500126",
              formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c",
            });
          });

          document.head.append(script);
        })();`}
      </Script> */}
        {/* <Script
        id="show-banner"
        onLoad={() => {
          console.log("working");
        }}
      >
        {`hbspt.forms.create({
            region: "eu1",
            portalId: "26500126",
            formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c"
          });`}
      </Script> */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <Form
              setOpen={setOpen}
              open={open}
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
            />
          </DialogContent>
        </Dialog>
        <div className="mt-8 md:mb-20 mb-0">
          <div className="relative md:ml-[5rem] ml-0 lg:h-[87.5vh] md:h-[75vw] bg-[#7696F2] md:rounded-l-[18px] rounded-tl-[18px] md:px-[2.5rem] md:py-0 p-10 2k:pt-12 pb-32 border-[3px] border-r-0 border-[rgba(0,0,0,0.30)] border-b-0 md:border-b-[3px]">
            <div className="tab:mt-8 lg:w-[30vw] md:w-[40vw]  md:float-left">
              <h1 className="font-[800] 2k:text-[3rem] uhd:text-[3rem] tab:text-[2.1rem] text-[2.4rem] tracking-tighter text-[#333] 2k:leading-[3.4rem] uhd:leading-[3.2rem] tab:leading-[2.35rem] leading-[2.5rem]">
                Building Connections in One Window
              </h1>
              <p className="uhd:mt-4 mt-2 uhd:text-[1.25rem] tab:text-[1rem] text-[1.25rem] 2k:leading-[1.85rem] uhd:leading-[1.75rem] tab:leading-[1.5rem] leading-[1.6rem] text-[#333] tracking-tight">
                Say goodbye to managing multiple platforms. We’re building
                Smortr, the global social network for people in the building
                design industry to showcase, connect, and collaborate.
              </p>
              <Button
                className="relative z-[5] 2k:mt-6 lg:mt-4 md:mt-4 mt-8 block w-[100%]  bg-black float-right text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
                onClick={() => {
                  setOpen((prev: boolean) => !prev);
                }}
              >
                Join waitlist!
              </Button>
            </div>
            <img
              src="logo_big.png"
              className="md:inline-block absolute hidden lg:bottom-[-4rem] bottom-[-2rem] right-0 lg:h-[40vw] md:h-[50vw]"
              alt="logo-large"
            />
            <div className="md:inline-block overflow-clip hidden aspect-video lg:w-[50vw] md:w-[60vw] h-auto bg-red-400 absolute bottom-0 right-0 rounded-l-[18px]">
              <Script src="https://player.vimeo.com/api/player.js" />
              {/* <iframe
              src="https://player.vimeo.com/video/862315644?h=c43452d2aa&autoplay=1&loop=1&title=0&byline=0&portrait=0"
              // style="position:absolute;top:0;left:0;width:100%;height:100%;"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe> */}
              <iframe
                src="https://player.vimeo.com/video/862315644?h=c43452d2aa&autoplay=1&loop=1&title=0&byline=0&portrait=0"
                // style="position:absolute;top:0;left:0;width:100%;height:100%;"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
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

        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <Form
              setOpen={setOpen}
              open={open}
              setFormSubmitted={setFormSubmitted}
              formSubmitted={formSubmitted}
            />
          </DialogContent>
        </Dialog> */}

        <div className=" bg-[#1B1B2D] py-16  w-full">
          <p className="px-8  text-white bg-transparent text-center  mb-4 md:text-[1.25rem] text-[1rem]">
            Creators are powerful.
          </p>
          <p className="px-8 text-white bg-transparent text-center md:mb-14 mb-12 md:text-[1.25rem] text-[1rem]">
            Showcase your work where it matters.
          </p>
          <p className="px-6 text-white bg-transparent text-center md:mb-18 mb-12 md:text-[2.25rem] text-[2rem] tracking-[-0.035rem] leading-8 font-[700]">
            Explore profiles of our early adopters
          </p>
          <Swiper />
        </div>
        <div className="py-10">
          <h2 className="text-center text-[#1B1B2D] lg:text-[3rem] text-[2.4rem] font-[800] tracking-tighter">
            Foundations
          </h2>
          <p className="text-center text-[#1B1B2D] text-[1.25rem]  tracking-tight">
            Questions that lead to building Smortr
          </p>
        </div>
        <div className="mx-6 tab:mx-16">
          <div className="md:text-[1.25rem] tab:w-[60%] text-[1rem]">
            Are you part of the ever-evolving building design community, where
            your work leaves a lasting impact, and collaboration is key? In this
            interdisciplinary field, you understand the value of long-term
            commitments and collaborating with diverse talents.
          </div>
          <div className="relative tab:w-[60%] tab:ml-[40%] mt-16 md:text-[1.25rem] text-[1rem] mb-10">
            <span className="font-[700]">But here’s the challenge:</span> there
            is no unified platform to connect all of us, forcing you to juggle
            multiple platforms. This fragmentation disrupts your workflow and
            makes collaboration a hassle.
          </div>
        </div>
        <div className="mt-8 lg:px-16 px-6 md:pr-20">
          <h4 className="text-[1.125rem] font-[700] text-[#479F70]">
            Time Taken
          </h4>
          <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#479F70] mb-8 ">
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

        <div className="mt-24 lg:px-16 px-4 md:pr-20">
          <h4 className="text-[1.125rem] font-[700] text-[#1769FF]">
            Connections in 3 Clicks
          </h4>
          <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#1769FF] mb-8">
            “Can we foster meaningful connections, potentially leading to
            collaborations in 3 clicks or less?”
          </h1>
        </div>
        <div className="md:pr-20 mr-0 ">
          <img
            src="/connect.svg"
            className="rounded-r-[18px] w-full h-auto"
            alt="why"
          />
        </div>
        <div className="mt-24 lg:px-16 px-4 md:pr-20">
          <h4 className="text-[1.125rem] font-[700] text-[#CC3057]">
            Modular but Versatile
          </h4>
          <h1 className="lg:text-[2rem] text-[1.2rem] font-[400] text-[#CC3057] mb-4">
            “How many types of building designers can we help showcase their
            work for different contexts?”
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
            <Button
              className="relative w-[70vw] hd:w-[40vw] uhd:w-[25vw] z-[5] lg:mt-8 md:mt-4 mt-8 block  bg-black float-right text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
              onClick={() => {
                setOpen((prev: boolean) => !prev);
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </HubspotProvider>
    </>
  );
}

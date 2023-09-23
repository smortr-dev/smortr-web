import { Button } from "@/components/ui/button";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
interface CardProps {
  image: string;
  background: string;
  name: string;
  thought: string;
  position: string;
  place: string;
  about: string;
  pronouns: string;
  link: string;
}
export default function Card(props: CardProps) {
  return (
    <>
      <div className="h-full">
        <div className="overflow-clip relative w-[70vw] h-full tab:w-[40vw] hd:w-[28vw] uhd:w-[22vw] 2k:w-[22vw] 4k:w-[22vw] rounded-[18px] bg-white uhd:hover:translate-y-[-1rem] transition-custom border-[#1B1B2D] border-[4px] uhd:border-[6px] hover:border-[#D1D1D1]">
          <div className="  h-[calc(55vh*0.4)] tab:h-[calc(50vh*0.4)] hd:h-[calc(34vh*0.4)] uhd:h-[calc(36vw*0.4)] 2k:h-[calc(30vw*0.4)] m-0">
            <div className=" h-full w-full">
              <img
                src={`/${props.background}`}
                className="w-full h-full object-cover overflow-clip"
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-center md:p-[0.65rem]  p-[0.5rem] items-center absolute bg-white min-h-[15%] rounded-[6px]  md:w-[90%] w-[90%] md:left-[calc(5%)] left-[calc(5%)] translate-y-[calc(-100%-3.6rem)] lg:translate-y-[calc(-100%-3.2rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
            <div className="uhd:text-[0.7rem] hd:text-[0.65rem] tab:text-[0.6rem] text-[0.65rem] tracking-[-0.015rem] leading-4 tab:leading-[0.65rem] hd:leading-[0.95rem]">
              {props.thought}
            </div>
          </div>
          <div className="inline-block absolute w-[0.3rem] h-[0.3rem] lg:w-[0.3rem] lg:h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.6rem)] lg:translate-y-[-2rem] translate-y-[-2.2rem]"></div>
          <div className="inline-block absolute w-[0.5rem] h-[0.5rem] lg:w-[0.4rem] lg:h-[0.4rem] rounded-full bg-white lg:left-[calc(50%-3.5rem)]  left-[calc(50%-3.2rem)] lg:translate-y-[-2.2rem] translate-y-[-2.7rem]"></div>
          <div className="inline-block absolute w-[0.67rem] h-[0.67rem] lg:w-[0.55rem] lg:h-[0.55rem] rounded-full bg-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3.8rem)] lg:translate-y-[-2.8rem] translate-y-[-3.3rem]"></div>

          <img
            className="inline-block absolute lg:h-[6rem] lg:w-[6rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-3rem)]  left-[calc(50%-3rem)] lg:translate-y-[-50%] translate-y-[-50%]"
            src={`/${props.image}`}
            alt="img"
          />
          <div className="2k:pb-10 hd:px-3 px-3 pb-3 flex flex-col hd:justify-left ">
            <div className=" lg:mt-[3.4rem] mt-[3.2rem] relative">
              <h2 className="2k:text-[1.5rem] uhd:text-[1.2rem] hd:text-[1.2rem] tab:text-[1.3rem] text-[1.4rem] text-center font-[800] tracking-tight leading-[1.3rem]">
                {props.name}
              </h2>
              <p className="font-[600] mt-[0.15rem]  2k:text-[0.75rem] uhd:text-[0.7rem] hd:text-[0.65rem] tab:text-[0.6rem] text-[0.8rem] text-center leading-4">
                {props.position}
              </p>
              <p className="font-[600] mt-[0.15rem]  2k:text-[0.75rem] uhd:text-[0.7rem] hd:text-[0.65rem] tab:text-[0.6rem] text-[0.8rem] text-center leading-4 ">
                in <span className="text-[#848484]">{props.place}</span>
              </p>
              <p className="text-center mt-[0.15rem] 2k:text-[0.6rem] hd:text-[0.55rem] text-[0.55rem]">
                ({props.pronouns})
              </p>
            </div>

            <p className="text-center 2k:mt-6 uhd:mt-[8%] hd:mt-1 tab:mt-2 mt-2 uhd:text-[0.6rem] 2k:text-[0.65rem] hd:text-[0.55rem] text-[0.6rem] font-[600] leading-tight">
              {props.about}
            </p>
            <div className="h-[2.8rem] w-full uhd:hidden"></div>
            <div className="block uhd:hidden absolute text-center bottom-[0.7rem] left-[50%] translate-x-[-50%] ">
              <Button
                className="py-0 text-[0.7rem] h-[1.75rem] leading-3 inline-block bg-black text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black"
                onClick={() => {
                  window.open(props.link, "_blank");
                }}
              >
                Visit Profile
              </Button>
            </div>
          </div>
          <div className="absolute uhd:block hidden h-full card-hover w-full top-0 rounded-[18px] text-center group">
            <Button
              className=" hidden uhd:group-hover:inline-block absolute bottom-6 whitespace-nowrap hd:h-auto py-1 hd:text-[0.7rem] bg-black text-white border-2 border-transparent rounded-[6px] hover:text-black hover:bg-white hover:border-black left-[50%] translate-x-[-50%]"
              onClick={() => {
                window.open(props.link, "_blank");
              }}
            >
              Visit Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

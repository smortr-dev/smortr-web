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
      {/* lg:h-[70vh] md:h-[45vh] h-[55vh] */}
      {/* md:w-[40vw] w-[70vw] */}
      <div>
        <Link href={props.link} target="_blank">
          <div className="relative cursor-pointer w-[70vw] tab:w-[40vw] hd:w-[28vw] uhd:w-[22vw] 2k:w-[18vw] 4k:w-[18vw]  rounded-[18px] h-[55vh] tab:h-[50vh] hd:h-[34vh] uhd:h-[36vw] 2k:h-[30vw] bg-white ">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img
                src={`/${props.background}`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex justify-center md:p-[0.65rem]  p-[0.5rem] items-center absolute bg-white min-h-[15%] rounded-[6px]  md:w-[90%] w-[90%] md:left-[calc(5%)] left-[calc(5%)] lg:translate-y-[calc(-85%-4rem)] translate-y-[calc(-85%-5rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
              <div className=" md:text-[0.55rem] tab:text-[0.6rem] text-[0.65rem] tracking-[-0.015rem] leading-4 tab:leading-[0.65rem] hd:leading-3">
                {props.thought}
              </div>
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] lg:w-[0.3rem] lg:h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-2.1rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] lg:w-[0.4rem] lg:h-[0.4rem] rounded-full bg-white lg:left-[calc(50%-3.5rem)]  left-[calc(50%-3rem)] lg:translate-y-[-2.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] lg:w-[0.55rem] lg:h-[0.55rem] rounded-full bg-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-3rem] translate-y-[-4.2rem]"></div>

            <img
              className="inline-block absolute lg:h-[6rem] lg:w-[6rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-3rem)]  left-[calc(50%-3rem)] lg:translate-y-[-50%] translate-y-[-50%]"
              src={`/${props.image}`}
              alt="img"
            />
            <div className="hd:px-4 px-3 h-[calc(55vh-40%)] tab:h-[calc(50vh-40%)] hd:h-[calc(34vh-40%)] uhd:h-[calc(36vw-40%)] 2k:h-[calc(30vw-40%)] flex flex-col hd:justify-left ">
              <div className=" lg:mt-[3.4rem] mt-[3.2rem] relative">
                <h2 className="2k:text-[1.5rem] uhd:text-[1.2rem] hd:text-[1.2rem] tab:text-[1.3rem] text-[1.4rem] text-center font-[800] tracking-tight leading-[1.3rem]">
                  {props.name}
                </h2>
                <p className="font-[600] mt-1  2k:text-[0.75rem] uhd:text-[0.7rem] hd:text-[0.65rem] tab:text-[0.6rem] text-[0.8rem] text-center leading-4">
                  {props.position} in{" "}
                  <span className="text-[#9F9F9F]">{props.place}</span>
                </p>
                <p className="text-center hd:mt-1 mt-[0.25] 2k:text-[0.6rem] hd:text-[0.55rem] text-[0.55rem]">
                  ({props.pronouns})
                </p>
              </div>

              <p className="text-center  2k:mt-6 uhd:mt-[10%] hd:mt-4 tab:mt-4 mt-10 uhd:text-[0.53rem] 2k:text-[0.6rem] hd:text-[0.5rem] text-[0.55rem] font-[600] leading-tight">
                {props.about}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

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
      <div>
        <Link href={props.link} target="_blank">
          <div className="relative cursor-pointer lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img
                src={`/${props.background}`}
                className="w-full object-contain"
                alt=""
              />
            </div>
            <div className="flex justify-center md:p-4 p-[0.6rem] items-center absolute bg-white min-h-[15%] rounded-[6px]  md:w-[80%] w-[90%] md:left-[calc(10%)] left-[calc(5%)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                {props.thought}
              </div>
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>

            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src={`/${props.image}`}
              alt="img"
            />
            <div className="md:p-8 p-4 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="md:mt-[2rem] mt-[0.5rem] relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.4rem] text-center font-[800] tracking-tight leading-[1.5rem]">
                  {props.name}
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  {props.position} in{" "}
                  <span className="text-[#9F9F9F]">{props.place}</span>
                </p>
                <p className="text-center md:mt-2 mt-[0.25] md:text-[0.75rem] text-[0.55rem]">
                  ({props.pronouns})
                </p>
              </div>

              <p className="text-center mt-2  md:text-[0.7rem] text-[0.55rem] font-[600] leading-tight">
                {props.about}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

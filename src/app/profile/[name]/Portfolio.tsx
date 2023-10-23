import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
import { portfolio } from "./page";
export default function Portfolio({ cardData }: { cardData: portfolio }) {
  const router = useRouter();
  return (
    <>
      <div
        className={` hover:cursor-pointer border-2 relative border-black rounded-[0.88rem] overflow-clip shadow-[0_3px_50px_0_rgba(0,0,0,0.1)]`}
      >
        <div className="h-[20vh] relative">
          <img
            loading="lazy"
            src={cardData.image}
            alt="test"
            className="object-cover h-full w-full z-[15]"
          />
        </div>
        <div className=" w-full bg-white  z-[20] flex justify-center items-start flex-col tracking-wide py-4">
          <div className="text-[0.8rem] text-black font-[500] py-1 px-6">
            {cardData.title}
          </div>
          {/* <div className="text-[0.8rem] text-black font-[500] px-6 py-1 tracking-wide">
            {cardData.description}
          </div> */}
        </div>
        {/* <div className="absolute flex justify-center items-center top-3 left-3 h-7 w-7 bg-[#479F70] rounded-full">
          <div className="inline-block text-white  text-[0.6rem]">
            {cardData.user.split(" ").map((part, index) => {
              return <span key={index}>{part.charAt(0)}</span>;
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}

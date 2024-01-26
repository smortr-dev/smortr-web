/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import type { bio } from "./page";
export default function Bio({ cardData }: { cardData: bio }) {
  const router = useRouter();
  return (
    <>
      <div
        // key={index}
        className="relative hover:cursor-pointer shadow-[0_3px_50px_0px_rgba(0,0,0,0.1)] py-4 rounded-[1.13rem]"
      >
        <div className="text-[0.65rem] leading-3 font-[700] px-2 py-2 text-left w-full">
          {cardData.question}
        </div>
        <div className="h-[20vh] border-2 border-black w-full">
          <img
            src={cardData.filelink}
            className="object-cover h-full w-full"
            alt="some stuff"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-[0.6rem]  px-3 leading-[0.8rem] pt-2 text-left w-full">
            {cardData.caption}
          </div>
        </div>
        {/* <div className="absolute flex justify-center items-center top-3 left-3 h-7 w-7 bg-[#DD5D33] rounded-full">
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

/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
type bio = {
  userLink: string;
  user: string;
  question: string;
  mediaType: string;
  filelink: string;
  caption: string;
  postDate: string;
};
export default function Bio({ cardData }: { cardData: bio }) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          router.push(cardData.userLink);
        }}
        // key={index}
        className="relative min-h-[30vw] hover:cursor-pointer shadow-[0_3px_50px_0px_rgba(0,0,0,0.1)] py-4 rounded-[1.13rem]"
      >
        <div className="text-[0.9rem] font-[700] px-4 py-8 text-left w-full">
          {cardData.question}
        </div>
        <div className="h-[20vw] border-2 border-black w-full">
          <img
            src={cardData.filelink}
            className="object-cover h-full w-full"
            alt="some stuff"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-[1.1rem] px-4 pt-3 text-left w-full">
            {cardData.caption}
          </div>
        </div>
        <div className="absolute flex justify-center items-center top-3 left-3 h-7 w-7 bg-[#DD5D33] rounded-full">
          <div className="inline-block text-white  text-[0.6rem]">
            {cardData.user.split(" ").map((part, index) => {
              return <span key={index}>{part.charAt(0)}</span>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

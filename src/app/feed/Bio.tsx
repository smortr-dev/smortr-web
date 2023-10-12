/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
type bio = {
  userLink: string;
  user: string;
  question: string;
  mediaType: string;
  fileLink: string;
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
        className="min-h-[30vw] hover:cursor-pointer shadow-[0_3px_50px_0px_rgba(0,0,0,0.1)] py-4 rounded-[1.13rem]"
      >
        <div className="text-[0.9rem] font-[700] px-4 py-4 text-left w-full">
          {cardData.question}
        </div>
        <div className="h-[20vw] border-2 border-black w-full">
          <img
            src="/bg1.png"
            className="object-cover h-full w-full"
            alt="some stuff"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-[1.1rem] px-4 pt-3 text-left w-full">
            {cardData.caption}
          </div>
        </div>
      </div>
    </>
  );
}

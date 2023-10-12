/* eslint-disable @next/next/no-img-element */
type portfolio = {
  user: string;
  type: string;
  image: string;
  title: string;
  description: string;
  postDate: string;
};
export default function Portfolio({ cardData }: { cardData: portfolio }) {
  return (
    <>
      <div
        className={`min-h-[60vh] border-2 relative border-black rounded-[0.88rem] overflow-clip h-[45vh] shadow-[0_3px_50px_0_rgba(0,0,0,0.1)]`}
      >
        <img
          src="/bg1.png"
          alt="test"
          className="object-cover h-full w-full z-[10]"
        />
        <div className="absolute h-[40%] w-full bottom-0 bg-[rgba(0,0,0,0.1)] z-[20] flex justify-center items-start flex-col tracking-wide">
          <div className="text-[1.5rem] text-white font-[500] py-1 px-6">
            {cardData.title}
          </div>
          <div className="text-[1rem] text-white font-[500] px-6 py-1 tracking-wide">
            {cardData.description}
          </div>
        </div>
      </div>
    </>
  );
}

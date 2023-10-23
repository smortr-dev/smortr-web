/* eslint-disable @next/next/no-img-element */
import { certificationOrLicense } from "./page";
import { useRouter } from "next/navigation";
let fetchMonth = function (date: Date) {
  let monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthList[date.getMonth()];
};
export default function CertificationOrLicense({
  cardData,
}: {
  cardData: certificationOrLicense;
}) {
  const router = useRouter();
  return (
    <>
      <div
        // key={index}
        className="inline-block hover:cursor-pointer  w-full shadow-[0_3px_50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem] "
      >
        <div className=" relative grid grid-cols-2 px-2 py-4 justify-center w-full items-center">
          <img
            className="absolute top-[0.2rem] right-[0.2rem] h-[0.8rem] w-[0.8rem]"
            src="/open_certificate.svg"
            alt="open link"
          />
          <div className="h-full w-full flex justify-center items-center">
            <img
              loading="lazy"
              src={`/certificate.svg`}
              alt="certificate"
              className=" aspect-square w-[60%] inline-block  mr-2"
            />
          </div>
          <div>
            <div className="text-[0.6rem] text-[#848484]">{cardData.type}</div>
            <div className="font-[500] leading-[0.8rem] mt-[0.1rem] text-[0.65rem]">
              by <span className="font-[700]">{cardData.from}</span>
            </div>
            <div className="text-[0.6rem] mt-1 text-[#848484]">
              Valid till {fetchMonth(new Date())}{" "}
              {new Date(cardData.date).getFullYear()}
            </div>
            <div className="break-all text-[0.55rem] mt-[0.1rem] font-[500] text-[#4F46E5]">
              ID: {cardData.id}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

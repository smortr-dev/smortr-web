/* eslint-disable @next/next/no-img-element */
type certificationOrLicense = {
  userLink: string;
  userImg: string;
  user: string;
  type: string;
  from: string;
  validTill: string;
  id: string;
  link: string;
  postDate: string;
};
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
        onClick={() => {
          router.push(cardData.userLink);
        }}
        // key={index}
        className="hover:translate-y-[-1rem] transition-transform inline-block hover:cursor-pointer min-h-[25vh] w-full shadow-[0_3px_50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem] "
      >
        <div className=" relative grid grid-cols-2  justify-center w-full h-full items-center">
          <img
            className="absolute top-[1rem] right-[1rem] h-[1.5rem] w-[1.5rem]"
            src="/open_certificate.svg"
            alt="open link"
          />
          <div className="h-full w-full flex justify-center items-center">
            <img
              loading="lazy"
              src={`${cardData.userImg}`}
              alt="certificate"
              className=" aspect-square w-[20vh] inline-block border-2 border-black rounded-full mr-6"
            />
          </div>
          <div>
            <div className="text-[0.9rem] text-[#848484]">{cardData.type}</div>
            <div className="font-[500] text-[1rem]">
              by <span className="font-[700]">{cardData.from}</span>
            </div>
            <div className="text-[0.75rem] text-[#848484]">
              Valid till {fetchMonth(new Date())}{" "}
              {new Date(cardData.validTill).getFullYear()}
            </div>
            <div className="text-[0.6rem] font-[500] text-[#4F46E5]">
              ID: {cardData.id}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

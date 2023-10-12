/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { profile, profileEnd } from "console";
// import { type } from "os";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/navigation";

// export async function getStaticProps(params:type) {

// }
// import { profile } from "console";
// import type { InferGetStaticPropsType, GetStaticProps } from "next";

type Profile = {
  name: string;
  userInfo: {
    name: string;
    image: string;
    location: string;
    position: string;
    pronouns: string;
    about: string;
    thought: string;
    background: string;
    thoughtPostDate: string;
    connections: number;
    shares: number;
    joinDate: string;
    languages: string[];
    workPreference: string;
  };
  bio: [
    {
      question: string;
      mediaType: string;
      fileLink: string;
      caption: string;
    }
  ];
  skills: { skillName: string; proficiency: number }[];
  portfolio: [
    {
      type: string;
      image: string;
    }
  ];
  education: [
    {
      image: string;
      degree: string;
      description: string;
      startDate: string;
      endDate: string;
      skills: string[];
      school: string;
    }
  ];
  experience: [
    {
      image: string;
      place: string;
      description: string;
      startDate: string;
      position: string;
      endDate: string;
      company: string;
      skills: string[];
    }
  ];
  certificationOrLicense: [
    {
      type: string;
      from: string;
      validTill: string;
      id: string;
      link: string;
    }
  ];
};

// export const getStaticProps = (async () => {

// }) satisfies GetStaticProps<{
//   profileData: Profile;
// }>;
async function getData(name: string) {
  // console.log("called");
  const res = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({ name: name }),
  });
  const profileData: Profile = await res.json();
  console.log(profileData, "profileData");
  // console.log(profileData);
  return profileData;
}

export default function Profile({ params }: { params: { name: string } }) {
  const router = useRouter();
  let portfolioClassResolver = (portfolioObject: {
    image: string;
    type: string;
  }): string => {
    if (portfolioObject.type == "normal") {
      return "h-[45vh]";
    } else if (portfolioObject.type == "wide") {
      return "row-span-2 min-h-[calc(90vh+2.5rem)]";
    } else {
      return "col-span-2 max-h-[45vh]";
    }
  };
  let portfolioClassResolverAlt = (portfolioObject: {
    image: string;
    type: string;
  }): string => {
    if (portfolioObject.type == "normal") {
      return "h-[45vh]";
    } else if (portfolioObject.type == "wide") {
      return "col-span-2 h-[45vh] ";
    } else {
      return "h-[calc(90vh+1.25rem)]";
    }
  };
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
  const [profileData, setProfileData] = useState<Profile>();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name: params.name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setProfileData(data);
        setLoad(false);
      });

    // async function apiCall() {
    //   const res = await fetch("/api/profile", {
    //     method: "POST",
    //     body: JSON.stringify({ name: params.name }),
    //   });
    //   const profileData: Profile = await res.json();
    //   console.log(profileData, "profileData");
    //   // console.log(data, "profileData after call");
    //   setProfileData(profileData);
    //   setLoad(true);
    // }
    // apiCall();
  }, [params]);
  // const profileData: Profile = await getData();
  // console.log(profileData, load, "mount");
  if (profileData && !load)
    return (
      <>
        <Header />
        <div className="relative  h-[100vh]">
          <div className="overflow-clip h-[40%]">
            <img
              src={`${
                profileData ? "/" + profileData.userInfo.background : ""
              }`}
              className="w-full object-contain"
              alt=""
            />
          </div>
          <div className="flex justify-center p-4  items-center absolute bg-white min-h-[15%] rounded-[6px] w-[30%]  left-[35%] lg:translate-y-[calc(-85%-7.8rem)] translate-y-[calc(-85%-5rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
            <div className="absolute bottom-2 right-4 text-[0.6rem] font-[500] text-[#848484]">
              {profileData
                ? new Date(
                    profileData.userInfo.thoughtPostDate
                  ).toLocaleString()
                : ""}
            </div>
            <div className=" md:text-[1rem] font-[400] tracking-[-0.015rem]">
              {profileData ? profileData.userInfo.thought : ""}
            </div>
          </div>
          <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-5rem] translate-y-[-2.8rem]"></div>
          <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-5.5rem] translate-y-[-3.5rem]"></div>
          <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-6.2rem] translate-y-[-4.2rem]"></div>

          <img
            className="inline-block absolute lg:h-[10rem] lg:w-[10rem] h-[6rem] w-[6rem] rounded-full  lg:left-[calc(50%-5rem)]  left-[calc(50%-3rem)] lg:translate-y-[-5rem] translate-y-[-3rem]"
            src={`${profileData ? "/" + profileData.userInfo.image : ""}`}
            alt="img"
          />
          <div className="h-[60%]">
            <div className="h-[5rem]"></div>
            <div className="flex flex-col justify-between px-[30%] h-[calc(100%-5rem)]">
              <div>
                <h1 className="text-center text-[2rem] font-[700]">
                  {profileData ? profileData.userInfo.name : ""}
                </h1>
                <h3 className="text-center text-[1.3rem] tracking-tight">
                  {profileData ? profileData.userInfo.position : ""}
                </h3>
                <h3 className="text-center text-[1.3rem]">
                  in{" "}
                  <span className="text-[#848484] font-[700] ">
                    {profileData ? profileData.userInfo.location : ""}
                  </span>
                </h3>
                <p className="text-center text-[0.8rem] font-[300] tracking-wider">
                  ({profileData ? profileData.userInfo.pronouns : ""})
                </p>
              </div>

              <div className="">
                <p className="text-center text-[0.9rem] font-[500] tracking-tight">
                  {profileData ? profileData.userInfo.about : ""}
                </p>
                <div className="flex justify-center last:pr-0 mt-4">
                  <div className="inline-block pr-4">
                    <img
                      src="/person_add.svg"
                      alt="connections"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="text-[0.8rem] text-[#848484]">
                      {" "}
                      {profileData ? profileData.userInfo.connections : ""}
                    </span>
                  </div>
                  <div className="inline-block pr-4">
                    <img
                      src="/share.svg"
                      alt="shares"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="text-[0.8rem] text-[#848484]">
                      {" "}
                      {profileData ? profileData.userInfo.shares : ""}
                    </span>
                  </div>

                  <div className="inline-block">
                    <img
                      src="/calendar_month.svg"
                      alt="date joined"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="text-[0.8rem] text-[#848484]">
                      {" Joined in "}
                      {profileData
                        ? fetchMonth(new Date(profileData.userInfo.joinDate))
                        : ""}{" "}
                      {profileData
                        ? new Date(profileData.userInfo.joinDate).getFullYear()
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="text-[0.8rem] text-[#848484] text-center">
                  Languages:{" "}
                  {profileData
                    ? profileData.userInfo.languages.map((language, index) => (
                        <span key={language} className="font-[700]">
                          {language}
                          {profileData.userInfo.languages.length - 1 > index
                            ? ", "
                            : null}
                        </span>
                      ))
                    : null}
                </div>
                <div className="text-[0.8rem] text-[#848484] text-center mb-4">
                  Work Preference:{" "}
                  <span className="font-[700]">
                    {profileData ? profileData.userInfo.workPreference : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className=" p-4 bg-[#1B1B2D] leading-5 text-white border-2 border-transparent rounded-[6px] hover:text-[#1B1B2D] hover:bg-white hover:border-[#1B1B2D]"
              onClick={() => {
                router.push(
                  `https://${profileData ? profileData.name : null}.smortr.com`
                );
              }}
            >
              View Profile
            </Button>
          </div>
        </div>

        <div className="px-16 pt-16">
          <h3 className="text-[1.3rem] px-2 font-[700]">Bio</h3>
          <div className="flex justify-between mt-4">
            {profileData
              ? profileData.bio.map((cardData, index) => (
                  <>
                    <div
                      key={index}
                      className="w-[28vw] shadow-[0_3px_50px_0px_rgba(0,0,0,0.1)] py-4 rounded-[1.13rem]"
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
                ))
              : null}
          </div>
        </div>
        <div className="px-16 pt-8 mb-4">
          <h3 className="text-[1.3rem] px-2 font-[700]">Skills</h3>
          <div className=" columns-3 gap-x-24 px-2">
            {profileData
              ? profileData.skills.map((skill, index) => {
                  return (
                    <>
                      <div className="inline-block w-full mt-4" key={index}>
                        <div className="text-[0.9rem] py-2 font-[500]">
                          {skill.skillName}
                        </div>
                        <div className=" py-[0.44rem] rounded-[0.38rem] bg-[#ECECEC]">
                          <div
                            className={`bg-[#F8C643] h-[0.875rem]`}
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
        {/* <div className="px-16 pt-8 mb-4">
          <h3 className="text-[1.3rem] px-2 font-[700]">Portfolio</h3>
          <div className="grid gap-x-10 gap-y-5 grid-cols-[1fr_1fr_1fr] grid-flow-dense ">
            {profileData
              ? profileData.portfolio.map((portfolioObject, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`border-2 border-black rounded-[0.88rem] mt-[1.25rem] overflow-clip ${portfolioClassResolver(
                          portfolioObject
                        )}`}
                      >
                        <img
                          src="/bg1.png"
                          alt="test"
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div> */}

        {/* <div className="px-16 pt-8 mb-4">
        <h3 className="text-[1.3rem] px-2 font-[700]">Portfolio</h3>
        <div className=" columns-3 gap-x-10 gap-y-5 " style={{ columnSpan: 2 }}>
          {profileData.portfolio.map((portfolioObject, index) => {
            return (
              <>
                <div
                  className={`inline-block border-2 border-black rounded-[0.88rem] mt-[1.25rem] overflow-clip ${portfolioClassResolverAlt(
                    portfolioObject
                  )}`}
                >
                  <img
                    src="bg1.png"
                    alt="test"
                    className="object-cover h-full w-full"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div> */}

        <div className="px-16 pt-8 mb-4">
          <h3 className="text-[1.3rem] px-2 font-[700]">Education</h3>
          <div className="grid gap-x-16 grid-cols-[1fr_1fr_1fr] mt-4">
            {profileData
              ? profileData.education.map((education, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        // ref={previewRef}
                        className={`rounded-[18px] relative bg-white shadow-[0_4px_50px_0_rgba(0,0,0,0.05)]`}
                        // data-hadler-id={handlerId}
                      >
                        <div
                          className={`h-[35vh] rounded-t-[18px] z-[8] border-[0.06rem] border-black w-full  bg-[#FAFAFA]  overflow-clip`}
                          // onClick={() => {}}
                        >
                          <img
                            src={`/bg1.png`}
                            alt="preview"
                            className="block object-cover h-full z-[12] w-full "
                          />
                        </div>
                        <div className="px-6 pt-2 pb-4">
                          <p className="text-left text-[0.9rem] font-semibold text-[#848484]">
                            {education.degree}
                          </p>
                          <p className="text-left text-[1rem] ">
                            at{" "}
                            <span className="font-semibold ">
                              {education.school}
                            </span>
                          </p>
                          <div className="text-[0.8rem] font-[500] text-[#848484]">
                            {/* <span>{data.dates.startDate.getFullYear()}</span>- */}
                            <span>{new Date().getFullYear()}</span>
                            {" - "}
                            {/* <span>{data.dates.endDate.getFullYear()}</span> */}
                            <span>{new Date().getFullYear()}</span>
                          </div>
                          <p className="text-left text-[1rem] text-[#848484] py-6">
                            {education.description}
                          </p>

                          <div className="flex flex-wrap">
                            {education.skills.map((name, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-block  relative group overflow-x-hidden border-[#479F70] leading-3 border-2  bg-white hover:border-2 hover:overflow-x-visible hovertransition-all p-2 text-[0.75rem] font-[500] text-[#479F70] rounded-[6.25rem] mr-2 whitespace-nowrap mt-1"
                                >
                                  {name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
        <div className="px-16 pt-8 mb-4">
          <h3 className="text-[1.3rem] px-2 font-[700]">Experience</h3>
          <div className="grid gap-x-16 grid-cols-[1fr_1fr_1fr] mt-4">
            {profileData
              ? profileData.experience.map((experience, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        // ref={previewRef}
                        className={`rounded-[18px] relative bg-white shadow-[0_4px__50px_0_rgba(0,0,0,0.05)]`}
                        // data-hadler-id={handlerId}
                      >
                        <div
                          className={`h-[35vh] rounded-t-[18px] z-[8] border-[0.06rem] border-black w-full  bg-[#FAFAFA]   overflow-clip`}
                          // onClick={() => {}}
                        >
                          <img
                            src={`/bg1.png`}
                            alt="preview"
                            className="block object-cover h-full z-[12] w-full "
                          />
                        </div>
                        <div className="px-6 pt-2 pb-4">
                          <p className="text-left text-[0.9rem] font-semibold text-[#848484]">
                            {experience.position}
                          </p>
                          <p className="text-left text-[1rem] ">
                            at{" "}
                            <span className="font-semibold ">
                              {experience.company}
                              {", "}
                              {experience.place}
                            </span>
                          </p>
                          <div className="text-[0.8rem] font-[500] text-[#848484]">
                            {/* <span>{data.dates.startDate.getFullYear()}</span>- */}
                            <span>{new Date().getFullYear()}</span>
                            {" - "}
                            {/* <span>{data.dates.endDate.getFullYear()}</span> */}
                            <span>{new Date().getFullYear()}</span>
                          </div>
                          <p className="text-left text-[1rem] text-[#848484] py-6">
                            {experience.description}
                          </p>

                          <div className="flex flex-wrap">
                            {experience.skills.map((name, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-block  relative group overflow-x-hidden border-[#479F70] leading-3 border-2  bg-white hover:border-2 hover:overflow-x-visible hovertransition-all p-2 text-[0.75rem] font-[500] text-[#479F70] rounded-[6.25rem] mr-2 whitespace-nowrap mt-1"
                                >
                                  {name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
        <div className="px-16 pt-8 mb-4">
          <h3 className="text-[1.3rem] px-2 font-[700]">
            Certification/License
          </h3>
          <div className=" columns-3 gap-x-10 px-2">
            {profileData
              ? profileData.certificationOrLicense.map(
                  (certificationOrLicense, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="inline-block w-full shadow-[0_4px__50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem] mt-4"
                        >
                          <div className=" relative grid grid-cols-2 px-10 py-10 justify-center w-full h-full items-center">
                            <img
                              className="absolute top-[1rem] right-[1rem] h-[1.5rem] w-[1.5rem]"
                              src="/open_certificate.svg"
                              alt="open link"
                            />
                            <img
                              src="/certificate.svg"
                              alt="certificate"
                              className="h-[9vh] w-full block"
                            />
                            <div>
                              <div className="text-[0.9rem] text-[#848484]">
                                {certificationOrLicense.type}
                              </div>
                              <div className="font-[500] text-[1rem]">
                                by{" "}
                                <span className="font-[700]">
                                  {certificationOrLicense.from}
                                </span>
                              </div>
                              <div className="text-[0.75rem] text-[#848484]">
                                Valid till {fetchMonth(new Date())}{" "}
                                {new Date(
                                  certificationOrLicense.validTill
                                ).getFullYear()}
                              </div>
                              <div className="text-[0.6rem] font-[500] text-[#4F46E5]">
                                ID: {certificationOrLicense.id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )
              : null}
            {/* <div className="inline-block w-full shadow-[0_4px__50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem]">
            <div className=" relative grid grid-cols-2 px-10 py-10 justify-center w-full h-full items-center">
              <img
                className="absolute top-[1rem] right-[1rem] h-[1.5rem] w-[1.5rem]"
                src="open_certificate.svg"
                alt="open link"
              />
              <img
                src="certificate.svg"
                alt="certificate"
                className="h-[9vh] w-full block"
              />
              <div>
                <div className="text-[0.9rem] text-[#848484]">
                  LEED Certification
                </div>
                <div className="font-[500] text-[1rem]">
                  by <span className="font-[700]">USGBC</span>
                </div>
                <div className="text-[0.75rem] text-[#848484]">
                  Valid till {fetchMonth(new Date())} {new Date().getFullYear()}
                </div>
                <div className="text-[0.6rem] font-[500] text-[#4F46E5]">
                  ID: {1234567890000}
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </>
    );
  else null;
}

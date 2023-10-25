/* eslint-disable @next/next/no-img-element */
"use client";
import { styled } from "@mui/material/styles";
import { Button } from "@/components/ui/button";
import Masonry from "react-responsive-masonry";
import { profile, profileEnd } from "console";
// import { type } from "os";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-profile";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CertificationOrLicense from "./CertificationOrLicense";
import Bio from "./Bio";
import Education from "./Education";
import Experience from "./Experience";
import Portfolio from "./Portfolio";
import Tabs from "@mui/material/Tabs";
import { useStepContext } from "@mui/material";

// export async function getStaticProps(params:type) {

// }
// import { profile } from "console";
// import type { InferGetStaticPropsType, GetStaticProps } from "next";
type userInfo = {
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
  workPreference: string[];
};

type bio = {
  question: string;
  mediaType: string;
  filelink: string;
  caption: string;
};

type portfolio = {
  title: string;
  description: string;
  type: string;
  image: string;
};

type education = {
  image: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  skills: string[];
  school: string;
};

type experience = {
  image: string;
  place: string;
  description: string;
  startDate: string;
  position: string;
  endDate: string;
  company: string;
  skills: string[];
};

type certificationOrLicense = {
  type: string;
  from: string;
  date: string;
  id: string;
  link: string;
};

type Profile = {
  name: string;
  userInfo: userInfo;
  bio: bio[];
  skills: { skillName: string; proficiency: number }[];
  portfolio: portfolio[];
  education: education[];
  experience: experience[];
  certificationOrLicense: certificationOrLicense[];
};

type dataTypes =
  | {
      type: "bio";
      cardData: bio;
    }
  | {
      type: "certificationOrLicense";
      cardData: certificationOrLicense;
    }
  | {
      type: "experience";
      cardData: experience;
    }
  | {
      type: "education";
      cardData: education;
    }
  | {
      type: "portfolio";
      cardData: portfolio;
    };

type data = dataTypes[];

export type { bio, experience, certificationOrLicense, portfolio, education };
// export const getStaticProps = (async () => {

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent", //6563FF
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    // padding: "0.4rem",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#6563FF",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

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
  // console.log(profileData, "profileData");
  // console.log(profileData);
  return profileData;
}

function getAllData(profileData: Profile) {
  if (!profileData) return undefined;
  else {
    let bioData: data = profileData.bio.map((bio): dataTypes => {
      return { type: "bio", cardData: bio };
    });
    let certificationOrLicenseData: data =
      profileData.certificationOrLicense.map(
        (certificationOrLicense): dataTypes => {
          return {
            type: "certificationOrLicense",
            cardData: certificationOrLicense,
          };
        }
      );

    let experienceData: data = profileData.experience.map(
      (experience): dataTypes => {
        return { type: "experience", cardData: experience };
      }
    );
    let educationData: data = profileData.education.map(
      (education): dataTypes => {
        return { type: "education", cardData: education };
      }
    );

    let portfolio: data = profileData.portfolio.map((portfolio): dataTypes => {
      return { type: "portfolio", cardData: portfolio };
    });

    let totalData: data = [
      ...bioData,
      ...experienceData,
      ...educationData,
      ...portfolio,
      ...certificationOrLicenseData,
    ];
    totalData = totalData.sort(() => {
      let num: number = Math.floor(Math.random() * 2);
      let arr = [-1, 1];
      return arr[num];
    });

    return totalData;
  }
}

export default function Profile({ params }: { params: { name: string } }) {
  const router = useRouter();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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

  type qualificationSelectionOption =
    | "education"
    | "experience"
    | "certificationOrLicense";

  const [qualificationSelection, setQualificationSelection] =
    useState<qualificationSelectionOption>("education");
  const [profileData, setProfileData] = useState<Profile>();
  const [shareOpen, setShareOpen] = useState(false);
  const [allData, setAllData] = useState<data>();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name: params.name }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "data");
        setProfileData(data);

        setAllData(getAllData(data));
        // console.log(data);
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
  function displayQualificationData(
    qualificationSelection: qualificationSelectionOption
  ) {
    if (qualificationSelection == "education") {
      return (
        <>
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
                        className={`h-[25vh] rounded-t-[18px] z-[8] border-[0.06rem] border-black w-full  bg-[#FAFAFA]  overflow-clip`}
                        // onClick={() => {}}
                      >
                        <img
                          src={education.image}
                          alt="preview"
                          className="block object-cover h-full z-[12] w-full "
                        />
                      </div>
                      <div className="px-3 pt-2 pb-4">
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
                          <span>
                            {new Date(education.startDate).getFullYear()}
                          </span>
                          {" - "}

                          <span>
                            {new Date(education.endDate).getFullYear()}
                          </span>
                        </div>
                        <p className="text-left text-[0.85rem] text-[#848484] pt-3 pb-2">
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
        </>
      );
    } else if (qualificationSelection == "experience") {
      return (
        <>
          {profileData
            ? profileData.experience.map((experience, index) => {
                return (
                  <>
                    <div
                      key={index}
                      // ref={previewRef}
                      className={`rounded-[18px] relative bg-white shadow-[0_4px_50px_0_rgba(0,0,0,0.05)]`}
                      // data-hadler-id={handlerId}
                    >
                      <div
                        className={`h-[25vh] rounded-t-[18px] z-[8] border-[0.06rem] border-black w-full  bg-[#FAFAFA]  overflow-clip`}
                        // onClick={() => {}}
                      >
                        <img
                          src={experience.image}
                          alt="preview"
                          className="block object-cover h-full z-[12] w-full "
                        />
                      </div>
                      <div className="px-3 pt-2 pb-4">
                        <p className="text-left text-[0.9rem] font-semibold text-[#848484]">
                          {experience.position}
                        </p>
                        <p className="text-left text-[1rem] ">
                          at{" "}
                          <span className="font-semibold ">
                            {experience.company}
                          </span>
                        </p>
                        <div className="text-[0.8rem] font-[500] text-[#848484]">
                          <span>
                            {new Date(experience.startDate).getFullYear()}
                          </span>
                          {" - "}

                          <span>
                            {new Date(experience.endDate).getFullYear()}
                          </span>
                        </div>
                        <p className="text-left text-[0.85rem] text-[#848484] pt-3 pb-2">
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
        </>
      );
    } else if (qualificationSelection == "certificationOrLicense") {
      // console.log("certification");
      return (
        <>
          {profileData &&
          profileData.certificationOrLicense &&
          profileData.certificationOrLicense.length > 0 ? (
            <>
              <div className="px-2">
                {profileData
                  ? profileData.certificationOrLicense.map(
                      (certificationOrLicense, index) => {
                        return (
                          <>
                            <div
                              onClick={() => {
                                router.push(certificationOrLicense.link);
                              }}
                              key={index}
                              className="hover:cursor-pointer inline-block w-full shadow-[0_4px__50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem] "
                            >
                              <div className=" relative grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-6 px-4 py-4 justify-center w-full h-full items-center">
                                <img
                                  className="absolute top-[0.4rem] right-[0.4rem] h-[0.9rem] w-[0.9rem]"
                                  src="/open_certificate.svg"
                                  alt="open link"
                                />
                                <img
                                  src="/certificate.svg"
                                  alt="certificate"
                                  className=" w-full block"
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
                                    Valid till{" "}
                                    {fetchMonth(
                                      new Date(certificationOrLicense.date)
                                    )}{" "}
                                    {new Date(
                                      certificationOrLicense.date
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
              </div>
            </>
          ) : null}
        </>
      );
    } else return null;
  }
  // const profileData: Profile = await getData();
  // console.log(profileData, load, "mount");
  if (profileData && !load)
    return (
      <>
        <Header />
        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogContent>
            {profileData ? (
              <>
                <div className="py-10 px-6">
                  <p className="font-[500] text-[1.2rem]">
                    {profileData.userInfo.name} is an{" "}
                    {profileData.userInfo.position} in{" "}
                    {profileData.userInfo.location}. Check out their profile on
                    Smortr{" "}
                    <a
                      className="text-[#1769FF] underline underline-offset-2"
                      href={`https://smortr.com/profile/${profileData.name}`}
                    >{`https://smortr.com/profile/${profileData.name}`}</a>{" "}
                  </p>

                  <div className="mt-12">
                    <h3 className="text-center font-[700] text-[1.5rem]">
                      Share
                    </h3>
                    <div className="grid mx-6 grid-cols-4 gap-x-8 gap-y-4 mt-6">
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            src="/link.svg"
                            onClick={() => {
                              navigator.clipboard.writeText(`${
                                profileData.userInfo.name
                              } is an{" "}
                              ${profileData.userInfo.position} in${" "}
                              ${
                                profileData.userInfo.location
                              }. Check out their profile on
                              Smortr${" "}${`https://smortr.com/profile/${profileData.name}`}`);
                            }}
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Link
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            src="/linkedin.svg"
                            onClick={() => {
                              let newUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://smortr.com/profile/${profileData.name}`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                              location=0,menubar=0,toolbar=0,personalbar=0,\
                              status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          LinkedIn
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            onClick={() => {
                              let newUrl = `https://www.facebook.com/sharer/sharer.php?u=https://smortr.com/profile/${profileData.name}`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                            location=0,menubar=0,toolbar=0,personalbar=0,\
                            status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            src="/facebook.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Facebook
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            onClick={() => {
                              // prettier-ignore
                              let newUrl = `https://twitter.com/intent/tweet?url=https://smortr.com/profile/${profileData.name}&text=${profileData.userInfo.name}%20is%20an%20${profileData.userInfo.position}%20in%20${profileData.userInfo.location}.%20Check%20out%20their%20profile%20on%20Smortr%20`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                          location=0,menubar=0,toolbar=0,personalbar=0,\
                          status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            src="/twitter.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Twitter
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            onClick={() => {
                              // prettier-ignore
                              let newUrl = `whatsapp://send?text=${profileData.userInfo.name}%20is%20an%20${profileData.userInfo.position}%20in%20${profileData.userInfo.location}.%20Check%20out%20their%20profile%20on%20Smortr%0Ahttps://smortr.com/profile/${profileData.name}`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                          location=0,menubar=0,toolbar=0,personalbar=0,\
                          status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            src="/whatsapp.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Whatsapp
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            // onClick={() => {
                            //   let newUrl = `https://www.facebook.com/sharer/sharer.php?u=https://smortr.com/profile/${profileData.name}`;
                            //   let sw = screen.availWidth || 1024,
                            //     sh = screen.availHeight || 700,
                            //     pw = Math.min(600, sw - 40),
                            //     ph = Math.min(600, sh - 40),
                            //     px = Math.floor((sw - pw) / 2),
                            //     py = Math.floor((sh - ph) / 2);

                            //   window.open(
                            //     newUrl,
                            //     "social",
                            //     `width=${pw},height=${ph},left=${px},top=${py},\
                            // location=0,menubar=0,toolbar=0,personalbar=0,\
                            // status=0,scrollbars=1,resizable=1`
                            //   );
                            // }}
                            src="/instagram.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Instagram
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            onClick={() => {
                              // prettier-ignore
                              let newUrl = `https://t.me/share/url?url=https://smortr.com/profile/${profileData.name}&text=${profileData.userInfo.name}%20is%20an%20${profileData.userInfo.position}%20in%20${profileData.userInfo.location}.%20Check%20out%20their%20profile%20on%20Smortr%20`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                          location=0,menubar=0,toolbar=0,personalbar=0,\
                          status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            src="/telegram.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Telegram
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="flex justify-center items-center w-full">
                          <img
                            onClick={() => {
                              // prettier-ignore
                              let newUrl = `sgnl://send?text=${profileData.userInfo.name}%20is%20an%20${profileData.userInfo.position}%20in%20${profileData.userInfo.location}.%20Check%20out%20their%20profile%20on%20Smortr%0Ahttps://smortr.com/profile/${profileData.name}`;
                              let sw = screen.availWidth || 1024,
                                sh = screen.availHeight || 700,
                                pw = Math.min(600, sw - 40),
                                ph = Math.min(600, sh - 40),
                                px = Math.floor((sw - pw) / 2),
                                py = Math.floor((sh - ph) / 2);

                              window.open(
                                newUrl,
                                "social",
                                `width=${pw},height=${ph},left=${px},top=${py},\
                          location=0,menubar=0,toolbar=0,personalbar=0,\
                          status=0,scrollbars=1,resizable=1`
                              );
                            }}
                            src="/signal.svg"
                            className="block bg-white hover:cursor-pointer max-w-[2.5rem] h-auto"
                            alt="Share Link"
                          />
                        </div>
                        <div className="text-center mt-2 text-[0.9rem] font-[500]">
                          Signal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
        <div className="relative min-h-[60vh] ">
          <div className="overflow-clip md:h-[45vh] h-[30vh]">
            <img
              loading="lazy"
              src={`${profileData ? profileData.userInfo.background : ""}`}
              className="w-full object-cover h-full"
              alt=""
            />
          </div>
          <div className="flex justify-center md:p-4 p-4  items-center absolute bg-white md:min-h-[15%] rounded-[6px] lg:w-[30%] md:w-[50%] w-[70%] md:left-[25%] lg:left-[35%] left-[15%] lg:translate-y-[calc(-85%-7.8rem)] translate-y-[calc(-85%-6rem)] shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
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
          <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-5rem] translate-y-[-3.8rem]"></div>
          <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3.2rem)] lg:translate-y-[-5.5rem] translate-y-[-4.1rem]"></div>
          <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.8rem)] lg:translate-y-[-6.2rem] translate-y-[-4.9rem]"></div>

          <img
            loading="lazy"
            className="inline-block absolute lg:h-[10rem] lg:w-[10rem] h-[8rem] w-[8rem] rounded-full  lg:left-[calc(50%-5rem)]  left-[calc(50%-4rem)] lg:translate-y-[-5rem] translate-y-[-4rem]"
            src={`${profileData ? profileData.userInfo.image : ""}`}
            alt="img"
          />
          <div className="relative ">
            <div className="absolute hidden top-4 right-4 md:flex flex-col">
              <div className="hover:cursor-pointer hover:bg-black transition-all h-8 w-8 flex justify-center items-center bg-[#848484] rounded-full">
                <img
                  src="/person_add_profile.svg"
                  alt="Add People"
                  className="inline-block h-[60%] w-auto"
                />
              </div>
              <div
                onClick={() => {
                  setShareOpen((prev) => !prev);
                }}
                className="hover:cursor-pointer hover:bg-black transition-all h-8 w-8 mt-4 flex justify-center items-center bg-[#848484] rounded-full"
              >
                <img
                  src="/share_profile.svg"
                  alt="Share"
                  className="inline-block h-[60%] w-auto"
                />
              </div>
              <div className="hover:cursor-pointer hover:bg-black transition-all h-8 w-8 mt-4 flex justify-center items-center bg-[#848484] rounded-full">
                <img
                  src="/calendar_today_profile.svg"
                  alt="Schedule"
                  className="inline-block h-[60%] w-auto"
                />
              </div>
            </div>
            <div className="md:h-[5rem] h-[4.5rem]"></div>
            <div className="flex flex-col justify-between md:px-[30%] px-[5%] ">
              <div>
                <h1 className="text-center md:text-[2rem] text-[1.7rem] leading-7 md:leading-10 font-[700]">
                  {profileData ? profileData.userInfo.name : ""}
                </h1>
                <h3 className="text-center md:text-[1.3rem] text-[1.2rem] tracking-tight">
                  {profileData ? profileData.userInfo.position : ""}
                </h3>
                <h3 className="text-center text-[1.2rem]">
                  in{" "}
                  <span className="text-[#848484] font-[700] ">
                    {profileData ? profileData.userInfo.location : ""}
                  </span>
                </h3>
                <p className="text-center text-[0.8rem] font-[300] tracking-wider">
                  ({profileData ? profileData.userInfo.pronouns : ""})
                </p>
              </div>

              <div className="mt-4">
                <p className="text-center md:text-[0.9rem] text-[0.8rem] font-[500] tracking-tight">
                  {profileData ? profileData.userInfo.about : ""}
                </p>
                <div className="flex justify-center last:pr-0 mt-4">
                  <div className="inline-block pr-4">
                    <img
                      loading="lazy"
                      src="/person_add.svg"
                      alt="connections"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
                      {" "}
                      {profileData ? profileData.userInfo.connections : ""}
                    </span>
                  </div>
                  <div className="inline-block pr-4">
                    <img
                      loading="lazy"
                      src="/share.svg"
                      alt="shares"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
                      {" "}
                      {profileData ? profileData.userInfo.shares : ""}
                    </span>
                  </div>

                  <div className="inline-block">
                    <img
                      loading="lazy"
                      src="/calendar_month.svg"
                      alt="date joined"
                      className="h-[0.8rem] w-[0.8rem] inline-block"
                    />
                    <span className="md:text-[0.8rem] text-[0.7rem] text-[#848484]">
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
                <div className="md:text-[0.8rem] text-[0.7rem] text-[#848484] text-center">
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
                <div className="md:text-[0.8rem] text-[0.7rem] text-[#848484] text-center mb-4">
                  Work Preference:{" "}
                  <span className="font-[700]">
                    {profileData
                      ? profileData.userInfo.workPreference.map(
                          (item, index) => {
                            if (
                              index !=
                              profileData.userInfo.workPreference.length - 1
                            ) {
                              return <>{item}, </>;
                            } else return <>{item}</>;
                          }
                        )
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="h-[4rem]"></div> */}
          <div className="flex justify-center">
            <Button
              className=" p-4 bg-[#1B1B2D] leading-5 text-white border-2 border-transparent rounded-[6px] hover:text-[#1B1B2D] hover:bg-white hover:border-[#1B1B2D]"
              onClick={() => {
                router.push(
                  `https://${profileData ? profileData.name : null}.smortr.com`
                );
              }}
            >
              View Portfolio
            </Button>
          </div>
        </div>
        <div className="md:hidden block">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value.toString()}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginTop: "0.6rem",
                }}
              >
                <AntTabs
                  // sx={}
                  // variant="centered"
                  value={value}
                  onChange={handleChange}
                  aria-label="ant example"
                >
                  <AntTab label="Profile" />
                  <AntTab label="Bio" />
                  <AntTab label="Portfolio" />
                  <AntTab label="Skills" />
                  <AntTab label="Qualification" />
                </AntTabs>
              </Box>
              <TabPanel
                value="0"
                sx={{ padding: "0", paddingX: "0.5rem", paddingTop: "0.5rem" }}
              >
                {allData ? (
                  <Masonry columnsCount={2} gutter="0.7rem">
                    {allData.map((card, index) => {
                      if (card.type == "bio") {
                        let data: bio = card.cardData;
                        return <Bio key={index} cardData={card.cardData} />;
                      } else if (card.type == "certificationOrLicense") {
                        let data: certificationOrLicense = card.cardData;
                        return (
                          <CertificationOrLicense
                            key={index}
                            cardData={card.cardData}
                          />
                        );
                      } else if (card.type == "education") {
                        let data: education = card.cardData;
                        // console.log(data, "education");
                        return (
                          <Education key={index} cardData={card.cardData} />
                        );
                      } else if (card.type == "experience") {
                        let data: experience = card.cardData;
                        // console.log(data, "experience");
                        return (
                          <Experience key={index} cardData={card.cardData} />
                        );
                      } else if (card.type == "portfolio") {
                        let data: portfolio = card.cardData;
                        // console.log(data, "experience");
                        return null;
                        // return (
                        //   <Portfolio key={index} cardData={card.cardData} />
                        // );
                      }
                    })}
                  </Masonry>
                ) : null}
              </TabPanel>
              <TabPanel
                value="1"
                sx={{ padding: "0", paddingX: "0.5rem", paddingTop: "0.5rem" }}
              >
                <div className="grid gap-y-4">
                  {profileData
                    ? profileData.bio.map((cardData, index) => (
                        <>
                          <div
                            key={index}
                            className="shadow-[0_3px_50px_0px_rgba(0,0,0,0.1)] py-4 rounded-[1.13rem]"
                          >
                            <div className="text-[1rem] font-[700] px-4 py-4 text-left w-full">
                              {cardData.question}
                            </div>
                            <div className="h-[25vh] border-2 border-black w-full">
                              <img
                                src={cardData.filelink}
                                className="object-cover h-full w-full"
                                alt="some stuff"
                              />
                            </div>
                            <div className="flex justify-center items-center">
                              <div className="text-[0.9rem] px-4 pt-3 text-left w-full">
                                {cardData.caption}
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    : null}
                </div>
              </TabPanel>
              <TabPanel
                value="2"
                sx={{ padding: "0", paddingX: "0.5rem", paddingTop: "0.5rem" }}
              >
                {/* <div className="grid gap-y-4">
                  {profileData
                    ? profileData.portfolio.map((cardData, index) => {
                        return (
                          <>
                            <div
                              className={` hover:cursor-pointer border-2 relative border-black rounded-[0.88rem] overflow-clip shadow-[0_3px_50px_0_rgba(0,0,0,0.1)]`}
                            >
                              <div className="h-[25vh] relative">
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
                                
                              </div>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div> */}
              </TabPanel>
              <TabPanel
                value="3"
                sx={{ padding: "0", paddingX: "0.5rem", paddingTop: "0.5rem" }}
              >
                <div className="px-8">
                  {profileData
                    ? profileData.skills.map((skill, index) => {
                        return (
                          <>
                            <div
                              className="inline-block w-full mt-4"
                              key={index}
                            >
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
              </TabPanel>

              <TabPanel
                sx={{ padding: "0", paddingX: "0.5rem", paddingTop: "0.5rem" }}
                value="4"
              >
                <div className="flex justify-center">
                  <div className="inline-block border-[1px] border-[#848484] bg-[#FAFAFA] rounded-[0.56rem]">
                    <div
                      onClick={() => {
                        if (qualificationSelection != "education")
                          setQualificationSelection("education");
                      }}
                      className={`${
                        qualificationSelection == "education"
                          ? "font-[700] rounded-[0.56rem] border-[1px] border-[#D9D9D9]"
                          : "text-[#848484]"
                      } inline-block px-3 py-2  text-[0.7rem] transition-all ease-in-out`}
                    >
                      Education
                    </div>
                    <div
                      onClick={() => {
                        if (qualificationSelection != "experience")
                          setQualificationSelection("experience");
                      }}
                      className={`${
                        qualificationSelection == "experience"
                          ? "font-[700] rounded-[0.56rem] border-[1px] border-[#D9D9D9]"
                          : "text-[#848484]"
                      } inline-block px-3 py-2  text-[0.7rem] transition-all ease-in-out`}
                    >
                      Experience
                    </div>
                    <div
                      onClick={() => {
                        if (qualificationSelection != "certificationOrLicense")
                          setQualificationSelection("certificationOrLicense");
                      }}
                      className={`${
                        qualificationSelection == "certificationOrLicense"
                          ? "font-[700] rounded-[0.56rem] border-[1px] border-[#D9D9D9]"
                          : "text-[#848484]"
                      } inline-block px-3 py-2  text-[0.7rem] transition-all ease-in-out`}
                    >
                      Certification/License
                    </div>
                  </div>
                </div>
                <div className="grid gap-y-4 pt-4">
                  {displayQualificationData(qualificationSelection)}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <div className="px-16 pt-16 md:block hidden">
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
                      <div className="h-[35vh] border-2 border-black w-full">
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
                    </div>
                  </>
                ))
              : null}
          </div>
        </div>
        <div className="px-16 pt-8 mb-4 md:block hidden">
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

        <div className="px-16 pt-8 mb-4 md:block hidden">
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
                            src={education.image}
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
                            <span>
                              {new Date(education.startDate).getFullYear()}
                            </span>
                            {" - "}
                            {/* <span>{data.dates.endDate.getFullYear()}</span> */}
                            <span>
                              {new Date(education.endDate).getFullYear()}
                            </span>
                          </div>
                          <p className="text-left text-[1rem] text-[#848484] py-6">
                            {education.description}
                          </p>

                          <div className="flex flex-wrap">
                            {education.skills.map((name, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-block  relative group overflow-x-hidden border-[#479F70] leading-3 border-2  bg-white hover:border-2 hover:overflow-x-visible hover transition-all p-2 text-[0.75rem] font-[500] text-[#479F70] rounded-[6.25rem] mr-2 whitespace-nowrap mt-1"
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
        <div className="px-16 pt-8 mb-4 md:block hidden">
          <h3 className="text-[1.3rem] px-2 font-[700]">Experience</h3>
          <div className="grid gap-x-16 grid-cols-[1fr_1fr_1fr]">
            {profileData
              ? profileData.experience.map((experience, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        // ref={previewRef}
                        className={` mt-4 rounded-[18px] relative bg-white shadow-[0_4px__50px_0_rgba(0,0,0,0.05)]`}
                        // data-hadler-id={handlerId}
                      >
                        <div
                          className={`h-[35vh] rounded-t-[18px] z-[8] border-[0.06rem] border-black w-full  bg-[#FAFAFA]   overflow-clip`}
                          // onClick={() => {}}
                        >
                          <img
                            src={experience.image}
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
                            <span>
                              {new Date(experience.startDate).getFullYear()}
                            </span>
                            {" - "}
                            {/* <span>{data.dates.endDate.getFullYear()}</span> */}
                            <span>
                              {new Date(experience.endDate).getFullYear()}
                            </span>
                          </div>
                          <p className="text-left text-[1rem] text-[#848484] py-6">
                            {experience.description}
                          </p>

                          <div className="flex flex-wrap">
                            {experience.skills.map((name, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-block  relative group overflow-x-hidden border-[#479F70] leading-3 border-2  bg-white hover:border-2 hover:overflow-x-visible hover transition-all p-2 text-[0.75rem] font-[500] text-[#479F70] rounded-[6.25rem] mr-2 whitespace-nowrap mt-1"
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
        {profileData &&
        profileData.certificationOrLicense &&
        profileData.certificationOrLicense.length > 0 ? (
          <>
            <div className="px-16 pt-8 mb-4 md:block hidden">
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
                              onClick={() => {
                                router.push(certificationOrLicense.link);
                              }}
                              key={index}
                              className="hover:cursor-pointer inline-block w-full shadow-[0_4px__50px_0_rgba(0,0,0,0.05)] rounded-[0.88rem] mt-4"
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
                                    Valid till{" "}
                                    {fetchMonth(
                                      new Date(certificationOrLicense.date)
                                    )}{" "}
                                    {new Date(
                                      certificationOrLicense.date
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
        ) : null}
      </>
    );
  else null;
}

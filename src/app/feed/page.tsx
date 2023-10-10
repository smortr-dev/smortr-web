"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { MultiSelect } from "react-multi-select-component";
import { Option } from "react-multi-select-component";
const DesignSector: Option[] = [
  { label: "Carpentry", value: "Carpentry" },
  { label: "Microsoft Excel", value: "Microsoft Excel" },
  { label: "Illustrator", value: "Illustrator" },
  { label: "AutoCAD", value: "AutoCAD" },
  { label: "Rhino 3D", value: "Rhino 3D" },
];

type filter = {
  designSector: [string];
  typology: [string];
  skills: [string];
  location: [string];
  sortBy: string;
  searchType: string;
};

type bio = {
  user: string;
  question: string;
  mediaType: string;
  fileLink: string;
  caption: string;
  postDate: string;
};
type portfolio = {
  user: string;
  type: string;
  image: string;
  postDate: string;
};

type education = {
  user: string;
  image: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  skills: [string];
  school: string;
  postDate: string;
};

type experience = {
  user: string;
  image: string;
  place: string;
  description: string;
  startDate: string;
  position: string;
  endDate: string;
  company: string;
  skills: [string];
  postDate: string;
};

type certificationOrLicense = {
  userImg: string;
  user: string;
  type: string;
  from: string;
  validTill: string;
  id: string;
  link: string;
  postDate: string;
};

type Feed = {
  profile: {
    user: string;
    profileImg: string;
  };
  data: [
    {
      type:
        | "bio"
        | "certificationOrLicense"
        | "experience"
        | "education"
        | "portfolio";
      cardData:
        | certificationOrLicense
        | experience
        | education
        | portfolio
        | bio;
    }
  ];
};

async function getData() {
  // console.log("called");
  const res = await fetch(process.env.baseUrl + "/api/profile");
  const profileData: Feed = await res.json();
  // console.log(profileData);
  return profileData;
}
function convertToOptions(props: string[] | undefined): Option[] {
  if (!props) return [];
  let temp: Option[] = props.map((item): Option => {
    return { label: item, value: item };
  });
  return temp;
}
function convertToValues(props: Option[]): string[] {
  let temp: string[] = props.map((item): string => item.value);
  return temp;
}

export default function Feed() {
  const [presentedData, setPresentedData] = useState<Feed>();
  const [apiData, setApiData] = useState<Feed>();
  const [filters, setFilters] = useState<filter>();
  useEffect(() => {
    async function fetchData() {
      const feedData: Feed = await getData();
      setApiData(feedData);
      console.log(feedData, "feedData");
    }
    fetchData();
  });

  return (
    <>
      <div className="mx-16">
        <Header />
        <div className="flex ">
          <MultiSelect
            hasSelectAll={false}
            labelledBy="Design Sector"
            options={DesignSector}
            // value={field.value ? field.value : []}
            value={convertToOptions(filters?.designSector)}
            // control={form.control}
            onChange={(props: Option[]) => {
              // console.log(
              //   fieldState.error
              // );
            }}
          />
        </div>
      </div>
    </>
  );
}

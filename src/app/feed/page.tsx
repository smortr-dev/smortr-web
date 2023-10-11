/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { MultiSelect } from "react-multi-select-component";
import { Option } from "react-multi-select-component";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerAlt,
  SelectTriggerSort,
  SelectValue,
} from "@/components/ui/select";
const DesignSector: Option[] = [
  { label: "Carpentry", value: "Carpentry" },
  { label: "Microsoft Excel", value: "Microsoft Excel" },
  { label: "Illustrator", value: "Illustrator" },
  { label: "AutoCAD", value: "AutoCAD" },
  { label: "Rhino 3D", value: "Rhino 3D" },
];

type filter = {
  designSector?: string[];
  typology?: string[];
  skills?: string[];
  location?: string[];
  sortBy?: string;
  searchType?: string;
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
  title: string;
  description: string;
  postDate: string;
};

type education = {
  user: string;
  image: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  skills: string[];
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
  skills: string[];
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
  const res = await fetch("/api/feed");
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
  const defaultFilter: filter = {
    designSector: [],
    typology: [],
    skills: [],
    location: [],
    sortBy: "Latest",
    searchType: "All Content",
  };
  const [presentedData, setPresentedData] = useState<Feed>();
  const [apiData, setApiData] = useState<Feed>();
  const [filters, setFilters] = useState<filter>(defaultFilter);
  useEffect(() => {
    async function fetchData() {
      const feedData: Feed = await getData();
      setApiData(feedData);
      console.log(feedData, "feedData");
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-16">
        <Header />
        <div className="w-full relative rounded-[6.25rem] flex border-[0.06rem] border-black justify-stretch">
          <div className="inline-block w-[90%] h-full">
            <div className="w-full flex">
              <img
                src="/feed_search_bar.svg"
                className="inline-block p-3 h-12 w-12"
                alt="feed-search-logo"
              />
            </div>
          </div>
          <div className="relative w-[10%] border-black border-l-[0.06rem] flex items-center justify-center">
            {/* <Select
              onValueChange={(props) => {
                setFilters((prev) => {
                  let returnValue: filter = { ...prev, searchType: props };
                  return returnValue;
                });
              }}
              defaultValue={filters.searchType}
            >
              <SelectTrigger
                className={` border-transparent text-black w-full`}
              >
                <SelectValue
                  placeholder="Select your location"
                  className="text-[1rem] font-[500] visible border-2 border-black w-full"
                />
              </SelectTrigger>
              <SelectContent className="hover:opacity-1 bg-white">
                <SelectItem
                  value="United States"
                  className="bg-white text-[1rem] "
                >
                  United States
                </SelectItem>
                <SelectItem value="India" className="bg-white text-[1rem] ">
                  India
                </SelectItem>
                <SelectItem
                  value="m@support.com"
                  className="bg-white  text-[1rem] "
                >
                  m@support.com
                </SelectItem>
              </SelectContent>
            </Select> */}
            <Select
              onValueChange={(props) => {
                setFilters((prev) => {
                  let returnValue: filter = { ...prev, searchType: props };
                  console.log(returnValue);
                  return returnValue;
                });
              }}
              defaultValue={filters.searchType}
            >
              <SelectTriggerAlt className="text-[#848484] text-[1rem] border-transparent">
                <SelectValue placeholder="Select a fruit" className="" />
              </SelectTriggerAlt>
              <SelectContent className="border-transparent">
                {/* <SelectGroup> */}
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="All Content">All Content</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
                {/* </SelectGroup> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex py-6 justify-between">
          <div className="flex min-w-[80%]">
            <MultiSelect
              className="w-[20%] inline-block mr-4"
              overrideStrings={{ selectSomeItems: "Design Sector" }}
              hasSelectAll={false}
              labelledBy="Design Sector"
              options={DesignSector}
              // value={field.value ? field.value : []}
              value={convertToOptions(filters?.designSector)}
              // control={form.control}
              onChange={(props: Option[]) => {
                setFilters((prev: filter | undefined) => {
                  let returnValue: filter = {
                    ...prev,
                    designSector: convertToValues(props),
                  };
                  return returnValue;
                });
              }}
            />
            <MultiSelect
              className="w-[15%] mr-4"
              overrideStrings={{ selectSomeItems: "Topology" }}
              hasSelectAll={false}
              labelledBy="Design Sector"
              options={DesignSector}
              // value={field.value ? field.value : []}
              value={convertToOptions(filters?.designSector)}
              // control={form.control}
              onChange={(props: Option[]) => {
                setFilters((prev: filter | undefined) => {
                  let returnValue: filter = {
                    ...prev,
                    typology: convertToValues(props),
                  };
                  return returnValue;
                });
              }}
            />
            <MultiSelect
              className="w-[15%] mr-4"
              overrideStrings={{ selectSomeItems: "Skills" }}
              hasSelectAll={false}
              labelledBy="Design Sector"
              options={DesignSector}
              // value={field.value ? field.value : []}
              value={convertToOptions(filters?.designSector)}
              // control={form.control}
              onChange={(props: Option[]) => {
                setFilters((prev: filter | undefined) => {
                  let returnValue: filter = {
                    ...prev,
                    typology: convertToValues(props),
                  };
                  return returnValue;
                });
              }}
            />
            <MultiSelect
              className="w-[15%] mr-4"
              overrideStrings={{ selectSomeItems: "Location" }}
              hasSelectAll={false}
              labelledBy="Design Sector"
              options={DesignSector}
              // value={field.value ? field.value : []}
              value={convertToOptions(filters?.designSector)}
              // control={form.control}
              onChange={(props: Option[]) => {
                setFilters((prev: filter | undefined) => {
                  let returnValue: filter = {
                    ...prev,
                    typology: convertToValues(props),
                  };
                  return returnValue;
                });
              }}
            />
          </div>
          <div className="">
            <div className="text-[0.75rem] text-[#848484] font-[400]">
              Sort By
            </div>
            <Select
              onValueChange={(props) => {
                setFilters((prev) => {
                  let returnValue: filter = { ...prev, sortBy: props };
                  console.log(returnValue);
                  return returnValue;
                });
              }}
              defaultValue={filters.sortBy}
            >
              <SelectTriggerSort className="text-[#848484] text-[1rem] font-[400] p-0 border-transparent">
                <SelectValue placeholder="Select a fruit" className="p-2" />
              </SelectTriggerSort>
              <SelectContent className="border-transparent">
                {/* <SelectGroup> */}
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
                {/* </SelectGroup> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
          
          <FormControl>
            <SelectTrigger
              className={`${
                field.value ? "text-black" : "text-[#848484]"
              } rounded-[0.38rem] w-full border-[1px]  ${
                fieldState.error ? "border-[#CC3057]" : "  border-[#848484]"
              }`}
            >
              <SelectValue
                placeholder="Select your location"
                className="text-[1rem] font-[500] "
              />
            </SelectTrigger>
          </FormControl>
          <FormMessage className="text-xs text-[#CC3057]" />
          <SelectContent className="hover:opacity-1 bg-white">
            <SelectItem value="United States" className="bg-white text-[1rem] ">
              United States
            </SelectItem>
            <SelectItem value="India" className="bg-white text-[1rem] ">
              India
            </SelectItem>
            <SelectItem
              value="m@support.com"
              className="bg-white  text-[1rem] "
            >
              m@support.com
            </SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </>
  );
}

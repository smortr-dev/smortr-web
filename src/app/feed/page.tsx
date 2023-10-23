/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { MultiSelect } from "react-multi-select-component";
// import  from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { InputFeed } from "@/components/ui/input";
import { Option } from "react-multi-select-component";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerAlt,
  SelectTriggerSort,
  SelectValue,
} from "@/components/ui/select";
import Bio from "./Bio";
import { type } from "os";
import CertificationOrLicense from "./CertificationOrLicense";
import Education from "./Education";
import Experience from "./Experience";
import Portfolio from "./Portfolio";
import { tr } from "date-fns/locale";
import { boolean } from "zod";
// import { Option } from "lucide-react";

function optionCreator(array: string[]) {
  return array.map((item) => {
    let returnValue: Option = { label: item, value: item };
    return returnValue;
  });
}

// const;

const Typology: Option[] = optionCreator([
  "Transport Corridors",
  "3D Modelling",
  "Textile Accessory",
  "Data Analysis",
  "Chair",
  "Public Space",
  "Speculative Architecture",
  "Cafe",
  "Infrastructure",
  "Architect",
  "Instructor",
  "Apartment",
  "Augmented Reality",
  "Masterplan",
  "Stadium",
  "House",
  "Retail",
  "Restaurant",
  "Gymnasium",
  "Hospital",
  "School",
  "Theater",
  "Administration Buildings",
  "Temple",
  "Factory",
  "Bridges",
  "Greenways",
  "Layout",
]);

const Location: Option[] = optionCreator([
  // "Chennai",
  "Dubai",
  // "New Delhi",
  "Seattle",
  "Netherlands",
]);

const DesignSector: Option[] = optionCreator([
  "All Design Sectors",
  "Architecture",
  "Interior Design",
  "Urban Design",
  "Landscape Design",
  "Construction Technology",
  "Infrastructure",
  "Services",
  "Visualization",
  "Concept Design",
  "Art",
  "Furniture Design",
  "Product Design",
  "Urban Planning",
]);

// const
const Skills: Option[] = optionCreator([
  "Drafting",
  "Modelling",
  "AutoCAD",
  "Rhino",
  "Grasshopper",
  "3DSMax",
  "Photoshop",
  "Illustrator",
  "LightRoom",
  "InDesign",
  "AfterEffects",
  "Estimation",
  "Budgeting",
  "Computer-Aided Design (CAD)",
  "Revit",
  "Physical Model making",
  "Hand-sketching",
  "Conceptualization",
  "Moodboarding",
  "Calculations",
  "Estimating",
  "Budgeting",
  "Converting Scale from Blueprints",
  "Specifications",
  "Analytical Skills",
  "Creative Thinking",
  "Design Concepts",
  "Design to Delivery",
  "Drafting",
  "Drawing",
  "Imagination",
  "Industrial Design",
  "Innovation",
  "Architectural Rendering",
  "AutoCAD",

  "Computer Processing",
  "Model Making",
  "Revit",

  "Data Analysis",
  "Business Plans",
  "Scheduling",
  "Project Management",
  "Market Research",
  "Architectural Codes",
  "Zoning Codes",
  "Fire Safety",
  "Building Codes",
  "Building Construction",
  "Building Systems",
  "Planning",
  "Abstraction",
  "Construction Administration",
  "Construction Documents",
  "Managing Expectations",
  "Bilingual",
  "Corporate",
  "Critical Thinking",
  "Development",
  "Documents",
  "Installation",
  "Integration",
  "Leadership in Energy & Environmental Design (LEED)",
  "Preservation",
  "Problem Solving",
  "Restoration",
  "Renovation",
  "Residential Construction",
  "Retail Construction",
  "Slicing",
  "Sustainable Design",
  "Technical Vision",
  "Visualization",
  "Compliance",
  "Building Contracts",
  "Database Management",
  "Customer Service",
  "Walkthrough",
  "Mapping",
  "QGIS",
  "Diagramming",
  "Dissertation",
  "Unity",
]);
type filter = {
  searchString?: string;
  city?: string[];
  country?: string[];
  designSector?: string;
  typology?: string[];
  skills?: string[];
  location?: string[];
  sortBy?: string;
  searchType?: string;
};

type bio = {
  userLink: string;
  user: string;
  question: string;
  mediaType: string;
  filelink: string;
  caption: string;
  postDate: string;
};
type portfolio = {
  userLink: string;
  designSector: string;
  typology: string;
  scopeRole: string;
  location: string;
  year: string;
  user: string;
  type: string;
  image: string;
  title: string;
  description: string;
  postDate: string;
};

type education = {
  userLink: string;
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
  userLink: string;
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

type Feed = {
  profile: {
    user: string;
    profileImg: string;
  };
  data: data;
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
    designSector: undefined,
    searchString: undefined,
    typology: [],
    skills: [],
    location: [],
    sortBy: "Latest",
    searchType: "All Content",
  };
  const [presentedData, setPresentedData] = useState<data>();
  const [apiData, setApiData] = useState<Feed>();
  const [filters, setFilters] = useState<filter>(defaultFilter);

  function filterData(filter: filter, apiData: Feed | undefined) {
    // console.log(filter, "filter called");
    let initialData: data | undefined = apiData?.data;

    if (filter.searchType) {
      // console.log("search type");
      initialData = initialData?.filter((data) => {
        if (filter.searchType == "Bio") {
          if (data.type == "bio") return true;
          else return false;
        } else if (filter.searchType == "Projects") {
          if (data.type == "portfolio") return true;
          else return false;
        } else if (filter.searchType == "Education") {
          if (data.type == "education") return true;
          else return false;
        } else if (filter.searchType == "Experience") {
          if (data.type == "experience") return true;
          else return false;
        } else if (filter.searchType == "Certification") {
          if (data.type == "certificationOrLicense") return true;
          else return false;
        } else return true;
      });
    }

    if (filter.searchString && filter.searchString.length > 0) {
      // console.log("search string");
      initialData = initialData?.filter((data) => {
        if (data.type == "bio" && filter.searchString) {
          if (
            data.cardData.question
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.caption
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else return false;
        } else if (data.type == "education" && filter.searchString) {
          for (let i = 0; i < data.cardData.skills.length; i++) {
            if (
              data.cardData.skills[i]
                .toLocaleLowerCase()
                .match(filter.searchString.toLocaleLowerCase())
            )
              return true;
          }
          if (
            data.cardData.school
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.degree
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.description
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else return false;
        } else if (data.type == "experience" && filter.searchString) {
          for (let i = 0; i < data.cardData.skills.length; i++) {
            if (
              data.cardData.skills[i]
                .toLocaleLowerCase()
                .match(filter.searchString.toLocaleLowerCase())
            )
              return true;
          }
          if (
            data.cardData.place
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.company
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.position
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.position
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.description
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else return false;
        } else if (
          data.type == "certificationOrLicense" &&
          filter.searchString
        ) {
          if (
            data.cardData.type
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.from
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else return false;
        } else if (data.type == "portfolio" && filter.searchString) {
          if (
            data.cardData.designSector
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.description
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.typology
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.location
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.title
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else if (
            data.cardData.scopeRole
              .toLocaleLowerCase()
              .match(filter.searchString.toLocaleLowerCase())
          )
            return true;
          else return false;
        }
      });
    }
    if (
      filter.designSector &&
      filter.designSector.length > 0 &&
      filter.designSector != "All Design Sectors"
    ) {
      // console.log("design sector");
      initialData = initialData?.filter((data) => {
        if (data.type == "portfolio") {
          if (data.cardData.designSector == filter.designSector) return true;
          else return false;
        } else return false;
      });
    }

    if (filter.typology && filter.typology.length > 0) {
      initialData = initialData?.filter((data) => {
        if (data.type == "portfolio" && filter.typology) {
          for (let i = 0; i < filter?.typology.length; i++) {
            if (data.cardData.typology == filter.typology[i]) {
              return true;
            }
          }
        } else return false;
      });
    }

    if (filter.location && filter.location.length > 0) {
      initialData = initialData?.filter((data) => {
        // console.log(data.cardData);
        if (data.type == "portfolio" && filter.location) {
          for (let i = 0; i < filter?.location.length; i++) {
            if (data.cardData.location == filter.location[i]) {
              return true;
            }
          }
        } else return false;
      });
    }

    // console.log(filter.skills, "skills");
    if (filter.skills && filter.skills.length > 0) {
      // console.log("skills");
      initialData = initialData?.filter((data) => {
        // console.log(data);
        if (data.type == "education" && filter.skills) {
          for (let i = 0; i < filter.skills.length; i++) {
            for (let j = 0; j < data.cardData.skills.length; j++) {
              if (filter.skills[i] == data.cardData.skills[j]) {
                // console.log(filter.skills[i], data.cardData.skills[j]);
                return true;
              }
            }
          }
        }
        if (data.type == "experience" && filter.skills) {
          // console.log("experience", filter.skills.length, Skills.length);
          for (let i = 0; i < filter.skills.length; i++) {
            for (let j = 0; j < data.cardData.skills.length; j++) {
              if (filter.skills[i] == data.cardData.skills[j]) {
                // console.log(filter.skills[i], data.cardData.skills[j]);
                return true;
              }
            }
          }
        } else return false;
      });
    }
    // console.log(initialData, "initial data before sort");
    // function groupBy2(xs: data) {
    //   var grouped = {};
    //   for (var i = 0; i < xs.length; i++) {
    //     var p = xs[i]["cardData"].postDate;

    //     if (grouped["hello"] != undefined) {
    //       grouped[p] = [];
    //     }
    //     grouped[p].push(xs[i]);
    //   }
    //   return grouped;
    // }

    if (filter.sortBy == "Latest") {
      initialData = initialData?.sort((a: dataTypes, b: dataTypes) => {
        // console.log(
        //   new Date(a.cardData.postDate),
        //   new Date(b.cardData.postDate)
        // );
        // console.log("filter");
        if (new Date(a.cardData.postDate) > new Date(b.cardData.postDate)) {
          // console.log(-1);
          return -1;
        } else if (
          new Date(a.cardData.postDate) < new Date(b.cardData.postDate)
        ) {
          // console.log(1);
          return 1;
        } else {
          let num: number = Math.floor(Math.random() * 2);
          let arr = [-1, 1];
          return arr[num];
        }
      });
    } else if (filter.sortBy == "Oldest") {
      initialData = initialData?.sort((a: dataTypes, b: dataTypes) => {
        // console.log(
        //   new Date(a.cardData.postDate),
        //   new Date(b.cardData.postDate)
        // );
        // console.log("filter");
        if (new Date(a.cardData.postDate) > new Date(b.cardData.postDate)) {
          // console.log(-1);
          return 1;
        } else if (
          new Date(a.cardData.postDate) < new Date(b.cardData.postDate)
        ) {
          // console.log(1);
          return -1;
        } else {
          let num: number = Math.floor(Math.random() * 2);
          let arr = [-1, 1];
          return arr[num];
        }
      });
    }
    console.log(initialData, "initial data after sort");
    return initialData;
  }
  useEffect(() => {
    async function fetchData() {
      const feedData: Feed = await getData();
      setApiData(feedData);
      setPresentedData(filterData(filters, feedData));
      // console.log(feedData, "feedData");
    }
    fetchData();
    // setPresentedData(filterData(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (presentedData && filters) {
    // console.log(presentedData, "change");
    return (
      <>
        <div className="mx-16 mb-4">
          <Header />
          <div className="w-full relative rounded-[6.25rem] flex border-[0.06rem] border-black justify-stretch">
            <div className="inline-block w-[90%] h-full">
              <div className="w-full flex">
                <img
                  src="/feed_search_bar.svg"
                  className="inline-block p-3 h-12 w-12"
                  alt="feed-search-logo"
                />

                <InputFeed
                  className="inline-block"
                  placeholder="Describe what you are searching for..."
                  defaultValue={filters.searchString}
                  onChange={(event) => {
                    let filter = {
                      ...filterData,
                      searchString: event.target.value,
                    };
                    setFilters((prev) => {
                      // console.log(event.target.value);
                      return { ...prev, searchString: event.target.value };
                    });
                    setPresentedData(filterData(filter, apiData));
                  }}
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
                  let returnValue: filter = { ...filters, searchType: props };
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev) => {
                    let returnValue: filter = { ...prev, searchType: props };
                    // console.log(returnValue);
                    return returnValue;
                  });
                  filterData(filters, apiData);
                }}
                defaultValue={filters.searchType}
              >
                <SelectTrigger className="text-[#848484] text-[1rem] border-transparent">
                  <SelectValue placeholder="Design Sector" className="" />
                </SelectTrigger>
                <SelectContent className="border-transparent">
                  {/* <SelectGroup> */}
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="All Content">All Content</SelectItem>
                  <SelectItem value="Projects">Projects</SelectItem>
                  <SelectItem value="Bio">Bio</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Experience">Experience</SelectItem>
                  <SelectItem value="Certification">Certification</SelectItem>
                  {/* </SelectGroup> */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex py-6 justify-between">
            <div className="flex min-w-[80%]">
              {/* <MultiSelect
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
              /> */}

              <MultiSelect
                className="w-[15%] mr-4"
                overrideStrings={{ selectSomeItems: "Typology" }}
                hasSelectAll={false}
                labelledBy="Design Sector"
                options={Typology}
                // value={field.value ? field.value : []}
                value={convertToOptions(filters?.typology)}
                // control={form.control}
                onChange={(props: Option[]) => {
                  let returnValue: filter = {
                    ...filters,
                    typology: convertToValues(props),
                  };
                  // console.log(returnValue, "return value");
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev: filter | undefined) => {
                    let returnValue: filter = {
                      ...prev,
                      typology: convertToValues(props),
                    };
                    return returnValue;
                  });
                }}
              />
              <Select
                onValueChange={(props) => {
                  let returnValue: filter = { ...filters, designSector: props };
                  // console.log(returnValue, "return value");
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev) => {
                    let returnValue: filter = { ...prev, designSector: props };
                    // console.log(returnValue);
                    return returnValue;
                  });
                  filterData(filters, apiData);
                }}
                defaultValue={filters.designSector}
              >
                <SelectTrigger className="text-[#AAAAAA] border-[#ccc] bg-white text-[1rem]  w-[20%] mr-4">
                  <SelectValue placeholder="Design Sector" className="" />
                </SelectTrigger>
                <SelectContent className="border-transparent">
                  {/* <SelectGroup> */}
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {convertToValues(DesignSector).map((item, index) => {
                    return (
                      <>
                        <SelectItem key={index} value={`${item}`}>
                          {item}
                        </SelectItem>
                      </>
                    );
                  })}
                  {/* </SelectGroup> */}
                </SelectContent>
              </Select>
              <MultiSelect
                className="w-[15%] mr-4"
                overrideStrings={{ selectSomeItems: "Skills" }}
                hasSelectAll={false}
                labelledBy="Design Sector"
                options={Skills}
                // value={field.value ? field.value : []}
                value={convertToOptions(filters?.skills)}
                // control={form.control}
                onChange={(props: Option[]) => {
                  let returnValue: filter = {
                    ...filters,
                    skills: convertToValues(props),
                  };
                  // console.log(returnValue, "return value");
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev: filter | undefined) => {
                    let returnValue: filter = {
                      ...prev,
                      skills: convertToValues(props),
                    };
                    return returnValue;
                  });
                }}
              />
              <MultiSelect
                className="w-[15%] mr-4"
                overrideStrings={{ selectSomeItems: "Location" }}
                hasSelectAll={false}
                labelledBy="Location"
                options={Location}
                // value={field.value ? field.value : []}
                value={convertToOptions(filters?.location)}
                // control={form.control}
                onChange={(props: Option[]) => {
                  let returnValue: filter = {
                    ...filters,
                    location: convertToValues(props),
                  };
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev: filter | undefined) => {
                    let returnValue: filter = {
                      ...prev,
                      location: convertToValues(props),
                    };
                    return returnValue;
                  });
                  filterData(filters, apiData);
                }}
              />
            </div>
            <div className="">
              <div className="text-[0.75rem] text-[#848484] font-[400]">
                Sort By
              </div>
              <Select
                onValueChange={(props) => {
                  let returnValue: filter = { ...filters, sortBy: props };
                  setPresentedData(filterData(returnValue, apiData));
                  setFilters((prev) => {
                    let returnValue: filter = { ...prev, sortBy: props };
                    // console.log(returnValue);
                    return returnValue;
                  });
                  filterData(filters, apiData);
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
                  <SelectItem value="Oldest">Oldest</SelectItem>
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
          {/* <div className="grid grid-cols-3 gap-x-6 grid-flow-row">
            {apiData?.data.map((card, index) => {
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
                return <Education key={index} cardData={card.cardData} />;
              } else if (card.type == "experience") {
                let data: experience = card.cardData;
                return <Experience key={index} cardData={card.cardData} />;
              } else if (card.type == "portfolio") {
                let data: portfolio = card.cardData;
                return <Portfolio key={index} cardData={card.cardData} />;
              }
            })}
          </div> */}
          <Masonry columnsCount={3} gutter="2rem">
            {presentedData.map((card, index) => {
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
                return <Education key={index} cardData={card.cardData} />;
              } else if (card.type == "experience") {
                let data: experience = card.cardData;
                // console.log(data, "experience");
                return <Experience key={index} cardData={card.cardData} />;
              } else if (card.type == "portfolio") {
                let data: portfolio = card.cardData;
                // console.log(data, "experience");
                return <Portfolio key={index} cardData={card.cardData} />;
              }
            })}
          </Masonry>
        </div>
      </>
    );
  } else null;
}

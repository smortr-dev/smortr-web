import { redirect } from 'next/navigation';
type Profile = {
  name:string;
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
import fsPromises from 'fs/promises';
// import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import path from 'path'
export async function GET() {
    // Get the path of the json file
    const filePath = path.join(process.cwd(), 'json/profile.json');
    // Read the json file
    const jsonData = await fsPromises.readFile(filePath);
    // Parse data as json
    const objectData = JSON.parse(jsonData.toString());

    

    // console.log(objectData)
    // return objectData
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const data = await res.json()
   
    // return Response.json({ data })
    // return Response.json({...objectData})
    return NextResponse.json({...objectData})
  }

  export async function POST(req:Request) {
    const body:{name:string} = await req.json()
    
    const name = body.name;
    // console.log(name);
    // Get the path of the json file
    const filePath = path.join(process.cwd(), 'json/profile.json');
    // Read the json file
    const jsonData = await fsPromises.readFile(filePath);
    // Parse data as json
    const objectData = JSON.parse(jsonData.toString());

    const user = objectData.find((user:any)=> user.name == name)
    // console.log(user)
    if(user)
      return NextResponse.json({...user})
    else 
      redirect("/feed")
  }
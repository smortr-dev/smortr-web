import fsPromises from 'fs/promises';
// import { redirect } from 'next/navigation';
// import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import path from 'path'
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
type MetaData = {
    name:string;
    description:string;
}
export async function POST(req:Request) {
    console.log("function called")
    const body = await req.json()
    console.log(body,"body recieved")
    const name = body.name;
    // console.log(name,"server");
    // Get the path of the json file
    const filePath = path.join(process.cwd(), 'json/profile.json');
    // Read the json file
    const jsonData = await fsPromises.readFile(filePath);
    // Parse data as json
    const objectData = JSON.parse(jsonData.toString());

    const user:Profile = objectData.find((user:Profile)=> user.name.toLocaleLowerCase() == name.toLocaleLowerCase())
    
    if(user)
      return NextResponse.json({name:user.userInfo.name,description:user.userInfo.position})
    else 
        return NextResponse.json({name:"test",description:"test"})
  }
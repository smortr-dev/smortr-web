import fsPromises from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path'
export async function GET() {
    // Get the path of the json file
    const filePath = path.join(process.cwd(), 'json/feed.json');
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
    return NextResponse.json({...objectData})
    // return Response.json({...objectData})
  }
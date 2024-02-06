import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { redirect } from "next/navigation"
require("dotenv").config()
import sgMail from "@sendgrid/mail"
// import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body: { path: string } = await req.json()

    const path = body.path
    console.log(process.env.TWILIO_API_KEY)
    const TWILIO_API_KEY = process.env.TWILIO_API_KEY || ""
    sgMail.setApiKey(TWILIO_API_KEY)
    const msg = {
      to: "smortrportfolios@gmail.com",
      from: "rookie26092003@gmail.com",
      subject: "New User Project Regenerate",
      text: path,
    }
    await sgMail.send(msg)
    console.log("mail sent")
    return NextResponse.json({})
    // console.log(name);
    // Get the path of the json file
  } catch (err) {
    console.log(err)
  }
  return NextResponse.json({})
  // console.log(user)
  //   if (user) return NextResponse.json({ ...user })
}

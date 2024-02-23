// "use client"
import "../globals.css"
// import { Metadata } from "next";
// import { Metadata } from "next";
// import { ResolvingMetadata } from "next";
// import { Inter } from "next/font/google";
// import Head from "next/head";
// import  from "./Form";
// import { HubspotProvider } from "next-hubspot";
// const inter = Inter({ subsets: ["latin"] });
import Script from "next/script"
// export const metadata: Metadata = {
//   title: "Smortr",
//   description: "We're Building Smortr",
// };

import type { Metadata, ResolvingMetadata } from "next"
import { UserAuth } from "../context/AuthContext"
import { storage } from "@/lib/firebase"
import { getDownloadURL, ref } from "firebase/storage"
// import { profile } from "console";
import { Toaster } from "@/components/ui/toaster"
type Props = {
  params: { name: string }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.name;
//   console.log(params.name, "name");
//   console.log(JSON.stringify({ name: params.name }));
//   console.log(process.env.BASE_URL); // fetch data
//   const product = await fetch(`${process.env.BASE_URL}/api/profileMeta`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({ name: params.name }),
//   }).then((res) => res.json());
//   console.log(product);
//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.name,
//     description: product.description,
//   };
// }

// type Props = {
//   params: { name: string };
// };

// type MetadataType = {
//   name: string;
//   description: string;
// };
// export async function generateMetadata({ params }: Props, parent?: any) {
//   const id = params.name;
//   console.log(params.name,"called");
//   const res = await fetch(`${process.env.BASE_URL}/api/profileMeta`, {
//     method: "POST",
//     body: JSON.stringify({ name: params.name }),
//   });
//   const meta: MetadataType = await res.json();
//   // console.log(meta);
//   return {
//     title: meta.name,
//     description: meta.description,
//     // keywords: blog.keywords,
//   };
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { current } = UserAuth()

  // const res = await fetch("/api/profile-editor", {
  //   cache: "no-store",
  //   next: { revalidate: 0 },
  //   method: "POST",
  //   body: JSON.stringify({ uid: current }),
  // })
  // let data = await res.json()

  // await Promise.all(
  //   data?.projects?.map(async (project: any, index: number) => {
  //     if (project.cover) {
  //       const storageRef = ref(storage, project.cover)
  //       try {
  //         const res = await getDownloadURL(storageRef)
  //         // console.log(res, project)
  //         const image = new Image()
  //         image.src = res
  //         await image.decode()
  //         data.projects[index] = {
  //           ...data.projects[index],
  //           coverLink: res,
  //           aspectRatio: image.width / image.height,
  //         }
  //         URL.revokeObjectURL(image.src)
  //       } catch (err) {
  //         console.log(err, "asset", index, "not found")
  //       }

  //       // data.projects[index].coverLink = res
  //     }
  //   }),
  // )
  // .then((res) => res.json())
  // .then(async (data) => {
  //   console.log(data, "data")
  //   // console.log(data, "data")
  //   // if()
  //   await Promise.all(
  //     data?.projects?.map(async (project: any, index: number) => {
  //       if (project.cover) {
  //         const storageRef = ref(storage, project.cover)
  //         try {
  //           const res = await getDownloadURL(storageRef)
  //           // console.log(res, project)
  //           const image = new Image()
  //           image.src = res
  //           await image.decode()
  //           data.projects[index] = {
  //             ...data.projects[index],
  //             coverLink: res,
  //             aspectRatio: image.width / image.height,
  //           }
  //           URL.revokeObjectURL(image.src)
  //         } catch (err) {
  //           console.log(err, "asset", index, "not found")
  //         }

  //         // data.projects[index].coverLink = res
  //       }
  //     }),
  //   )
  //   // console.log(data.projects, "projectData")
  //   setProfileData(data)
  //   if (!imageUrl && data.image) {
  //     setImageUrl(data.image)
  //   }
  //   if (!backgroundUrl && data.background) {
  //     setBackgroundUrl(data.background)
  //   }
  //   // var c: userInfo
  //   if (data.name) {
  //     setName(data.name)
  //     // console.log("name", data.name)
  //     form.setValue("name", data.name)
  //   }
  //   if (data.location) {
  //     form.setValue("location", data.location)
  //   }
  //   if (data.language) {
  //     form.setValue("language", data.language)
  //     // console.log("language", data.language)
  //   }
  //   if (data.pronouns) {
  //     form.setValue("pronouns", data.pronouns)
  //   }

  //   if (data.profession) {
  //     form.setValue("profession", data.profession)
  //   }

  //   if (data.position) {
  //     form.setValue("profession", data.position)
  //   }
  //   if (data.workPreference) {
  //     // console.log("workPreference", data.workPreference)

  //     form.setValue("workPreference", data.workPreference)
  //   }
  //   if (data.status) {
  //     form.setValue("status", data.status)
  //   }

  //   // console.log(data);
  //   setLoad(false)
  // })
  // .catch((error) => {
  //   // console.log(error)
  // })

  return (
    // <html lang="en">
    //   <link rel="shortcut icon apple-icon" href="/images/favicon.ico" />
    //   {/* <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
    //   <Script id="google-analytics">
    //     {`
    //       window.dataLayer = window.dataLayer || [];
    //       function gtag(){dataLayer.push(arguments);}
    //       gtag('js', new Date());

    //       gtag('config', 'GA_MEASUREMENT_ID');
    //     `}
    //   </Script> */}
    //   <Script id="google-analytics">
    //     {`
    //       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //       })(window,document,'script','dataLayer','GTM-NP8L3ZG5');
    //     `}
    //   </Script>
    //   <head>
    //     <noscript>
    //       <iframe
    //         src="https://www.googletagmanager.com/ns.html?id=GTM-NP8L3ZG5"
    //         height="0"
    //         width="0"
    //         style={{ display: "none", visibility: "hidden" }}
    //       ></iframe>
    //     </noscript>
    //   </head>

    //   <body className={`${inter.className} bg-[#FAFAFA] fafafa`}>

    <body>
      {children}
      <Toaster />
    </body>
    // </html>

    //   {/* </body>
    // </html> */}
  )
}

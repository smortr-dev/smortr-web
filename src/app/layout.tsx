import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Head from "next/head"
// import  from "./Form";
// import {}
import { GoogleTagManager } from "@next/third-parties/google"
import { HubspotProvider } from "next-hubspot"
const inter = Inter({ subsets: ["latin"] })
import Script from "next/script"
import { AuthContextProvider } from "./context/AuthContext"
import { HeaderContextProvider } from "./context/HeaderContext"
export const metadata: Metadata = {
  title: "Smortr",
  description: "We're Building Smortr",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon apple-icon" href="/images/favicon.ico" />
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script> */}
      {/* <Script id="google-analytics">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NP8L3ZG5');
        `}
      </Script>
      <Script id="google-tags-load"></Script> */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MR4MYT001T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MR4MYT001T');
        `}
      </Script> */}

      {/* <head>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP8L3ZG5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </head> */}

      <body className={`${inter.className} bg-[#FAFAFA] fafafa`}>
        <HeaderContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </HeaderContextProvider>
      </body>
      <GoogleTagManager gtmId="GTM-NP8L3ZG5" />
    </html>
  )
}

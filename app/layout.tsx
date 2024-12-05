import { DM_Sans, DM_Mono, Inter, IBM_Plex_Sans, DM_Serif_Display } from "next/font/google";
import type { Metadata } from "next";
import Head from 'next/head'
import Footer from "./components/Footer";
// import localFont from "next/font/local";
import "./globals.css";

const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["700"],
  style: ["normal"],
  variable: "--font-ibmplexsans",
  subsets: ["latin"],
  display: "swap",
 });
 
 
 const ibm_plex_sans_400 = IBM_Plex_Sans({
  weight: ["400"],
  style: ["normal"],
  variable: "--font-ibmplexsans_400",
  subsets: ["latin"],
  display: "swap",
 });
 
 
 const dm_serif_display = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  display: "swap",
 });
 
 
 const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
 });
 
 
 const dm_mono = DM_Mono({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
 });
 
 const inter = Inter({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
 });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Limelight Event Services",
  description: "Established in the Highlands of Scotland 1991, Limelights has been a leader in providing sound, lighting, staging and AV throughout the UK for over 35 years",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body className={`${dm_serif_display.variable} ${ibm_plex_sans.variable} ${dm_sans.variable} ${dm_mono.variable} ${inter.variable} ${ibm_plex_sans_400.variable} antialiased`}>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
import { Roboto_Flex, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import Head from 'next/head'
import Footer from "./components/Footer";
import "./globals.css";
import Navigation from "./components/Navigation";
// import ScrollReveal from "./intersectionObserver";

const roboto_flex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-flex',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

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
      <body className={`${roboto_flex.variable} ${montserrat.variable} antialiased`}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
        {/* <ScrollReveal /> */}
      </body>
    </html>
  );
}
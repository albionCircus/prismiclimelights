// import { Metadata } from "next";
// import { SliceZone } from "@prismicio/react";

// import { PrismicRichText } from "@prismicio/react";

// import { createClient } from "@/prismicio";
// import { components } from "@/slices";

// // import Image from "next/image";

// export default function Page() {
//   return (
//     <main className="">
//       <PrismicRichText field={data.title} />  
//     </main>
//   );
// }

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient();
//   const page = await client.getSingle("home");

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   };
// }
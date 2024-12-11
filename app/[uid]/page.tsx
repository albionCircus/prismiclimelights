// import { createClient } from "@/prismicio";
// import { notFound } from "next/navigation";
// import { SliceZone } from "@prismicio/react";
// import { components } from "@/slices";

// // Explicitly define the type using Next.js conventions
// export type PageProps = {
//   params: {
//     uid: Promise<string>;
//   };
// };

// export default async function Page({ params }: PageProps) {
//   // Use optional chaining and await to handle potential Promise
//   const uid = await params.uid;

//   const client = createClient();

//   const page = await client.getByUID("page", uid).catch(() => null);

//   if (!page) {
//     notFound();
//   }

//   return <SliceZone slices={page.data.slices} components={components} />;
// }

// export async function generateStaticParams() {
//   const client = createClient();

//   const pages = await client.getAllByType("page");

//   return pages.map((page) => ({
//     uid: page.uid,
//   }));
// }

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
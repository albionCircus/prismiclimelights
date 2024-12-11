import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

// Explicitly define the type using Next.js conventions
export type PageProps = {
  params: {
    uid: Promise<string>;
  };
};

export default async function Page({ params }: PageProps) {
  // Use optional chaining and await to handle potential Promise
  const uid = await params.uid;

  const client = createClient();

  const page = await client.getByUID("page", uid).catch(() => null);

  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return pages.map((page) => ({
    uid: page.uid,
  }));
}
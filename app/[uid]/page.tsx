import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

// Props type definition
interface PageProps {
  params: {
    uid: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { uid } = params; // No `await` needed here

  const client = createClient();

  const page = await client.getByUID("page", uid).catch(() => null);

  if (!page) {
    notFound(); // Trigger a 404 page if no content is found
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return pages.map((page) => ({
    uid: page.uid, // Ensure `uid` is returned as expected
  }));
}

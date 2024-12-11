import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

// More explicit type definition matching Next.js expectations
type PageProps = {
  params: {
    uid: string;
  };
};

export default async function Page({ params }: Readonly<PageProps>) {
  const { uid } = params;

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
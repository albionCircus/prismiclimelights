import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("news_post", uid).catch(() => notFound());

  if (!page) return notFound();

  const { data } = page;

  return (
    <div>
     
      <h1>
        {data.heading}
      </h1>
      

      <p>{new Date(data.publish_date || Date.now()).toLocaleDateString("en-GB")}</p>

      
      <SliceZone slices={data.slices} components={components} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("news_post", uid).catch(() => notFound());

  if (!page) return { title: "", description: "" };

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("news_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}

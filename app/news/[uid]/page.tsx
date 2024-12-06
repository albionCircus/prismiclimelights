import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import Link from "next/link";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("news_post", uid).catch(() => notFound());

  if (!page) return notFound();

  const { data } = page;

  return (
    <Bounded className="w-full max-w-[850px] margin0auto">
      <article className="">
        <PrismicNextImage field={data.image} />
        <h1 className="my-5">{data.heading}</h1>
        <p>{new Date(data.original_date || Date.now()).toLocaleDateString("en-GB")}</p>
        <PrismicRichText field={data.article} />
        <p>Article by: <strong><i>{data.author}</i></strong></p>
        <Link href={"/news"} className="text-orange-500">← Back to News</Link>
      </article>
      <SliceZone slices={data.slices} components={components} />
    </Bounded>
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

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/app/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("projects_post", uid)
    .catch(() => notFound());

  const { data } = page; // Added myself

  return (
    <Bounded className="w-full max-w-[850px] margin0auto">
        <article>
            <PrismicNextImage field={data.image} priority />
            <h1 className="my-5">{data.heading}</h1>
            <PrismicRichText field={data.description} />
            <Link href={"/projects"} className="text-orange-500">← Back to Projects</Link>
        </article>
        <SliceZone slices={page.data.slices} components={components} />
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
  const page = await client
    .getByUID("projects_post", uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("projects_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
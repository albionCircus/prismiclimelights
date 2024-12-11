import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "../components/Bounded";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("projects");


  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
    "projects_post",
  );

  return (
    <>
        <SliceZone slices={page.data.slices} components={components} />;
        <Bounded className="margin0auto max-w-7xl">
        <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 min-h-full">
                <PrismicNextImage field={post.data.image} />
                <div className="m-5">
                  <h4 className="text-sky-950 mb-3">{post.data.heading}</h4>
                  <PrismicRichText field={post.data.excerpt} />
                </div>
              </article>
            </PrismicNextLink>
          ))}
        </div>
        </Bounded>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("projects");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
import { Metadata } from "next";
import { JSXMapSerializer, PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Heading from "@/app/components/Heading";
import styles from "@/app/custom.module.css";
import Bounded from "../components/Bounded";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

const headingComponent: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="xl" className={`text-center text-white ${styles.heroShadow}`}>{children}</Heading>
  )
}

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("projects");


  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
    "projects_post",
  );

  return (
    <>
        <Bounded>
          <div className="absoluteCentre">
            <PrismicRichText field={page.data.heading} components={headingComponent} />
          </div>
          <PrismicNextImage field={page.data.hero_image} className="hero500" priority />
        </Bounded>
        <Bounded className="margin0auto max-w-[1445px]">
        <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 border-b-2 border-orange-600 min-h-full w-full">
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
        <SliceZone slices={page.data.slices} components={components} />
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
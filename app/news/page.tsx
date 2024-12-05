import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicDocument } from "@prismicio/client";
import Bounded from "../components/Bounded";
import Pagination from "../components/Pagination";

interface PageProps {
  searchParams?: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 6;

export default async function Page({ searchParams = {} }: PageProps) {
  const client = createClient();
  const page = await client.getSingle("news");

  // Safely parse the page number from searchParams
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Fetch posts for the current page
  const { results: posts, total_results_size } = await client.getByType(
    "news_post",
    {
      orderings: [
        { field: "data.original_date", direction: "desc" },
        { field: "document.last_publication_date", direction: "desc" },
      ],
      pageSize: POSTS_PER_PAGE,
      page: currentPage,
    }
  );

  // Sort posts by publish date
  posts.sort((a, b) => {
    const dateA = a.data.publish_date || "";
    const dateB = b.data.publish_date || "";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const totalPages = Math.ceil(total_results_size / POSTS_PER_PAGE);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <Bounded>
        {posts.map((post: PrismicDocument, index: number) => (
          <div key={index} className="">
            <PrismicRichText field={post.data.heading} />
          </div>
        ))}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Bounded>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("news");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

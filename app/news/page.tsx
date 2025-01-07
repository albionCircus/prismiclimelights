import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "../components/Bounded";
import FilterablePosts from "../components/FilterablePosts";

const POSTS_PER_PAGE = 6;

// Define the props type with specific interfaces
interface Props {
  params: Record<string, never>;
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams; // Explicitly await if required by the framework
  const client = createClient();
  const page = await client.getSingle("news");

  const pageParam = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = parseInt(pageParam || "1", 10);

  const { results: posts, total_results_size } = await client.getByType(
    "news_post",
    {
      orderings: [
        { field: "data.original_date", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
      pageSize: POSTS_PER_PAGE,
      page: currentPage,
    }
  );

  posts.sort((a, b) => {
    const dateA = a.data.original_date || a.first_publication_date;
    const dateB = b.data.original_date || b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const totalPages = Math.ceil(total_results_size / POSTS_PER_PAGE);

  type Category = "Events" | "Industry" | "Technology" | "All" | null;

  const flatCategories = posts.flatMap((post) => post.data.category as Category);
  const uniqueCategoryTags = ["All", ...new Set(flatCategories.filter((category): category is Exclude<Category, null> => category !== null))];

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <Bounded className="margin0auto max-w-7xl">
        <FilterablePosts
          posts={posts}
          categories={uniqueCategoryTags}
          currentPage={currentPage}
          totalPages={totalPages}
        />
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
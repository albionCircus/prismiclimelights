import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 3;

export default async function NewsArticles(props: PageProps) {
  const searchParams = await props.searchParams || {}; // Fallback to an empty object if undefined from line 11
  const client = createClient();

  // Safely parse the page number from searchParams
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
    "news_post",
    {
      orderings: [
        { field: "data.original_date", direction: "desc" },
        // { field: "document.last_publication_date", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
      pageSize: POSTS_PER_PAGE,
      page: currentPage,
    },
  );

  // If original_date is present, override the sorting manually
  posts.sort((a, b) => {
    const dateA =
      a.data.original_date ||
      // a.last_publication_date ||
      a.first_publication_date;
    const dateB =
      b.data.original_date ||
      // b.last_publication_date ||
      b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 min-h-full border-b-2 border-orange-600">
                <PrismicNextImage field={post.data.image} />
                <div className="m-5">
                  <p className="w-fit bg-white p-1.5 rounded-lg mb-3">{post.data.category}</p>
                  <h4 className="text-sky-950">{post.data.heading}</h4>
                  <p className="my-3">{new Date(post.data.original_date || Date.now()).toLocaleDateString("en-GB")}</p>
                  <PrismicRichText field={post.data.description} />
                </div>
              </article>
            </PrismicNextLink>
          ))}
        </div>
  );
}
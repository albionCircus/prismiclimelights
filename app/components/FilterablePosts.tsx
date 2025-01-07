"use client";

import { useState } from "react";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Pagination from "./Pagination";
import styles from "@/app/custom.module.css";

interface FilterablePostsProps {
  posts: PrismicDocument[];
  categories: string[];
  currentPage: number;
  totalPages: number;
}

export default function FilterablePosts({
  posts,
  categories,
  currentPage,
  totalPages,
}: FilterablePostsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.data.category.includes(selectedCategory));

  return (
    <>
      <div className="flex flex-row justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`mx-2 mb-7 block w-fit py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 tag-button font-bold ${
              selectedCategory === category
                ? `${styles.activeCategoryButton} bg-orange-500 text-white`
                : "bg-white text-orange-500 border-2 border-orange-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="newsContainer grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
        {filteredPosts.map((post, index) => (
          <PrismicNextLink
            document={post}
            key={index}
            className="newsItem"
            data-tags={post.data.category}
          >
            <article className="bg-sky-100 min-h-full border-b-2 border-orange-600">
              <PrismicNextImage field={post.data.image} />
              <div className="m-5">
                <p className="w-fit bg-white p-1.5 rounded-lg mb-3">
                  {post.data.category}
                </p>
                <h4 className="text-sky-950">{post.data.heading}</h4>
                <p className="my-3">
                  {new Date(post.data.original_date || Date.now()).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
                <PrismicRichText field={post.data.description} />
              </div>
            </article>
          </PrismicNextLink>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
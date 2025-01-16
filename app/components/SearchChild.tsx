"use client";

// Client Component for Interactivity. SearchChild is a client component and receives pageSearchDescription as props

import Fuse from "fuse.js";
import { useState } from "react";
import styles from "@/app/custom.module.css";

interface DataItem {
  title: string;
  description: string;
  link: string;
}

interface PageSearchDescription {
  data: {
    title: string;
    description: string;
  };
}

interface SearchComponentProps {
  pageSearchDescription: PageSearchDescription;
}

// export default function SearchChild({ pageSearchDescription }: SearchComponentProps) { // Uncomment when using prismic data
export default function SearchChild({ }: SearchComponentProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<DataItem[]>([]);

  const data: DataItem[] = [
    { title: "Home", description: "Welcome to Limelights Event Services", link: "/" },
    { title: "Services", description: "From Audio to Events we've got you covered", link: "/services" },
    { title: "Projects", description: "A selection of our latest projects", link: "/projects" },
    { title: "News", description: "A round-up of industry news and developments", link: "/news" },
    { title: "Contact", description: "Drop us a line and we'll get back to you shortly", link: "/#contactForm" },

    // { title: pageSearchDescription.data.title, description: pageSearchDescription.data.description, link: "/#" }
    // Add more data here...
  ];

  // Configure Fuse.js options
  const fuse = new Fuse(data, {
    keys: ["title", "description", "link"], // Fields to search against
    threshold: 0.3, // Adjust to refine matching sensitivity
  });

  // Handle input change and search results
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    if (query) {
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item)); // Extract the matched items
    } else {
      setResults([]); // Clear results when query is empty
    }
  };

  return (
    <div className="hidden relative w-full lg:block lg:w-64">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="placeholder-gray-600 text-gray-600 p-1.5 w-full h-10 border-2 rounded-lg border-gray-400 focus:outline-none focus:border-amber-500"
      />
      <ul
        className={`absolute bg-white top-10 pt-0 overflow-y-scroll scroll-smooth ${styles.transparentSearchBox} ${styles.maxHeight85}`}
      >
        {results.map((result, idx) => (
          <li key={idx} className="bg-white hover:bg-amber-100">
            <a href={result.link}>
              <p className="font-medium pt-3 px-4 pb-1 text-amber-500 leading-6">{result.title}</p>
              <p className="leading-tight pt-0 px-4 pb-3">
                <small>{result.description}</small>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

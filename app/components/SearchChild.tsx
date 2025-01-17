"use client";

// Client Component for Interactivity. SearchChild is a client component and receives pageSearchDescription as props

import Fuse from "fuse.js";
import { useState, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const data: DataItem[] = [
    { title: "Home", description: "Welcome to Limelights Event Services", link: "/" },
    { title: "Services", description: "From Audio to Events we've got you covered", link: "/services" },
    { title: "Projects", description: "A selection of our latest projects", link: "/projects" },
    { title: "News", description: "A round-up of industry news and developments", link: "/news" },
    { title: "Contact", description: "Drop us a line and we'll get back to you shortly", link: "/#contactForm" },

    // { title: pageSearchDescription.data.title, description: pageSearchDescription.data.description, link: "/#" }
    // Add more data here...
  ];

  const fuse = new Fuse(data, {
    keys: ["title", "description", "link"],
    threshold: 0.3,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    if (query) {
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item));
    } else {
      setResults([]);
    }
  };

  const handleBlur = () => {
    // Clear results when the input loses focus
    setTimeout(() => {
      setResults([]);
      setQuery(""); // Clear the input field
    }, 100); // Slight delay to allow clicking a result before clearing
  };

  return (
    <div className="hidden relative w-full lg:block">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleSearch}
        onBlur={handleBlur}
        placeholder="Search..."
        className="theSearchInput placeholder-gray-600 text-gray-600 p-1.5 h-10 border-2 rounded-lg border-gray-400 transition-all ease-in-out duration-700 focus:outline-none focus:border-amber-500 w-32 focus:w-64"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white top-10 pt-0 overflow-y-scroll scroll-smooth z-50 h-auto max-h-[85vh]">
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
      )}
    </div>
  );
}

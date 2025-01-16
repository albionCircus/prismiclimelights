// This is a server component.

// Server Components are for Data Fetching

// When using getStaticProps, you must use a server component. (Not a "use client" / client component)
// If you must use a client component, the data needs to be passed from the parent (server) component
// Import Prismic Data into the parent component if the parent component manages data fetching and state

import SearchChild from "./SearchChild";
import { createClient } from "@prismicio/client";

const repositoryName = "prismiclimelights"; // Repository name
const endpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`;

// If the type isn't available or needs customization, define your own TypeScript type
type SearchDescriptionData = {
  title?: string;
  description?: string;
};

export async function getStaticProps() {
  
  const client = createClient(endpoint);
  const theSearchDescription = await client.getSingle("searchdescription");

  console.log(theSearchDescription);

  const pageSearchDescription = {
    data: {
      title: (theSearchDescription?.data as SearchDescriptionData)?.title || "Default Title 1",
      description: (theSearchDescription?.data as SearchDescriptionData)?.description || "Default Description 1",
    },
  };

  return {
    props: {
      pageSearchDescription,
    },
  };
}

export default function SearchParent({
  pageSearchDescription = {
    data: {
      title: "Default Title 2",
      description: "Default Description 2",
    },
  },
}: {
  pageSearchDescription?: { data: { title: string; description: string } };
}) {
  return <SearchChild pageSearchDescription={pageSearchDescription} />;
}
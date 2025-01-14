// This is a server component.

// Server Components are for Data Fetching

// When using getStaticProps, you must use a server component. (Not a "use client" / client component)
// If you must use a client component, the data needs to be passed from the parent (server) component.

import SearchChild from "./SearchChild";

export async function getStaticProps() {
  const pageSearchDescription = {
    data: {
      title: "Sample Title",
      description: "Sample Description",
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
      title: "Default Title",
      description: "Default Description",
    },
  },
}: {
  pageSearchDescription?: { data: { title: string; description: string } };
}) {
  return <SearchChild pageSearchDescription={pageSearchDescription} />;
}
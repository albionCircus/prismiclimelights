import { createClient } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "../components/Logo";
import Bounded from "../components/Bounded";
import Link from "next/link";

const repositoryName = "prismiclimelights"; // Repository name
const endpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`;

const client = createClient(endpoint);

async function Navigation() {
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded>
        <nav className="flex flex-col md:flex-row justify-between items-center margin0auto max-w-6xl">
            <Link href={'/'}> 
                <Logo />
            </Link>
            <ul className="flex space-x-4 text-slate-600">
                {navigation.data.slices.map((slice) => (
                <li key={slice.id}>
                    <PrismicNextLink field={slice.primary.link} />
                    {slice.items.length > 0 && (
                    <ul>
                        {slice.items.map((item, index) => (
                        <li key={index}>
                            <PrismicNextLink field={slice.primary.child_link} />
                            {item}
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
                ))}
            </ul>
        </nav>
    </Bounded>
  );
}

export default Navigation;

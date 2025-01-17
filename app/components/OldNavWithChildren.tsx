import { createClient } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "./Logo";
import Link from "next/link";
import styles from "@/app/custom.module.css";

const repositoryName = "prismiclimelights"; // Repository name
const endpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`;

const client = createClient(endpoint);

async function OldNavigation() {
  const navigation = await client.getSingle("navigation");

  return (
        <nav className="relative px-4 pt-4 md:pt-8 md:px-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center margin0auto lg:max-w-[1440px]">
            <Link href={'/'}> 
                <Logo />
            </Link>
            <ul className="flex space-x-10 text-slate-600 mt-5 mb-3 md:mt-0 md:mb-0">
                {navigation.data.slices.map((slice) => (
                <li key={slice.id} className={`${styles.topLevelLink}`}>
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
  );
}

export default OldNavigation;
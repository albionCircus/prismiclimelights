import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return <footer className="bg-gray-200 py-6 flex flex-row justify-center items-center">
            <p className="font-body text-slate-600 text-center">
                <small>
                    {settings.data.site_title} &copy; {new Date().getFullYear()} 
                    <span className="hidden sm:inline font-body text-slate-600 px-2">|</span>
                    <br className="block sm:hidden" />
                    <span>
                        <Link href={"https://albioncircus.com/"}>
                            Site by Albion Circus
                            <Image
                                src="./albionCircus.svg"
                                alt="Albion Circus"
                                width={16}
                                height={16}
                                quality={100}
                                className="inline-block ml-1 mt-0 sm:-mt-1"
                            />
                        </Link>
                    </span>
                </small>
           </p>
    </footer>;
}
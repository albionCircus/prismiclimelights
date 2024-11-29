import { createClient } from "@/prismicio";
import Link from "next/link";
import Bounded from "./Bounded";
import Image from "next/image";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return <Bounded as="footer">
        <div className="flex flex-row justify-center items-center gap-6">
            <p className="text-sm">
                {settings.data.site_title} &copy; {new Date().getFullYear()} 
            </p>
            |
            <p>Site by Albion Circus</p>
            <Link href={"https://albioncircus.com/"}>
                <Image
                    src="./albionCircus.svg"
                    alt="Albion Circus"
                    width={20}
                    height={20}
                    quality={100}
                />
            </Link>
        </div>
    </Bounded>;
}
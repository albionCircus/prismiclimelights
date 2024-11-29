import { createClient } from "@/prismicio";
import Link from "next/link";
import Bounded from "./Bounded";
import Image from "next/image";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return <Bounded as="footer">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-6">
            <Link href={"https://albioncircus.com/"}>
                <Image
                    src="./albionCircus.svg"
                    alt="Limelight Event Services Logo"
                    width={250}
                    height={50}
                    quality={100}
                />
            </Link>
            <p className="text-sm">
                &copy;{new Date().getFullYear()} {settings.data.site_title}
            </p>
        </div>
    </Bounded>;
}
import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
    className,
    ...restProps      
}: PrismicNextLinkProps){
    return (
        <PrismicNextLink className={clsx("block w-fit bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", className)} 
            {...restProps}
        />
    )
}
import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
    className,
    ...restProps      
}: PrismicNextLinkProps){
    return (
        <PrismicNextLink className={clsx("block w-fit bg-orange-500 hover:bg-orange-400 transition-color duration-200 ease-in-out py-3 px-8 rounded-full text-white font-semibold tracking-normal", className)} 
            {...restProps}
        />
    )
}
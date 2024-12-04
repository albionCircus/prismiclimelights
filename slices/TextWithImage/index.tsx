import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="lg" className="">{children}</Heading>
  ),
  paragraph: ({children}) => (
    <p className="max-w-3xl text-lg font-body text-slate-600">{children}</p>
  ),
}

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="margin0auto grid gap-8 md:grid-cols-2 place-items-center lg:max-w-[1400px]">
        <div className="grid gap-4">
          <PrismicRichText field={slice.primary.heading} components={components} />
          <PrismicRichText field={slice.primary.body} components={components} />
          <Button field={slice.primary.button_link}>
            {slice.primary.button_text}
          </Button>
        </div>
        <PrismicNextImage field={slice.primary.image} className={clsx("rounded-3xl", slice.variation === "default" && "md:order-2")} />
      </div>
    </Bounded>
  );
};

export default TextWithImage;
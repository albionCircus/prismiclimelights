import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="xl" className="text-center">{children}</Heading>
  ),
  paragraph: ({children}) => (
    <p className="text-2xl font-normal leading-10 font-body text-slate-600 mb-4 md:mb-8 max-w-md">{children}</p>
  ),
}

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="absoluteCentre">
        <PrismicRichText field={slice.primary.heading} components={components} />
      </div>
    </Bounded>
  );
};

export default Hero;
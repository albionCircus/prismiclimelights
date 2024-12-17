import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LatestNews`.
 */
export type LatestNewsProps = SliceComponentProps<Content.LatestNewsSlice>;

/**
 * Component for "LatestNews" Slices.
 */
const LatestNews = ({ slice }: LatestNewsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for latest_news (variation: {slice.variation})
      Slices
    </section>
  );
};

export default LatestNews;

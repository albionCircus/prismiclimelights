import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import NewsArticles from "@/app/components/NewsArticles";

/**
 * Props for `LatestNews`.
 */
export type LatestNewsProps = SliceComponentProps<Content.LatestNewsSlice>;

/**
 * Component for "LatestNews" Slices.
 */
const LatestNews = ({ slice }: LatestNewsProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="margin0auto grid gap-4 lg:max-w-[1400px]">
        <h2 className="text-slate-700">{slice.primary.heading}</h2>
        <NewsArticles />
      </div>
    </Bounded>
  );
};

export default LatestNews;
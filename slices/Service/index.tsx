import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "@/app/custom.module.css";

/**
 * Props for `Service`.
 */
export type ServiceProps = SliceComponentProps<Content.ServiceSlice>;

/**
 * Component for "Service" Slices.
 */
const Service = ({ slice }: ServiceProps): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="margin0auto lg:max-w-[1440px] scroll-reveal animate fadeInBottom">
        {slice.primary.service.map((item, serviceKey) => (
          <div key={serviceKey} className={`flex ${styles.serviceItem} justify-between items-center mb-10 bg-gradient-to-tr from-gray-50 to-gray-200`}>
            <article className="p-5 md:p-10">
              <h2 className="text-slate-700 mb-3">{item.heading}</h2>
              <PrismicRichText field={item.description} />
            </article>
            <div>
              <PrismicNextImage field={item.image} className="w-full h-auto p-5 md:p-0" />
            </div>
          </div>
        ))}
    </Bounded>
  );
};

export default Service;
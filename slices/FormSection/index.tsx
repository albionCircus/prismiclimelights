import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";

/**
 * Props for `FormSection`.
 */
export type FormSectionProps = SliceComponentProps<Content.FormSectionSlice>;

/**
 * Component for "FormSection" Slices.
 */
const FormSection = ({ slice }: FormSectionProps): JSX.Element => {
  return (
    <section className="relative px-4 pt-4 pb-20 md:py-8 md:pt-6 md:pb-20 lg:pt-8 lg:pb-20">
      <div className="bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-3xl p-7 md:p-10 margin0auto m-[0 auto 40px] grid gap-8 md:grid-cols-2 place-items-center lg:max-w-[1400px]">
        <article className="w-full">
          <h2 className="text-slate-700 mb-4 md:mb-2">{slice.primary.heading}</h2>
          <PrismicRichText field={slice.primary.description} />
            <div className="flex items-center my-4">
              <Image src="./map-pin.svg" alt="Map Pin Icon" width={26} height={26} quality={100} className="inline-block mr-1.5"/>
              <p className="m-0">{slice.primary.location}</p>
            </div>
            <div className="flex items-center">
              <Image src="./phone.svg" alt="Phone Icon" width={26} height={26} quality={100} className="inline-block mr-1.5"/>
              {/* <p className="m-0">{slice.primary.phone}</p> */}
              
            </div>
        </article>
        <div className="w-full">
          <ContactForm/>
        </div>
      </div>
      <div className="absolute bg-gradient-to-tr from-orange-500 to-amber-200 -z-10 opacity-50 inset-x-0 bottom-0 h-4/5"></div>
    </section>
  );
};

export default FormSection;
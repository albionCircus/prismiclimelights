import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormSection`.
 */
export type FormSectionProps = SliceComponentProps<Content.FormSectionSlice>;

/**
 * Component for "FormSection" Slices.
 */
const FormSection = ({ slice }: FormSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for form_section (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FormSection;

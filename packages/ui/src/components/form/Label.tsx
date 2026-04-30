import {
  Label as AriaLabel,
  type LabelProps,
} from "react-aria-components/Label";
import { tv } from "tailwind-variants";

const labelVariants = tv({
  base: [
    "text-sm/none font-medium text-fg-muted",
    "data-disabled:cursor-not-allowed data-disabled:opacity-80",
    "group-data-invalid:text-destructive",
  ],
});

const Label = ({ className, ...props }: LabelProps) => (
  <AriaLabel className={labelVariants({ className })} {...props} />
);

export { Label, type LabelProps };

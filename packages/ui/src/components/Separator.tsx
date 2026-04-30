import {
  Separator as AriaSeparator,
  type SeparatorProps,
} from "react-aria-components/Separator";
import { tv } from "tailwind-variants";

const separatorVariants = tv({
  base: "border-none bg-border forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full min-h-8 w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const Separator = ({ className, orientation, ...props }: SeparatorProps) => (
  <AriaSeparator
    className={separatorVariants({ className, orientation })}
    {...props}
  />
);

export { Separator, type SeparatorProps, separatorVariants };

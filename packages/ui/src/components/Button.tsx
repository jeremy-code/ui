import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { cn, tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: [
    "ring-offset-background inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-focus-visible:ring-ring data-focus-visible:ring-2 data-focus-visible:ring-offset-2 data-focus-visible:outline-none",
    "focus-visible:outline-none",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground data-hovered:bg-primary/90",
      destructive:
        "text-destructive-foreground bg-destructive data-hovered:bg-destructive/90",
      outline:
        "border-input bg-background border border-border data-hovered:bg-accent data-hovered:text-accent-fg",
      secondary:
        "bg-secondary text-secondary-foreground data-hovered:bg-secondary/80",
      ghost: "data-hovered:text-accent-foreground data-hovered:bg-accent",
      link: "text-primary underline-offset-4 data-hovered:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends AriaButtonProps, VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <AriaButton
      className={composeRenderProps(
        className,
        (className) =>
          cn(
            buttonVariants({
              variant,
              size,
              className,
            }),
          ) ?? "",
      )}
      {...props}
    />
  );
};

export { Button, buttonVariants };
export type { ButtonProps };

import type { ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const skeletonVariants = tv({
  base: [],
  variants: {
    isLoading: {
      true: [
        "pointer-events-none shrink-0 cursor-default rounded bg-clip-padding text-transparent select-none",
      ],
      false: {
        background: "unset",
        animation: "animate-in fade-in-0",
      },
    },
    variant: {
      pulse: ["animate-pulse bg-bg-muted"],
    },
  },
  defaultVariants: {
    variant: "pulse",
    isLoading: true,
  },
});

type SkeletonProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof skeletonVariants>;

const Skeleton = ({
  className,
  variant,
  isLoading,
  role,
  "aria-live": ariaLive,
  "aria-label": ariaLabel,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={skeletonVariants({ className, variant, isLoading })}
      role={role ?? "status"}
      aria-live={ariaLive ?? "polite"}
      aria-label={ariaLabel ?? "Loading..."}
      {...props}
    />
  );
};

export { Skeleton, type SkeletonProps, skeletonVariants };

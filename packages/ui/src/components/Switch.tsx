import type { ComponentPropsWithRef } from "react";

import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from "react-aria-components/Switch";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv, type VariantProps } from "tailwind-variants";

const switchTrackVariants = tv({
  base: [
    "relative inline-flex cursor-pointer justify-start gap-2 rounded-full ring-1 transition-[background-color,box-shadow,opacity] ring-inset",
    "shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "h-(--switch-height) w-(--switch-width)",
    "group-not-selected/switch:bg-bg-muted group-not-selected/switch:ring-border hover:group-not-selected/switch:ring-fg-subtle/80",
    "group-selected/switch:bg-accent group-selected/switch:ring-accent",
  ],
});

type SwitchTrackProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof switchTrackVariants>;

const SwitchTrack = ({ className, ...props }: SwitchTrackProps) => (
  <div className={switchTrackVariants({ className })} {...props} />
);

const switchHandleVariants = tv({
  base: [
    "flex items-center justify-center rounded-[inherit] bg-white text-gray-600 shadow-sm transition-[translate]",
    "shrink-0",
    "size-(--switch-height) scale-80",
    "group-selected/switch:translate-x-[calc(var(--switch-width)-var(--switch-height))]",
    "group-data-[size=lg]/switch:text-lg group-data-[size=md]/switch:text-base group-data-[size=sm]/switch:text-sm group-data-[size=xs]/switch:text-xs",
  ],
});

type SwitchHandleProps = ComponentPropsWithRef<"div">;

const SwitchHandle = ({ className, ...props }: SwitchHandleProps) => (
  <div className={switchHandleVariants({ className })} {...props} />
);

const switchVariants = tv({
  base: [
    "group/switch relative flex items-center gap-2 text-sm text-neutral-800 transition [-webkit-tap-highlight-color:transparent] dark:text-neutral-200",
  ],
  variants: {
    isDisabled: {
      true: "disabled:text-neutral-300 dark:disabled:text-neutral-600 forced-colors:disabled:text-[GrayText]",
    },

    size: {
      xs: "[--switch-height:--spacing(3)] [--switch-width:--spacing(6)]",
      sm: "[--switch-height:--spacing(4)] [--switch-width:--spacing(8)]",
      md: "[--switch-height:--spacing(5)] [--switch-width:--spacing(10)]",
      lg: "[--switch-height:--spacing(7)] [--switch-width:--spacing(12)]",
    },
  },
  defaultVariants: { size: "md" },
});

type SwitchProps = {
  switchTrackProps?: SwitchTrackProps;
} & AriaSwitchProps &
  VariantProps<typeof switchVariants>;

const Switch = ({
  children,
  className,
  switchTrackProps,
  size,
  ...props
}: SwitchProps) => (
  <AriaSwitch
    className={composeRenderProps(className, (className, renderProps) =>
      switchVariants({ className, size, ...renderProps }),
    )}
    {...props}
  >
    {composeRenderProps(children, (children) => (
      <>
        <SwitchTrack {...switchTrackProps}>
          <SwitchHandle />
        </SwitchTrack>
        {children}
      </>
    ))}
  </AriaSwitch>
);

export {
  SwitchTrack,
  type SwitchTrackProps,
  switchTrackVariants,
  SwitchHandle,
  type SwitchHandleProps,
  switchHandleVariants,
  Switch,
  type SwitchProps,
  switchVariants,
};

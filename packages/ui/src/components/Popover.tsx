import type { ReactNode } from "react";

import {
  DialogTrigger as PopoverTrigger,
  type DialogTriggerProps as PopoverTriggerProps,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components/Popover";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { OverlayArrow } from "./OverlayArrow";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

type PopoverProps = AriaPopoverProps & {
  showArrow?: boolean;
  children: ReactNode;
};

const Popover = ({
  className,
  showArrow,
  children,
  offset,
  ...props
}: PopoverProps) => {
  const defaultOffset = showArrow ? 12 : 8;

  return (
    <AriaPopover
      offset={offset ?? defaultOffset}
      className={composeTailwindRenderProps(className, [
        "z-50 rounded-md border border-border bg-surface text-fg shadow-md outline-none",
        "entering:animate-in entering:fade-in-0 entering:zoom-in-95",
        "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
        "placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
      ])}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          {showArrow && <OverlayArrow />}
          {children}
        </>
      ))}
    </AriaPopover>
  );
};

export { Popover, type PopoverProps, PopoverTrigger, type PopoverTriggerProps };

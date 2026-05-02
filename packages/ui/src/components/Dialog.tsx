import { X } from "lucide-react";
import {
  DialogTrigger,
  type DialogTriggerProps,
  type DialogProps,
  Dialog as AriaDialog,
  Heading,
  type HeadingProps as DialogTitleProps,
} from "react-aria-components/Dialog";
import { cn, tv } from "tailwind-variants";

import { Button, type ButtonProps as DialogCloseButtonProps } from "./Button";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

const dialogVariants = tv({
  base: ["relative max-h-[inherit] overflow-auto p-6 outline-0"],
});

const Dialog = ({ className, ...props }: DialogProps) => {
  return <AriaDialog className={dialogVariants({ className })} {...props} />;
};

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <Heading
    slot="title"
    className={cn("text-xl font-medium", className)}
    {...props}
  />
);

const DialogCloseButton = ({ className, ...props }: DialogCloseButtonProps) => {
  return (
    <Button
      slot="close"
      size="icon-sm"
      variant="ghost"
      aria-label="Close"
      className={composeTailwindRenderProps(
        className,
        "absolute top-2 right-2",
      )}
      {...props}
    >
      <X className="size-4" />
    </Button>
  );
};

export {
  DialogTrigger,
  type DialogTriggerProps,
  Dialog,
  type DialogProps,
  dialogVariants,
  DialogTitle,
  type DialogTitleProps,
  DialogCloseButton,
  type DialogCloseButtonProps,
};

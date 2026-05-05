import {
  Button as AriaButton,
  type ButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

import { focusRing } from "../utils/focusRing";

const button = tv({
  extend: focusRing,
  base: [
    "relative inline-flex cursor-default items-center justify-center rounded-md bg-transparent p-1 text-center text-sm text-fg-muted transition [-webkit-tap-highlight-color:transparent]",
  ],
  variants: {
    isHovered: {
      true: "bg-bg-muted",
    },
    isPressed: {
      true: "bg-border",
    },
    isDisabled: {
      true: [
        "bg-neutral-100 text-neutral-300",
        "dark:bg-neutral-800 dark:text-neutral-600",
        "forced-colors:text-[GrayText]",
      ],
    },
  },
});

function FieldButton(props: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className }),
      )}
    />
  );
}

export { FieldButton };

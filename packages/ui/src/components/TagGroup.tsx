import { createContext, use } from "react";

import { X } from "lucide-react";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
  Button,
  Label,
  TagList,
  type TagListProps,
} from "react-aria-components/TagGroup";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { Description } from "./form";
import { focusRing } from "../utils/focusRing";
import { ErrorMessage } from "./form/ErrorMessage";

const DEFAULT_COLOR = "gray";

const tagVariants = tv({
  extend: focusRing,
  base: [
    "flex max-w-fit cursor-default items-center gap-1 rounded-full border px-3 py-0.5 text-xs transition",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  variants: {
    color: {
      gray: [
        "bg-surface",
        "border-gray-200 text-gray-600 hover:border-gray-300",
        "dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500",
      ],
      green: [
        "border-green-200 bg-green-100 text-green-700 hover:border-green-300",
        "dark:border-green-300/10 dark:bg-green-300/20 dark:text-green-400 dark:hover:border-green-300/20",
      ],
      yellow: [
        "border-yellow-200 bg-yellow-100 text-yellow-700 hover:border-yellow-300",
        "dark:border-yellow-300/10 dark:bg-yellow-300/20 dark:text-yellow-400 dark:hover:border-yellow-300/20",
      ],
      blue: [
        "border-blue-200 bg-blue-100 text-blue-700 hover:border-blue-300",
        "dark:border-blue-400/10 dark:bg-blue-400/20 dark:text-blue-300 dark:hover:border-blue-400/20",
      ],
    },
    allowsRemoving: {
      true: "pr-1",
    },
    isSelected: {
      true: [
        "border-transparent bg-accent text-accent-fg forced-color-adjust-none hover:border-accent",
        "forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
      ],
    },
    isDisabled: {
      true: [
        "border-gray-200 bg-neutral-100 text-neutral-300",
        "dark:border-gray-700 dark:bg-transparent dark:text-neutral-600",
        "forced-colors:text-[GrayText]",
      ],
    },
  },
  defaultVariants: {
    color: DEFAULT_COLOR,
  },
});

type Color = Exclude<VariantProps<typeof tagVariants>["color"], undefined>;
const ColorContext = createContext<Color>(DEFAULT_COLOR);

type TagGroupProps<T> = {
  tagListProps?: Omit<TagListProps<T>, "items">;
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
} & Omit<AriaTagGroupProps, "children"> &
  Pick<TagListProps<T>, "children" | "items">;

const TagGroup = <T extends object>({
  className,
  tagListProps,
  color,
  children,
  items,
  label,
  description,
  errorMessage,
  ...props
}: TagGroupProps<T>) => {
  return (
    <AriaTagGroup className={cn("flex flex-col gap-2", className)} {...props}>
      <Label>{label}</Label>
      <ColorContext value={color ?? DEFAULT_COLOR}>
        <TagList
          items={items}
          {...tagListProps}
          className={cn("flex flex-wrap gap-1", tagListProps?.className)}
        >
          {children}
        </TagList>
      </ColorContext>
      {description && <Description>{description}</Description>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AriaTagGroup>
  );
};

const removeTagButtonVariants = tv({
  extend: focusRing,
  base: [
    "flex cursor-default items-center justify-center rounded-full bg-transparent p-0.5 transition-[background-color]",
  ],
  variants: {
    color: {
      gray: "hover:bg-bg-muted pressed:bg-border",
      green: [
        "hover:bg-green-200 pressed:bg-green-300",
        "dark:hover:bg-green-300/20 dark:pressed:bg-green-300/30",
      ],
      yellow: [
        "hover:bg-yellow-200 pressed:bg-yellow-300",
        "dark:hover:bg-yellow-300/20 dark:pressed:bg-yellow-300/30",
      ],
      blue: [
        "hover:bg-blue-200 pressed:bg-blue-300",
        "dark:hover:bg-blue-300/20 dark:pressed:bg-blue-300/30",
      ],
    },
  },
});

type TagProps = {
  color?: Color;
} & AriaTagProps;

const Tag = ({ children, color, textValue, ...props }: TagProps) => {
  const computedTextValue =
    textValue !== undefined ? textValue
    : typeof children === "string" ? children
    : undefined;
  const computedColor = color ?? use(ColorContext);

  return (
    <AriaTag
      {...props}
      textValue={computedTextValue}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagVariants({
          ...renderProps,
          className,
          color: computedColor,
        }),
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={(renderProps) =>
                removeTagButtonVariants({
                  ...renderProps,
                  color: computedColor,
                })
              }
            >
              <X aria-hidden className="size-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
};

export {
  TagGroup,
  type TagGroupProps,
  Tag,
  type TagProps,
  tagVariants,
  type Color,
  ColorContext,
};

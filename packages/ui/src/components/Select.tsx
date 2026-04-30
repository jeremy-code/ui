import { type ReactNode } from "react";

import { ChevronDown } from "lucide-react";
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  ListBox,
  type ListBoxItemProps as SelectItemProps,
  SelectValue,
  type ValidationResult,
} from "react-aria-components/Select";
import { tv } from "tailwind-variants";

import {
  ListBoxItem as SelectItem,
  ListBoxSection as SelectSection,
  type ListBoxSectionProps as SelectSectionProps,
} from "./ListBox";
import { Popover } from "./Popover";
import { Description, FieldError, Label } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

const selectVariants = tv({
  extend: focusRing,
  base: "flex h-9 w-full min-w-45 cursor-default items-center gap-4 rounded-lg border border-border bg-surface pr-2 pl-3 text-start transition [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      false:
        "text-fg-bold group-invalid:outline group-invalid:outline-red-600 hover:border-fg-subtle forced-colors:group-invalid:outline-[Mark] pressed:border-fg-subtle",
      true: "border-transparent bg-bg-muted text-neutral forced-colors:text-[GrayText]",
    },
  },
});

interface SelectProps<
  T extends object,
  M extends "single" | "multiple",
> extends Omit<AriaSelectProps<T, M>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
}

const Select = <T extends object, M extends "single" | "multiple" = "single">({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) => {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group relative flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={selectVariants}>
        <SelectValue className="flex-1 text-sm">
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <ChevronDown
          aria-hidden
          className="h-4 w-4 text-neutral-600 group-disabled:text-neutral-200 dark:text-neutral-400 dark:group-disabled:text-neutral-600 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover containerPadding={0} className="min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};

export {
  Select,
  type SelectProps,
  selectVariants,
  SelectItem,
  type SelectItemProps,
  SelectSection,
  type SelectSectionProps,
};

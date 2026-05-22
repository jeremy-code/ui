import { type ComponentPropsWithRef, type CSSProperties } from "react";

import { FocusScope, useFocusManager, useObjectRef } from "react-aria";
import { useHasTabbableChild } from "react-aria/private/focus/useHasTabbableChild";
import { useId } from "react-aria/useId";
import { Group } from "react-aria-components/Group";
import {
  Input,
  InputContext,
  type InputProps,
} from "react-aria-components/Input";
import { Text } from "react-aria-components/Text";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn, tv, type VariantProps } from "tailwind-variants";

import {
  fieldGroupVariants,
  Label,
  type FieldErrorMessage,
  FieldError,
} from "./form";

type InputGroupProps = {
  label?: string;
  value?: InputProps["value"];
  errorMessage?: FieldErrorMessage;
} & ComponentPropsWithRef<typeof Group>;

const inputGroupVariants = tv({
  extend: fieldGroupVariants,
  base: [
    "flex w-fit items-center overflow-hidden rounded-sm text-base text-fg",
    "disabled:text-fg-muted",
  ],
  variants: {
    size: {
      xs: "h-8 min-w-8 px-2 text-xs/4",
      sm: "h-9 min-w-9 px-2.5 text-sm/5",
      md: "h-10 min-w-10 px-3 text-sm/5",
      lg: "h-11 min-w-11 px-4 text-base/6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const InputGroup = ({
  label,
  value,
  ref,
  errorMessage,
  ...props
}: InputGroupProps) => {
  const id = useId();
  const objectRef = useObjectRef(ref);
  const tabIndex = useHasTabbableChild(objectRef) ? undefined : 0;

  return (
    <div data-disabled={props.isDisabled || undefined}>
      {label && (
        <Label elementType="span" id={id}>
          {label}
        </Label>
      )}
      <FocusScope>
        <Group
          {...props}
          className={composeRenderProps(
            props.className,
            (className, renderProps) =>
              inputGroupVariants({ className, ...renderProps }),
          )}
          aria-labelledby={id}
          tabIndex={tabIndex}
          ref={objectRef}
        >
          {composeRenderProps(props.children, (children, renderProps) => (
            <InputContext value={{ disabled: renderProps.isDisabled }}>
              {children}
            </InputContext>
          ))}
        </Group>
      </FocusScope>
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
};

const inputGroupInputVariants = tv({
  base: [
    "border-none bg-transparent px-0.5 text-fg shadow-none outline-none",
    "disabled:text-fg-subtle disabled:placeholder:text-fg-subtle",
    "placeholder:text-fg-muted",
  ],
  variants: {
    variant: {
      static: "box-content w-[calc(var(--data-max-length)*1ch)] font-mono",
    },
  },
});

type InputGroupInputProps = ComponentPropsWithRef<typeof Input> &
  VariantProps<typeof inputGroupInputVariants>;

const InputGroupInput = ({ ref, variant, ...props }: InputGroupInputProps) => {
  const objectRef = useObjectRef(ref);
  const focusManager = useFocusManager();

  return (
    <Input
      {...props}
      ref={objectRef}
      className={composeRenderProps(props.className, (className, renderProps) =>
        inputGroupInputVariants({ className, variant, ...renderProps }),
      )}
      style={composeRenderProps(
        props.style,
        (style) =>
          ({ ...style, "--data-max-length": props.maxLength }) as CSSProperties,
      )}
      onKeyDown={(event) => {
        if (
          (event.key === "ArrowLeft" || event.key === "Backspace") &&
          event.currentTarget.selectionStart === 0 &&
          event.currentTarget.selectionEnd === 0
        ) {
          focusManager?.focusPrevious();
          // Otherwise, the cursor will move left one character in the new input
          event.preventDefault();
        } else if (
          event.key === "ArrowRight" &&
          event.currentTarget.selectionStart === 0 &&
          // Only when the input is empty as to not interfere with native input events
          event.currentTarget.value.length === 0
        ) {
          focusManager?.focusNext();
          event.preventDefault();
        } else if (
          event.key === "ArrowRight" &&
          event.currentTarget.selectionStart === props.maxLength &&
          event.currentTarget.value.length === props.maxLength
        ) {
          focusManager?.focusNext();
          event.preventDefault();
        }
        props?.onKeyDown?.(event);
      }}
      onInput={(event) => {
        if (
          event.nativeEvent.inputType === "insertText" ||
          event.nativeEvent.inputType === "insertFromPaste"
        ) {
          if (event.currentTarget.value.length === props.maxLength) {
            focusManager?.focusNext();
          }
        }
        props?.onInput?.(event);
      }}
    />
  );
};

type InputGroupSpanProps = ComponentPropsWithRef<typeof Text>;

const InputGroupSpan = (props: InputGroupSpanProps) => {
  return (
    <Text
      elementType="span"
      aria-hidden
      {...props}
      className={cn("text-fg-muted", props.className)}
    />
  );
};

export {
  InputGroup,
  type InputGroupProps,
  InputGroupInput,
  type InputGroupInputProps,
  InputGroupSpan,
  type InputGroupSpanProps,
};

import { type ComponentPropsWithRef, type CSSProperties } from "react";

import { FocusScope, useFocusManager } from "react-aria/FocusScope";
import { mergeProps } from "react-aria/mergeProps";
import { useHasTabbableChild } from "react-aria/private/focus/useHasTabbableChild";
import { useField } from "react-aria/useField";
import { useObjectRef } from "react-aria/useObjectRef";
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

type InputGroupFieldProps = {
  label?: string;
  value?: InputProps["value"];
  errorMessage?: FieldErrorMessage;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  children?: InputGroupProps["children"];
} & Omit<ComponentPropsWithRef<"div">, "children">;

const InputGroupField = ({ children, ...props }: InputGroupFieldProps) => {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useField({
      ...props,
      labelElementType: "span",
    });

  return (
    <div
      data-disabled={props.isDisabled || undefined}
      data-invalid={props.isInvalid || undefined}
      data-readonly={props.isReadOnly || undefined}
      data-required={props.isRequired || undefined}
      {...props}
    >
      {props.label && (
        <Label elementType="span" {...labelProps}>
          {props.label}
        </Label>
      )}
      <InputGroup
        isInvalid={props.isInvalid || false}
        isDisabled={props.isDisabled || false}
        {...fieldProps}
      >
        {children}
      </InputGroup>
      <input hidden type="text" value={props.value} />
      {props.description && (
        <Text elementType="span" {...descriptionProps}>
          {props.description}
        </Text>
      )}
      <FieldError {...errorMessageProps}>{props.errorMessage}</FieldError>
    </div>
  );
};

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

type InputGroupProps = ComponentPropsWithRef<typeof Group>;

const InputGroup = ({ ref, ...props }: InputGroupProps) => {
  const objectRef = useObjectRef(ref);
  const tabIndex = useHasTabbableChild(objectRef) ? undefined : 0;

  return (
    <FocusScope autoFocus>
      <Group
        {...mergeProps(props, {
          className: inputGroupVariants,
          tabIndex,
          ref: objectRef,
        })}
      >
        {composeRenderProps(props.children, (children, renderProps) => (
          <InputContext value={{ disabled: renderProps.isDisabled }}>
            {children}
          </InputContext>
        ))}
      </Group>
    </FocusScope>
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
          // Cursor is at the beginning (no text selected)
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
          // Cursor is at the end
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
  InputGroupField,
  type InputGroupFieldProps,
  InputGroup,
  type InputGroupProps,
  inputGroupVariants,
  InputGroupInput,
  type InputGroupInputProps,
  InputGroupSpan,
  type InputGroupSpanProps,
};

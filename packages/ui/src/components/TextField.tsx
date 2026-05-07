import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";
import { tv } from "tailwind-variants";

import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderVariants,
  type FieldErrorMessage,
} from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

const inputVariants = tv({
  extend: focusRing,
  base: "border transition",
  variants: {
    isFocused: fieldBorderVariants.variants.isFocusWithin,
    isInvalid: fieldBorderVariants.variants.isInvalid,
    isDisabled: fieldBorderVariants.variants.isDisabled,
  },
});

type TextFieldProps = AriaTextFieldProps & {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: FieldErrorMessage;
};

const TextField = ({
  className,
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) => {
  return (
    <AriaTextField
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Input className={inputVariants} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
};

export { TextField, type TextFieldProps, inputVariants };

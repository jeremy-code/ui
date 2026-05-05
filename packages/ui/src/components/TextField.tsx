import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components/TextField";
import { tv } from "tailwind-variants";

import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderVariants,
} from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

const inputStyles = tv({
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
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
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
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
    >
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
};

export { TextField, type TextFieldProps, inputStyles };

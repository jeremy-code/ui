import {
  DateField as AriaDateField,
  type DateFieldProps as AriaDateFieldProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components/DateField";

import { DateInput } from "./DateInput";
import { Description, FieldError, Label } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

type DateFieldProps<T extends DateValue> = {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
} & AriaDateFieldProps<T>;

const DateField = <T extends DateValue>({
  className,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) => {
  return (
    <AriaDateField
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
    >
      {label && <Label>{label}</Label>}
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaDateField>
  );
};

export { DateField, type DateFieldProps };

import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult,
} from "react-aria-components/TimeField";

import { DateInput } from "./DateInput";
import { Description, FieldError, Label } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const TimeField = <T extends TimeValue>({
  className,
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) => {
  return (
    <AriaTimeField
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
    >
      <Label>{label}</Label>
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTimeField>
  );
};

export { TimeField, type TimeFieldProps };

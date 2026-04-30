import {
  CheckboxGroup as AriaCheckboxGroup,
  FieldError,
  Label,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult,
} from "react-aria-components/CheckboxGroup";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { Description } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

type CheckboxGroupProps = {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
} & AriaCheckboxGroupProps;

const CheckboxGroup = ({
  className,
  children,
  description,
  errorMessage,
  label,
  ...props
}: CheckboxGroupProps) => {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-2")}
    >
      {composeRenderProps(children, (children) => (
        <>
          <Label>{label}</Label>
          {children}
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      ))}
    </AriaCheckboxGroup>
  );
};

export { CheckboxGroup, type CheckboxGroupProps };

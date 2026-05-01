import { ChevronDown, ChevronUp } from "lucide-react";
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  type ValidationResult as AriaValidationResult,
  Button,
  type ButtonProps as StepperButtonProps,
} from "react-aria-components";
import { cn } from "tailwind-variants";

import { FieldError, FieldGroup, Label, Input, Description } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { fieldBorderVariants } from "./form/FieldGroup";

const StepperButton = ({ className, ...props }: StepperButtonProps) => {
  return (
    <Button
      className={cn(
        "flex flex-1 border-0 bg-transparent px-0.5 py-0 text-fg-subtle [-webkit-tap-highlight-color:transparent] group-disabled:text-border pressed:bg-bg-muted",
        className,
      )}
      {...props}
    />
  );
};

type NumberFieldProps = Omit<AriaNumberFieldProps, "children"> & {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
};

const NumberField = ({
  className,
  label,
  placeholder,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) => {
  return (
    <AriaNumberField
      className={composeTailwindRenderProps(
        className,
        "group flex flex-col gap-1",
      )}
      {...props}
    >
      <Label>{label}</Label>
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input className="grow" placeholder={placeholder} />
            <div
              className={fieldBorderVariants({
                ...renderProps,
                className: "flex h-full flex-col border-s",
              })}
            >
              <StepperButton slot="increment">
                <ChevronUp aria-hidden className="size-4" />
              </StepperButton>
              <div
                aria-hidden
                className={fieldBorderVariants({
                  ...renderProps,
                  className: "border-b",
                })}
              />
              <StepperButton slot="decrement">
                <ChevronDown aria-hidden className="size-4" />
              </StepperButton>
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaNumberField>
  );
};

export {
  StepperButton,
  type StepperButtonProps,
  NumberField,
  type NumberFieldProps,
};

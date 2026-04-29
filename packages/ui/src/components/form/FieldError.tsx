import {
  FieldError as AriaFieldError,
  type FieldErrorProps,
} from "react-aria-components";

import { composeTailwindRenderProps } from "../../utils/composeTailwindRenderProps";

const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(
        className,
        "text-sm text-destructive forced-colors:text-[Mark]",
      )}
    />
  );
};

export { FieldError, type FieldErrorProps };

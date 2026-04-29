import { Input as AriaInput, type InputProps } from "react-aria-components";

import { composeTailwindRenderProps } from "../../utils/composeTailwindRenderProps";

const Input = ({ className, ...props }: InputProps) => {
  return (
    <AriaInput
      {...props}
      className={composeTailwindRenderProps(
        className,
        "min-h-9 min-w-0 flex-1 border-0 bg-white px-3 py-0 font-sans text-sm text-neutral-800 outline-0 [-webkit-tap-highlight-color:transparent] placeholder:text-neutral disabled:text-neutral-200 disabled:placeholder:text-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:disabled:text-neutral-600 dark:disabled:placeholder:text-neutral-600",
      )}
    />
  );
};

export { Input, type InputProps };

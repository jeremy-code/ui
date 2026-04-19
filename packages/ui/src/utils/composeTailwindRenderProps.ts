import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge } from "tailwind-merge";

const composeTailwindRenderProps = <T>(
  className: string | ((renderProps: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) => {
  return composeRenderProps(className, (className) => twMerge(tw, className));
};

export { composeTailwindRenderProps };

import { Text, type TextProps } from "react-aria-components/Text";
import { cn } from "tailwind-variants";

type DescriptionProps = TextProps;

const Description = ({ className, ...props }: DescriptionProps) => {
  return (
    <Text
      {...props}
      slot="description"
      className={cn("text-sm text-neutral", className)}
    />
  );
};

export { Description, type DescriptionProps };

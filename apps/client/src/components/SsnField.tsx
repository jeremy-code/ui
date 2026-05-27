import { composeRenderProps } from "react-aria-components/composeRenderProps";

import {
  InputGroup,
  InputGroupInput,
  InputGroupSpan,
  type InputGroupProps,
} from "@ui/ui/components/InputGroup";

type SsnFieldProps = InputGroupProps;

const SsnField = (props: SsnFieldProps) => {
  return (
    <InputGroup {...props}>
      {composeRenderProps(props.children, (children) => (
        <>
          <InputGroupInput
            variant="static"
            maxLength={3}
            aria-label="First 3 digits"
            placeholder="000"
          />
          <InputGroupSpan>-</InputGroupSpan>
          <InputGroupInput
            variant="static"
            maxLength={2}
            aria-label="Middle 2 digits"
            placeholder="00"
          />
          <InputGroupSpan>-</InputGroupSpan>
          <InputGroupInput
            variant="static"
            maxLength={4}
            aria-label="Last 4 digits"
            placeholder="0000"
          />
          {children}
        </>
      ))}
    </InputGroup>
  );
};

export { SsnField };

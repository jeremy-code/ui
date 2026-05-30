import { useState } from "react";

import { composeRenderProps } from "react-aria-components/composeRenderProps";

import {
  InputGroupField,
  InputGroupInput,
  InputGroupSpan,
  type InputGroupFieldProps,
} from "@ui/ui/components/InputGroup";

type SsnFieldProps = InputGroupFieldProps;

type Segments = [string, string, string];

const SsnField = (props: SsnFieldProps) => {
  const [segments, setSegments] = useState<Segments>(["", "", ""]);

  return (
    <InputGroupField
      value={
        segments.every((segment) => segment !== "") ?
          segments.join("-")
        : undefined
      }
      {...props}
    >
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
            value={segments[2]}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setSegments((prevSegments) => [
                prevSegments[0],
                prevSegments[1],
                value,
              ]);
            }}
          />
          {children}
        </>
      ))}
    </InputGroupField>
  );
};

export { SsnField };

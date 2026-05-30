import { useState } from "react";

import { composeRenderProps } from "react-aria-components/composeRenderProps";

import {
  InputGroup,
  InputGroupInput,
  InputGroupSpan,
  type InputGroupProps,
} from "@ui/ui/components/InputGroup";

type SsnFieldProps = InputGroupProps;

type Segments = [string, string, string];

const SsnField = (props: SsnFieldProps) => {
  const [segments, setSegments] = useState<Segments>(["", "", ""]);

  return (
    <InputGroup
      {...props}
      value={
        segments.every((segment) => segment !== "") ?
          segments.join("-")
        : undefined
      }
    >
      {composeRenderProps(props.children, (children) => (
        <>
          <InputGroupInput
            variant="static"
            maxLength={3}
            aria-label="First 3 digits"
            placeholder="000"
            value={segments[0]}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setSegments((prevSegments) => [
                value,
                prevSegments[1],
                prevSegments[2],
              ]);
            }}
          />
          <InputGroupSpan>-</InputGroupSpan>
          <InputGroupInput
            variant="static"
            maxLength={2}
            aria-label="Middle 2 digits"
            placeholder="00"
            value={segments[1]}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setSegments((prevSegments) => [
                prevSegments[0],
                value,
                prevSegments[2],
              ]);
            }}
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
    </InputGroup>
  );
};

export { SsnField };

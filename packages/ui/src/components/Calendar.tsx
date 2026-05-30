import { type ComponentPropsWithRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  type CalendarProps as AriaCalendarProps,
  CalendarCell as AriaCalendarCell,
  type CalendarCellProps,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarHeading,
  type DateValue,
} from "react-aria-components/Calendar";
import { useLocale } from "react-aria-components/I18nProvider";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn, tv } from "tailwind-variants";

import { Button } from "./Button";
import { ErrorMessage } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

const calendarCellVariants = tv({
  extend: focusRing,
  base: "flex aspect-square w-[calc(100cqw/7)] cursor-default items-center justify-center rounded-full text-sm forced-color-adjust-none [-webkit-tap-highlight-color:transparent]",
  variants: {
    isToday: {
      true: "relative after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-current",
    },
    isSelected: {
      false: [
        "text-gray-900 hover:bg-gray-200 pressed:bg-gray-300",
        "dark:text-gray-200 dark:hover:bg-gray-700 dark:pressed:bg-gray-600",
      ],
      true: [
        "bg-accent text-accent-fg invalid:bg-destructive hover:bg-accent-hover",
        "forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]",
      ],
    },
    isDisabled: {
      true: [
        "text-gray-300 dark:text-gray-600",
        "forced-colors:text-[GrayText]",
      ],
    },
  },
});

const CalendarCell = ({ className, ...props }: CalendarCellProps) => (
  <AriaCalendarCell
    {...props}
    className={composeRenderProps(className, (className, renderProps) =>
      calendarCellVariants({
        className,
        ...renderProps,
      }),
    )}
  />
);

type CalendarProps<T extends DateValue> = {
  errorMessage?: string;
} & AriaCalendarProps<T>;

const Calendar = <T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) => {
  const months = props.visibleDuration?.months || 1;

  return (
    <AriaCalendar
      {...props}
      className={composeTailwindRenderProps(props.className, [
        "flex max-w-full gap-2",
      ])}
    >
      {Array.from({ length: months }, (_, i) => (
        <div
          key={i}
          className="@container flex w-[calc(--spacing(9)*7)] max-w-full flex-col"
        >
          <CalendarHeader monthIndex={i} months={months} />
          <CalendarGrid offset={{ months: i }}>
            <CalendarGridHeader />
            <CalendarGridBody>
              {(date) => <CalendarCell date={date} />}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      ))}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AriaCalendar>
  );
};

type CalendarHeaderProps = { monthIndex: number; months: number } & Omit<
  ComponentPropsWithRef<"header">,
  "children"
>;

const CalendarHeader = ({
  className,
  monthIndex,
  months,
  ...props
}: CalendarHeaderProps) => {
  const { direction } = useLocale();
  const PreviousIcon = direction === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = direction === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <header
      className={cn("flex items-center gap-1 px-1 pb-4", className)}
      {...props}
    >
      {monthIndex === 0 && (
        <Button variant="ghost" size="icon-xs" slot="previous">
          <PreviousIcon aria-hidden size={18} />
        </Button>
      )}
      <CalendarHeading
        offset={{ months: monthIndex }}
        className="mx-2 my-0 flex-1 text-center font-sans text-base font-semibold text-fg-boldest [font-variation-settings:normal]"
      />
      {monthIndex === months - 1 && (
        <Button variant="ghost" size="icon-xs" slot="next">
          <NextIcon aria-hidden size={18} />
        </Button>
      )}
    </header>
  );
};

type CalendarGridHeaderProps = Omit<
  ComponentPropsWithRef<typeof AriaCalendarGridHeader>,
  "children"
>;

const CalendarGridHeader = (props: CalendarGridHeaderProps) => {
  return (
    <AriaCalendarGridHeader {...props}>
      {(day) => (
        <CalendarHeaderCell className="text-xs font-semibold text-gray-500">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  );
};

export {
  Calendar,
  type CalendarProps,
  CalendarHeader,
  type CalendarHeaderProps,
  CalendarGridHeader,
  type CalendarGridHeaderProps,
  CalendarCell,
  type CalendarCellProps,
  calendarCellVariants,
};

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "tailwind-variants";

import { type SwitchProps, Switch } from "@ui/ui/components/Switch";

type ThemeToggleProps = SwitchProps;

const ThemeToggle = ({
  switchTrackProps,
  switchHandleProps,
  ...props
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;
  const ariaLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Switch
      isSelected={isDark}
      onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      aria-label={ariaLabel}
      switchTrackProps={{ color: "gray", ...switchTrackProps }}
      switchHandleProps={{
        children: <Icon className="size-4" aria-hidden />,
        ...switchHandleProps,
        className: cn(
          "bg-bg text-gray-600 dark:text-gray-50",
          switchHandleProps?.className,
        ),
      }}
      {...props}
    />
  );
};

export { ThemeToggle, type ThemeToggleProps };

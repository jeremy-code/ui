import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import {
  SwitchRoot,
  SwitchHandle,
  SwitchTrack,
  type SwitchProps,
} from "@ui/ui/components/Switch";

type ThemeToggleProps = SwitchProps;

const ThemeToggle = ({
  children,
  className,
  switchTrackProps,
  size,
  ...props
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;
  const ariaLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <SwitchRoot
      isSelected={isDark}
      onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      aria-label={ariaLabel}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          <SwitchTrack
            color="gray"
            {...switchTrackProps}
            renderProps={renderProps}
          >
            <SwitchHandle className="bg-bg text-gray-600 dark:text-gray-50">
              <Icon className="size-4" aria-hidden />
            </SwitchHandle>
          </SwitchTrack>
          {children}
        </>
      ))}
    </SwitchRoot>
  );
};

export { ThemeToggle, type ThemeToggleProps };

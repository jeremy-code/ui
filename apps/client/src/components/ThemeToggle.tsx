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
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const Icon = isLight ? Sun : Moon;
  const ariaLabel = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <SwitchRoot
      isSelected={isLight}
      onChange={(isSelected) => setTheme(isSelected ? "light" : "dark")}
      aria-label={ariaLabel}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          <SwitchTrack renderProps={renderProps} {...switchTrackProps}>
            <SwitchHandle>
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

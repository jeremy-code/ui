import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "react-aria-components/Switch";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import {
  SwitchHandle,
  SwitchTrack,
  switchVariants,
  type SwitchProps,
} from "@ui/ui/components/Switch";

const ThemeToggle = ({
  children,
  className,
  switchTrackProps,
  size,
  ...props
}: SwitchProps) => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const Icon = isLight ? Sun : Moon;
  const ariaLabel = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Switch
      className={composeRenderProps(className, (className, renderProps) =>
        switchVariants({ className, size, ...renderProps }),
      )}
      isSelected={isLight}
      onChange={(isSelected) => setTheme(isSelected ? "light" : "dark")}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          <SwitchTrack {...switchTrackProps}>
            <SwitchHandle>
              <Icon aria-label={ariaLabel} className="size-4" />
            </SwitchHandle>
          </SwitchTrack>
          {children}
        </>
      ))}
    </Switch>
  );
};

export { ThemeToggle };

import { useTheme } from "next-themes";

import { Checkbox } from "@ui/ui/components/Checkbox";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Checkbox
      isSelected={theme === "dark"}
      onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
    >
      Enable dark mode
    </Checkbox>
  );
};

export { ThemeToggle };

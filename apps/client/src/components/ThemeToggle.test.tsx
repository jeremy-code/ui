import { describe, expect, vi, test } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggle } from "./ThemeToggle";

let mockResolvedTheme = "light";
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  test("renders light theme correctly", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await expect
      .element(screen.getByLabelText("Switch to dark theme"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("theme-toggle"))
      .not.toHaveAttribute("data-selected", "true");
  });

  test("renders dark theme correctly", async () => {
    mockResolvedTheme = "dark";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await expect
      .element(screen.getByLabelText("Switch to light theme"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByTestId("theme-toggle"))
      .toHaveAttribute("data-selected", "true");
  });

  test("switches to dark theme when clicked in light theme", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("dark");
  });

  test("switches to light theme when clicked in dark theme", async () => {
    mockResolvedTheme = "dark";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("light");
  });

  test("renders children", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle>Theme</ThemeToggle>);

    await expect.element(screen.getByText("Theme")).toBeInTheDocument();
  });
});

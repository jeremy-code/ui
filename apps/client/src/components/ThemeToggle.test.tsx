import { describe, expect, vi, test } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";

import { ThemeToggle } from "./ThemeToggle";

let mockTheme = "light";
const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: mockSetTheme, theme: mockTheme }),
}));

describe("ThemeToggle", () => {
  test("renders light mode state correctly", async () => {
    mockTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute(
      "data-selected",
      "true",
    );
  });

  test("renders dark mode state correctly", async () => {
    mockTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).not.toHaveAttribute(
      "data-selected",
      "true",
    );
  });

  test("switches to dark theme when clicked in light mode", async () => {
    const user = userEvent.setup();
    mockTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await user.click(screen.getByTestId("theme-toggle"));

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("dark");
  });

  test("switches to light theme when clicked in dark mode", async () => {
    const user = userEvent.setup();
    mockTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await user.click(screen.getByTestId("theme-toggle"));

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("light");
  });

  test("renders children", async () => {
    const screen = await render(<ThemeToggle>Theme</ThemeToggle>);

    expect(screen.getByText("Theme")).toBeInTheDocument();
  });
});

import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { App } from "#App";

test("App component should exist", async () => {
  const screen = await render(<App />);

  await expect.element(screen.getByText("App")).toBeVisible();
});

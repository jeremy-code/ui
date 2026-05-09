import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { RouterProvider } from "./RouterProvider";

const AppProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <RouterProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </RouterProvider>
  );
};

export { AppProvider };

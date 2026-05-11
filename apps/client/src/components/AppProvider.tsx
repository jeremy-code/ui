import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { ToastRegion } from "@ui/ui/components/Toast";

import { RouterProvider } from "./RouterProvider";

const AppProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <RouterProvider>
      <ThemeProvider>
        {children}
        <ToastRegion />
      </ThemeProvider>
    </RouterProvider>
  );
};

export { AppProvider };

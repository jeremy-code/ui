import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { ToastRegion } from "@ui/ui/components/Toast";

const AppProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <ThemeProvider>
      {children}
      <ToastRegion />
    </ThemeProvider>
  );
};

export { AppProvider };

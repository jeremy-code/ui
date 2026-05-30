/// <reference types="vite/client" />
import type { ReactNode } from "react";

import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useLocale } from "react-aria/I18nProvider";

import { AppProvider } from "#components/AppProvider";
import uiCss from "@ui/ui/globals.css?url";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { locale, direction } = useLocale();

  return (
    /**
     * `suppressHydrationWarning` is necessary since `<html>` element must be
     * updated by `next-themes` for dark mode. The property only applies one
     * level deep, so hydration warnings won't be blocked on children elements.
     *
     * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors}
     * @see {@link https://github.com/pacocoursey/next-themes#:~:text=Note%21%20If,elements}
     */
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootDocument>
      <AppProvider>
        <Outlet />
      </AppProvider>
    </RootDocument>
  );
};

const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Jeremy UI",
      },
    ],
    links: [{ rel: "stylesheet", href: uiCss }],
  }),
  component: RootComponent,
});

export { Route };

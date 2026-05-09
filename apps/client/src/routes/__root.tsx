/// <reference types="vite/client" />
import type { ReactNode } from "react";

import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import uiCss from "@ui/ui/globals.css?url";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html>
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
      <Outlet />
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

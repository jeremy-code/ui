import type { ReactNode } from "react";

import { useRouter } from "@tanstack/react-router";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";
import { RouterProvider as AriaRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const RouterProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  const router = useRouter();

  return (
    <AriaRouterProvider
      navigate={(href, routerOptions) => {
        const target = href as ToOptions | string;
        if (typeof target === "string") {
          return router.navigate({ to: target, ...routerOptions });
        }
        return router.navigate({ ...target, ...routerOptions });
      }}
      useHref={(href) => {
        const target = href as ToOptions | string;
        if (typeof target === "string") {
          return router.buildLocation({ to: target }).href;
        }
        return router.buildLocation(target).href;
      }}
    >
      {children}
    </AriaRouterProvider>
  );
};

export { RouterProvider };

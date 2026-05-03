import { flushSync } from "react-dom";

import { X } from "lucide-react";
import {
  UNSTABLE_ToastRegion as AriaToastRegion,
  type ToastRegionProps as AriaToastRegionProps,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps as AriaToastProps,
  Button,
  Text,
} from "react-aria-components/Toast";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

interface ToastInfo {
  title: string;
  description?: string;
}

const toastQueue = new ToastQueue<ToastInfo>({
  wrapUpdate(fn) {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        // eslint-disable-next-line @eslint-react/dom-no-flush-sync -- Per https://developer.chrome.com/docs/web-platform/view-transitions/same-document#working_with_frameworks and Dan Abramov, this is correct for view transitions
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

const toastRegionVariants = tv({
  extend: focusRing,
  base: ["fixed right-4 bottom-4 flex flex-col-reverse gap-2 rounded-lg"],
});

type ToastRegionProps = Omit<
  AriaToastRegionProps<ToastInfo>,
  "queue" | "children"
>;

const ToastRegion = ({ className, ...props }: ToastRegionProps) => {
  return (
    <AriaToastRegion
      {...props}
      queue={toastQueue}
      className={composeRenderProps(className, (className, renderProps) =>
        toastRegionVariants({ ...renderProps, className }),
      )}
    >
      {({ toast }) => <Toast toast={toast} />}
    </AriaToastRegion>
  );
};

type ToastProps = AriaToastProps<ToastInfo>;

const Toast = ({ toast, ...props }: ToastProps) => {
  return (
    <ToastRoot toast={toast} {...props}>
      <ToastContent className="flex min-w-0 flex-1 flex-col">
        <Text slot="title" className="text-sm font-semibold text-white">
          {toast.content.title}
        </Text>
        {toast.content.description && (
          <Text slot="description" className="text-xs text-white">
            {toast.content.description}
          </Text>
        )}
      </ToastContent>
      <Button
        slot="close"
        aria-label="Close"
        className="flex size-8 flex-none appearance-none items-center justify-center rounded-sm border-none bg-transparent p-0 text-white outline-none [-webkit-tap-highlight-color:transparent] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid pressed:bg-white/15"
      >
        <X className="size-4" />
      </Button>
    </ToastRoot>
  );
};

const ToastRoot = ({ className, ...props }: ToastProps) => {
  return (
    <AriaToast
      {...props}
      style={{ viewTransitionName: props.toast.key, ...props.style }}
      className={composeTailwindRenderProps(
        className,
        "flex w-57.5 items-center gap-4 rounded-lg bg-accent px-4 py-3 font-sans outline-none [view-transition-class:toast] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus-visible:outline-solid forced-colors:outline",
      )}
    />
  );
};

export {
  type ToastInfo,
  toastQueue,
  ToastRegion,
  type ToastRegionProps,
  toastRegionVariants,
  Toast,
  type ToastProps,
  ToastRoot,
};

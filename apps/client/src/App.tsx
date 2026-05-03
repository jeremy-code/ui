import "@ui/ui/globals.css";

import { ThemeProvider } from "next-themes";

import { Button, buttonVariants } from "@ui/ui/components/Button";
import { Checkbox } from "@ui/ui/components/Checkbox";
import {
  Dialog,
  DialogCloseButton,
  DialogTitle,
  DialogTrigger,
} from "@ui/ui/components/Dialog";
import { Link } from "@ui/ui/components/Link";
import { ListBox, ListBoxItem } from "@ui/ui/components/ListBox";
import { Modal } from "@ui/ui/components/Modal";
import { NumberField } from "@ui/ui/components/NumberField";
import { Popover, PopoverTrigger } from "@ui/ui/components/Popover";
import { Select, SelectItem } from "@ui/ui/components/Select";
import { Skeleton } from "@ui/ui/components/Skeleton";
import { Switch } from "@ui/ui/components/Switch";
import { TextField } from "@ui/ui/components/TextField";
import { Focusable, Tooltip, TooltipTrigger } from "@ui/ui/components/Tooltip";
import { Form } from "@ui/ui/components/form/index";
import { Github } from "@ui/ui/components/icons/Github";

import { ThemeToggle } from "./components/ThemeToggle";

const App = () => {
  return (
    <ThemeProvider>
      <div>
        App
        <ThemeToggle />
        <Link color="blue" underline="hover" href="/">
          This is a link
        </Link>
        <Checkbox>Remember me</Checkbox>
        <ListBox aria-label="Favorite animal" selectionMode="multiple">
          <ListBoxItem isDisabled>Aardvark</ListBoxItem>
          <ListBoxItem id="cat">Cat</ListBoxItem>
          <ListBoxItem>Dog</ListBoxItem>
          <ListBoxItem>Kangaroo</ListBoxItem>
          <ListBoxItem>Panda</ListBoxItem>
          <ListBoxItem>Snake</ListBoxItem>
        </ListBox>
        <PopoverTrigger>
          <Button variant="surface" aria-label="Settings">
            Settings
          </Button>
          <Popover className="flex flex-col gap-2 p-4" showArrow>
            Settings
          </Popover>
        </PopoverTrigger>
        <Select label="Favorite Animal">
          <SelectItem>Aardvark</SelectItem>
          <SelectItem>Cat</SelectItem>
          <SelectItem>Dog</SelectItem>
          <SelectItem>Kangaroo</SelectItem>
          <SelectItem>Panda</SelectItem>
          <SelectItem>Snake</SelectItem>
        </Select>
        <Skeleton className="h-13 w-full" />
        <NumberField defaultValue={1024} minValue={0} label="Cents" />
        <TextField label="Poem" />
        <TooltipTrigger>
          <Focusable>
            <span role="button">Test</span>
          </Focusable>
          <Tooltip>Tooltip has been opened</Tooltip>
        </TooltipTrigger>
        <Link
          underline={false}
          className={buttonVariants()}
          href="https://github.com/jeremy-code/ui"
          target="_blank"
        >
          <Github aria-hidden />
          Github
        </Link>
        <DialogTrigger>
          <Button>Sign up…</Button>
          <Modal>
            <Dialog className="flex flex-col gap-4">
              {(renderProps) => (
                <>
                  <DialogCloseButton />
                  <DialogTitle>Subscribe to our newsletter</DialogTitle>
                  <p className="text-sm">
                    Enter your information to subscribe to our newsletter and
                    receive updates about new features and announcements.
                  </p>
                  <Form
                    onSubmit={(event) => {
                      event.preventDefault();
                      renderProps.close();
                    }}
                  >
                    <TextField
                      autoFocus
                      label="Name"
                      placeholder="Enter your full name"
                    />
                    <TextField
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <div className="flex gap-2 self-end">
                      <Button slot="close" variant="ghost">
                        Cancel
                      </Button>
                      <Button type="submit" variant="muted">
                        Subscribe
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
        <div className="flex justify-center">
          <Switch>Switch</Switch>
        </div>
      </div>
    </ThemeProvider>
  );
};

export { App };

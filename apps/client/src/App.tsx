import "@ui/ui/globals.css";

import { ThemeProvider } from "next-themes";

import { Button, buttonVariants } from "@ui/ui/components/Button";
import { Checkbox } from "@ui/ui/components/Checkbox";
import { Link } from "@ui/ui/components/Link";
import { ListBox, ListBoxItem } from "@ui/ui/components/ListBox";
import { NumberField } from "@ui/ui/components/NumberField";
import { Popover, PopoverTrigger } from "@ui/ui/components/Popover";
import { Select, SelectItem } from "@ui/ui/components/Select";
import { Skeleton } from "@ui/ui/components/Skeleton";
import { TextField } from "@ui/ui/components/TextField";
import { Focusable, Tooltip, TooltipTrigger } from "@ui/ui/components/Tooltip";
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
      </div>
    </ThemeProvider>
  );
};

export { App };

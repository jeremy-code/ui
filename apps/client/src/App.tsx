import "@ui/ui/globals.css";

import { ThemeProvider } from "next-themes";

import { Button } from "@ui/ui/components/Button";
import { Checkbox } from "@ui/ui/components/Checkbox";
import { Link } from "@ui/ui/components/Link";
import { ListBox, ListBoxItem } from "@ui/ui/components/ListBox";
import { Popover, PopoverTrigger } from "@ui/ui/components/Popover";
import { Select, SelectItem } from "@ui/ui/components/Select";

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
      </div>
    </ThemeProvider>
  );
};

export { App };

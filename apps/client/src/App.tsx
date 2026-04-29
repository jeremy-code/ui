import "@ui/ui/globals.css";
import { Checkbox } from "@ui/ui/components/Checkbox";
import { Link } from "@ui/ui/components/Link";
import { ListBox, ListBoxItem } from "@ui/ui/components/ListBox";

const App = () => {
  return (
    <div>
      App
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
    </div>
  );
};

export { App };

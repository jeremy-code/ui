import "@ui/ui/globals.css";
import { Checkbox } from "@ui/ui/components/Checkbox";
import { Link } from "@ui/ui/components/Link";

const App = () => {
  return (
    <div>
      App
      <Link color="blue" underline="hover" href="/">
        This is a link
      </Link>
      <Checkbox>Remember me</Checkbox>
    </div>
  );
};

export { App };

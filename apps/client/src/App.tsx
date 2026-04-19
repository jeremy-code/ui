import { Link } from "@ui/ui/components/Link";
import "@ui/ui/globals.css";

const App = () => {
  return (
    <div>
      App
      <Link color="blue" underline="hover" href="/">
        This is a link
      </Link>
    </div>
  );
};

export { App };

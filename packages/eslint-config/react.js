import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import disablesConfig from "./disables.js";
import baseConfig from "./index.js";

const reactConfig = defineConfig(
  // Ignore TanStack Router filesystem route tree
  globalIgnores(["dist", "src/routeTree.gen.ts"]),
  baseConfig,
  eslintReact.configs["recommended-type-checked"],
  reactCompiler["configs"].recommended,
  reactHooks.configs.flat["recommended-latest"],
  {
    name: "@ui/eslint-config/react.js",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
    rules: {
      /**
       * @see {@link https://typescript-eslint.io/rules/no-misused-promises/}
       */
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },
  disablesConfig,
);

export default reactConfig;

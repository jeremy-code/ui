/** @import { Configuration } from "lint-staged" */

/**
 * @see {@link https://github.com/lint-staged/lint-staged#configuration}
 * @satisfies {Configuration}
 */
const lintStagedConfig = {
  /**
   * Prevents turbo from seeing the filenames as tasks and instead passes them
   * as arguments.
   *
   * @see {@link https://turborepo.dev/docs/reference/run}
   */
  "*.{js,mjs,cjs,ts,tsx,mts,cts}": ["turbo run lint --", "prettier --check"],
  "*.{json,md,yaml,yml}": "prettier --check",
};

export default lintStagedConfig;

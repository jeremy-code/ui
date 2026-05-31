import optimizeLocales from "@react-aria/optimize-locales-plugin";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { fontless } from "fontless";
import { Features } from "lightningcss";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

import { version } from "./package.json" with { type: "json" };

const viteConfig = defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    fontless(),
    optimizeLocales.vite({ locales: ["en-US"] }),
    analyzer(),
  ],
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().getTime()),
    __VERSION__: JSON.stringify(version),
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  build: {
    cssMinify: "lightningcss",
    license: { fileName: "license.md" },
  },
});

export default viteConfig;

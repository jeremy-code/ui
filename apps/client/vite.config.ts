import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { Features } from "lightningcss";
import { defineConfig } from "vite";
import { viteWebfontDownload } from "vite-plugin-webfont-dl";

const viteConfig = defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    viteWebfontDownload(),
  ],
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

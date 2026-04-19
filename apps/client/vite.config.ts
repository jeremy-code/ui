import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { Features } from "lightningcss";
import { defineConfig } from "vite";

const viteConfig = defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  css: {
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
});

export default viteConfig;

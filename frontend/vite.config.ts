import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from "tailwindcss";


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        "fs", // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});

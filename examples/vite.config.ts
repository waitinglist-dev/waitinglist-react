import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@waitinglist/react": fileURLToPath(
        new URL("../src/index.ts", import.meta.url)
      ),
    },
  },
  root: "./basic",
  build: {
    outDir: "../dist-examples",
  },
  server: {
    port: 3001,
    open: true,
  },
});

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/index.ts",
      name: "psa-api",
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["socket.io-client"],
      output: [
        {
          format: "es",
          dir: "esm",
          entryFileNames: "index.js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: "index.js",
          globals: {
            "socket.io-client": "io",
          },
        },
      ],
    },
  },
  plugins: [
    dts({
      outDir: ["dist", "esm"],
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],
});

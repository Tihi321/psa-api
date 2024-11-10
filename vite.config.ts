import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/index.ts",
      name: "psa-api",
      fileName: (format) => `psa-api.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["socket.io-client"],
      output: [
        {
          format: "es",
          dir: "esm",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: "psa-api.cjs.js",
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

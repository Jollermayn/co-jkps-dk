import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// Vite SPA build for Vercel deployment.
// Replaces @lovable.dev/vite-tanstack-config which bundled a Cloudflare
// Worker (dist/server) and produced no index.html — causing 404s on Vercel.
export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: "./src/routes", generatedRouteTree: "./src/routeTree.gen.ts" }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      // createServerFn / useServerFn pull in node:async_hooks which cannot
      // run in the browser. Redirect to a no-op stub for the SPA build.
      // VikingChat will be rewired to a Vercel serverless function later.
      "@tanstack/react-start": "/src/lib/tanstack-start-stub.ts",
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

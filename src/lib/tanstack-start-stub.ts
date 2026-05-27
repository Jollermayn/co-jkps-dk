// Stub for @tanstack/react-start server functions.
// createServerFn / useServerFn require SSR. In the Vite SPA build these
// are replaced with this stub so the bundle compiles. The VikingChat
// feature will be wired to a Vercel serverless function separately.

export function createServerFn(_opts?: unknown) {
  return {
    handler: (_fn: unknown) => async (..._args: unknown[]) => {
      throw new Error("Server functions are not available in SPA mode.");
    },
    validator: (_v: unknown) => ({
      handler: (_fn: unknown) => async (..._args: unknown[]) => {
        throw new Error("Server functions are not available in SPA mode.");
      },
    }),
  };
}

export function useServerFn<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return fn;
}

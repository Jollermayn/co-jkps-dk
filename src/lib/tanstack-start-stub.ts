// Stub for @tanstack/react-start server functions.
// createServerFn / useServerFn require SSR. In the Vite SPA build these
// are replaced with this stub so the bundle compiles. The VikingChat
// feature will be wired to a Vercel serverless function separately.

type StubFn = (..._args: unknown[]) => Promise<never>;

function makeStubFn(): StubFn {
  return async (..._args: unknown[]) => {
    throw new Error("Server functions are not available in SPA mode.");
  };
}

function makeServerFnObject(): ServerFnObject {
  return {
    handler: (_fn: unknown) => makeStubFn(),
    validator: (_v: unknown) => makeServerFnObject(),
    inputValidator: (_v: unknown) => makeServerFnObject(),
  };
}

interface ServerFnObject {
  handler: (_fn: unknown) => StubFn;
  validator: (_v: unknown) => ServerFnObject;
  inputValidator: (_v: unknown) => ServerFnObject;
}

export function createServerFn(_opts?: unknown): ServerFnObject {
  return makeServerFnObject();
}

export function useServerFn<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return fn;
}

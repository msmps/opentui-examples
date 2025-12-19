import { plugin, type BunPlugin } from "bun";

// Mock window and document for solid-js/web compatibility
// This is needed because @tanstack/solid-router calls delegateEvents at import time
// biome-ignore lint/suspicious/noExplicitAny: Mocking window and document for solid-js/web compatibility
if (typeof (globalThis as any).window === "undefined") {
  const mockDocument = {
    createElement: () => ({}),
    createElementNS: () => ({}),
    createTextNode: () => ({}),
    createComment: () => ({}),
    importNode: () => ({}),
    addEventListener: () => {},
    removeEventListener: () => {},
    head: {},
    body: {},
  };
  // @ts-expect-error - Mock for CLI environment
  globalThis.window = { document: mockDocument };
  // @ts-expect-error - Mock for CLI environment
  globalThis.document = mockDocument;
}

const solidTransformPlugin: BunPlugin = {
  name: "bun-plugin-tanstack-router",
  setup: (build) => {
    // Redirect solid-js/web server.js to client version (needed for @tanstack/solid-router)
    build.onLoad(
      { filter: /\/node_modules\/solid-js\/web\/dist\/server\.js$/ },
      async (args) => {
        const path = args.path.replace("server.js", "web.js");
        const file = Bun.file(path);
        const code = await file.text();
        return { contents: code, loader: "js" };
      }
    );
  },
};

plugin(solidTransformPlugin);

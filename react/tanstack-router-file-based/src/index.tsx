import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Use memory history since we're in a terminal environment (no browser)
const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

// Create router with the generated route tree
const router = createRouter({
  routeTree,
  history: memoryHistory,
});

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// App component that provides the router
function App() {
  return <RouterProvider router={router} />;
}

// Load the router before rendering (required for initial route matching)
await router.load();

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);

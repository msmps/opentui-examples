import {
  createCliRenderer,
  type KeyEvent,
  TextAttributes,
} from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

// Root layout component with navigation
function RootLayout() {
  const router = useRouter();
  const renderer = useRenderer();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Handle keyboard navigation
  useKeyboard((event: KeyEvent) => {
    if (event.name === "1") router.navigate({ to: "/" });
    if (event.name === "2") router.navigate({ to: "/about" });
    if (event.name === "3") router.navigate({ to: "/settings" });
    if (event.name === "q") renderer.destroy();
  });

  return (
    <box flexDirection="column" flexGrow={1}>
      {/* Header */}
      <box
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={1}
        paddingRight={1}
        borderStyle="single"
        border={["bottom"]}
      >
        <text attributes={TextAttributes.BOLD}>TanStack Router Demo</text>
        <text attributes={TextAttributes.DIM}>Current: {currentPath}</text>
      </box>

      {/* Main content area */}
      <box flexGrow={1} padding={1}>
        <Outlet />
      </box>

      {/* Footer navigation */}
      <box
        flexDirection="row"
        justifyContent="center"
        gap={2}
        paddingTop={1}
        paddingBottom={1}
        borderStyle="single"
        border={["top"]}
      >
        <text
          attributes={
            currentPath === "/"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [1] Home
        </text>
        <text
          attributes={
            currentPath === "/about"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [2] About
        </text>
        <text
          attributes={
            currentPath === "/settings"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [3] Settings
        </text>
        <text attributes={TextAttributes.DIM}>[q] Quit</text>
      </box>
    </box>
  );
}

// Screen components
function Home() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" text="OpenTUI" />
        <text attributes={TextAttributes.DIM}>What will you build?</text>
      </box>
    </box>
  );
}

function About() {
  return (
    <box flexDirection="column" flexGrow={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD} marginBottom={1}>
        About
      </text>
      <text>
        This is a terminal application built with OpenTUI and TanStack Router.
      </text>
    </box>
  );
}

function Settings() {
  return (
    <box flexDirection="column" flexGrow={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD} marginBottom={1}>
        Settings
      </text>
      <box flexDirection="column" marginBottom={1}>
        <text>Theme: Dark</text>
        <text>Notifications: Enabled</text>
      </box>
      <text attributes={TextAttributes.DIM}>
        (Settings are for demonstration only)
      </text>
    </box>
  );
}

function NotFound() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box flexDirection="column" alignItems="center">
        <text fg="red" attributes={TextAttributes.BOLD}>
          Screen Not Found
        </text>
        <text attributes={TextAttributes.DIM}>
          Press [1] to go back to the home screen
        </text>
      </box>
    </box>
  );
}

// Route definitions
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: About,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "settings",
  component: Settings,
});

// Build the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  settingsRoute,
]);

// Use memory history since we're in a terminal environment (no browser)
const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

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

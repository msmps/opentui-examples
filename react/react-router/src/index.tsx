import type { KeyEvent } from "@opentui/core";
import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router";

// Layout component with navigation
function Layout() {
  const renderer = useRenderer();
  const navigate = useNavigate();
  const location = useLocation();

  useKeyboard((event: KeyEvent) => {
    if (event.name === "1") navigate("/");
    if (event.name === "2") navigate("/about");
    if (event.name === "3") navigate("/settings");
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
        <text attributes={TextAttributes.BOLD}>React Router Demo</text>
        <text attributes={TextAttributes.DIM}>
          Current: {location.pathname}
        </text>
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
          fg={location.pathname === "/" ? "cyan" : undefined}
          attributes={location.pathname === "/" ? TextAttributes.BOLD : 0}
        >
          [1] Home
        </text>
        <text
          fg={location.pathname === "/about" ? "cyan" : undefined}
          attributes={location.pathname === "/about" ? TextAttributes.BOLD : 0}
        >
          [2] About
        </text>
        <text
          fg={location.pathname === "/settings" ? "cyan" : undefined}
          attributes={
            location.pathname === "/settings" ? TextAttributes.BOLD : 0
          }
        >
          [3] Settings
        </text>
        <text attributes={TextAttributes.DIM}>[q] Quit</text>
      </box>
    </box>
  );
}

// Home screen component
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

// About screen component
function About() {
  return (
    <box flexDirection="column" flexGrow={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD} marginBottom={1}>
        About
      </text>
      <text>
        This is a terminal application built with OpenTUI and React Router.
      </text>
    </box>
  );
}

// Settings screen component
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

// Not Found screen component
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

// Create the router with routes
const router = createMemoryRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// App component that provides the router
function App() {
  return <RouterProvider router={router} />;
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);

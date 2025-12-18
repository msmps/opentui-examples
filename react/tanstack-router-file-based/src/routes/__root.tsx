import { type KeyEvent, TextAttributes } from "@opentui/core";
import { useKeyboard, useRenderer } from "@opentui/react";
import {
  createRootRoute,
  Outlet,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

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
        <text attributes={TextAttributes.BOLD}>
          TanStack Router File-Based Demo
        </text>
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

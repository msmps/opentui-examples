import { TextAttributes } from "@opentui/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

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

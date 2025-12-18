import { TextAttributes } from "@opentui/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

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

import React from "react";
import type { Disposable, FatNotesPluginSDK } from "fat-notes-sdk";
import AtlasPage from "./AtlasPage";

const PAGE_ID = "human-atlas.main";
const disposables: Disposable[] = [];

function readActivityMenuKey(state: unknown): string | undefined {
  if (!state || typeof state !== "object") return undefined;
  const frame = (state as { frame?: unknown }).frame;
  if (!frame || typeof frame !== "object") return undefined;
  const key = (frame as { activityMenuKey?: unknown }).activityMenuKey;
  return typeof key === "string" ? key : undefined;
}

export async function activate(sdk: FatNotesPluginSDK): Promise<void> {
  disposables.push(
    sdk.contributions.registerActivityBarItem({
      id: PAGE_ID,
      title: "人体图谱",
      pluginName: "人体图谱",
      icon: "[icon]UserOutlined",
    }),
  );

  disposables.push(
    sdk.contributions.registerWorkbenchPage({
      id: PAGE_ID,
      render: () => React.createElement(AtlasPage, { sdk }),
    }),
  );

  const activityKey = `bespoke:${PAGE_ID}`;
  let hideSidebar: Disposable | null = null;
  let hidePanel: Disposable | null = null;
  const syncChrome = (activeKey: string | undefined): void => {
    const active = activeKey === activityKey;
    if (active && !hideSidebar) {
      hideSidebar = sdk.contributions.registerHideSecondarySidebar();
    } else if (!active && hideSidebar) {
      hideSidebar.dispose();
      hideSidebar = null;
    }
    if (active && !hidePanel) {
      hidePanel = sdk.contributions.registerHidePanel();
    } else if (!active && hidePanel) {
      hidePanel.dispose();
      hidePanel = null;
    }
  };

  syncChrome(sdk.store.select(readActivityMenuKey));
  disposables.push(
    sdk.store.subscribe(readActivityMenuKey, (nextKey) => syncChrome(nextKey)),
  );
  disposables.push({
    dispose() {
      hideSidebar?.dispose();
      hidePanel?.dispose();
      hideSidebar = null;
      hidePanel = null;
    },
  });
}

export function deactivate(): void {
  while (disposables.length) {
    try {
      disposables.pop()?.dispose();
    } catch {
      // deactivate must not throw
    }
  }
}

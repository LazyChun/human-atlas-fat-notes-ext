import React from "react";
import type { Disposable, FatNotesPluginSDK } from "fat-notes-sdk";
import AtlasPage from "./AtlasPage";
import { shellTitle } from "./shellCopy";

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
  let activity: Disposable | null = null;
  let activityLocale = "";
  const syncActivityTitle = (locale: string): void => {
    if (activity && locale === activityLocale) return;
    activityLocale = locale;
    const title = shellTitle(locale);
    activity?.dispose();
    activity = sdk.contributions.registerActivityBarItem({
      id: PAGE_ID,
      title,
      pluginName: title,
      icon: "[icon]UserOutlined",
    });
  };
  syncActivityTitle(sdk.ui?.i18n?.locale || "zh_CN");
  if (sdk.ui?.i18n) {
    disposables.push(sdk.ui.i18n.onChange(syncActivityTitle));
  }
  disposables.push({
    dispose() {
      activity?.dispose();
      activity = null;
    },
  });

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

import type { ReactNode } from "react";

export interface Disposable {
  dispose(): void;
}

export interface FatNotesPluginSDK {
  host: { version: string; mode: "dev" | "prod" };
  pluginId: string;
  contributions: {
    registerActivityBarItem(def: {
      id: string;
      title: string;
      icon: string;
      pluginName?: string;
    }): Disposable;
    registerWorkbenchPage(def: {
      id: string;
      render: () => ReactNode;
    }): Disposable;
    registerHideSecondarySidebar(): Disposable;
    registerHidePanel(): Disposable;
  };
  store: {
    select<T>(selector: (state: unknown) => T): T;
    subscribe<T>(
      selector: (state: unknown) => T,
      cb: (value: T) => void,
    ): Disposable;
  };
  ui: {
    i18n: {
      locale: string;
      onChange(cb: (locale: string) => void): Disposable;
    };
  };
}

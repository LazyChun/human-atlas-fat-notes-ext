export function isEnglishLocale(locale: string | undefined): boolean {
  return String(locale || "").toLowerCase().replace(/-/g, "_").startsWith("en");
}

export function shellTitle(locale: string | undefined): string {
  return isEnglishLocale(locale) ? "Human Atlas" : "人体图谱";
}

export function shellMissingCopy(locale: string | undefined): { title: string; body: string } {
  if (isEnglishLocale(locale)) {
    return {
      title: "Human Atlas is not built yet",
      body: "Install the upstream dependencies in human-atlas-fat-notes-ext, then build the plugin:",
    };
  }
  return {
    title: "人体图谱还没有构建",
    body: "在 human-atlas-fat-notes-ext 里先安装上游依赖，再构建插件：",
  };
}

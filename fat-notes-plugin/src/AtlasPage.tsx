import React, { useEffect, useState } from "react";
import type { FatNotesPluginSDK } from "fat-notes-sdk";

declare let __webpack_public_path__: string;

function resolveDistBase(pluginId: string): string {
  const scripts = document.getElementsByTagName("script");
  for (let i = scripts.length - 1; i >= 0; i -= 1) {
    const src = scripts[i]?.src || "";
    if (!src.includes(pluginId) || !src.includes("remoteEntry.js")) continue;
    const clean = src.split("?")[0]?.split("#")[0] || "";
    const slash = clean.lastIndexOf("/");
    if (slash >= 0) return clean.slice(0, slash + 1);
  }
  const pub = typeof __webpack_public_path__ === "string" ? __webpack_public_path__ : "";
  if (pub && pub !== "auto") return pub.endsWith("/") ? pub : `${pub}/`;
  return "";
}

function AtlasFrame({ sdk }: { sdk: FatNotesPluginSDK }) {
  const base = resolveDistBase(sdk.pluginId);
  const src = base ? `${base}atlas/index.html` : "";
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!src) {
      setMissing(true);
      return;
    }
    let cancelled = false;
    setMissing(false);
    fetch(src)
      .then((response) => {
        if (!cancelled) setMissing(!response.ok);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!src || missing) {
    return (
      <div style={messageStyle}>
        <strong>人体图谱还没有构建</strong>
        <p>
          在 human-atlas-fat-notes-ext 里先安装上游依赖，再构建插件：
        </p>
        <pre>{`npm ci
cd fat-notes-plugin
npm install
npm run build`}</pre>
      </div>
    );
  }

  return (
    <iframe
      title="人体图谱"
      src={src}
      style={{
        width: "100%",
        height: "100%",
        border: 0,
        display: "block",
        background: "#f3f4f4",
      }}
    />
  );
}

const messageStyle: React.CSSProperties = {
  height: "100%",
  boxSizing: "border-box",
  padding: 24,
  color: "#24313c",
  font: "14px/1.6 sans-serif",
};

export default function AtlasPage({ sdk }: { sdk: FatNotesPluginSDK }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 0 }}>
      <AtlasFrame sdk={sdk} />
    </div>
  );
}

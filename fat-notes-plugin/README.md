# 人体图谱 · FatNotes 插件

这个目录是 FatNotes 子插件的适配层。上游 Human Atlas 的页面、组件和 `vite.config.ts` 不放在这里，后面把 fork 更新合并进来时，冲突应只可能出现在仓库根目录的 `tsconfig.json`（多了一条 `exclude`）。

插件壳用宿主的 React 18，通过 iframe 打开 Vite 打出来的图谱页面。图谱仍使用自己的 React 19，两边不共享组件树。页面里对 `/models/...` 的请求会在 `viewer/index.html` 里改写到插件目录，所以上游源码不用改路径。

## 构建

图谱构建和上游一样，需要 Node.js 22.13 或更高。Node 20.12 跑不了当前的 Vite。

在仓库根目录安装上游依赖（图谱本体需要它）：

```sh
npm ci
```

然后构建插件：

```sh
cd fat-notes-plugin
npm install
npm run build
```

产物在 `fat-notes-plugin/dist/`：`remoteEntry.js` 是插件入口，`atlas/` 是图谱页面和模型。

只改了插件壳时，可以 `npm run dev` 监听壳。上游页面有变动时，再执行 `npm run build:atlas`。

## 在 FatNotes 里使用

开发模式把插件的 `devPath` 指到 `fat-notes-plugin/dist`，`devMode` 打开。活动栏会出现「人体图谱」。`plugin.json` 里的 `id` 与 `mfName` 需要和宿主注册的一致；当前固定为：

- id: `e7a41c90-6b2d-4f58-8c13-9d0a5e2b7f64`
- mfName: `plugin_e7a41c90_6b2d_4f58_8c13_9d0a5e2b7f64`

如果在宿主里新建插件时生成了另一个 id，把新的 `mfName`（`plugin_` 加上把 `-` 换成 `_` 的 id）写回 `plugin.json` 后重新 `npm run build:shell`。

## 合并上游

拉取 fork 更新后，在仓库根目录 `npm ci`，再在本目录执行 `npm run build:atlas`。不要把插件文件挪进 `app/`、`components/` 或 `web/`。

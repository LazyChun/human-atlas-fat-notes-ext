/*
 * FatNotes Module Federation shell.
 * The anatomy app itself is built by Vite into dist/atlas and is not part of
 * this bundle, so upstream React 19 code never shares the host's React 18.
 */
const fs = require("fs");
const path = require("path");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

const manifest = require("./plugin.json");

const MF_NAME =
  process.env.PLUGIN_MF_NAME ||
  manifest.mfName ||
  manifest.container ||
  "plugin_e7a41c90_6b2d_4f58_8c13_9d0a5e2b7f64";

class CopyManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("CopyHumanAtlasManifest", () => {
      const dist = path.resolve(__dirname, "dist");
      fs.mkdirSync(dist, { recursive: true });
      for (const name of ["plugin.json", "funcs.json"]) {
        fs.copyFileSync(path.resolve(__dirname, name), path.join(dist, name));
      }
    });
  }
}

module.exports = (_, argv) => {
  const isProd = argv && argv.mode === "production";
  console.log(`[Human-Atlas] building remoteEntry as MF name: "${MF_NAME}"`);
  return {
    entry: "./src/bootstrap.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contenthash:8].js" : "[name].js",
      chunkFilename: isProd ? "[name].[contenthash:8].js" : "[name].js",
      publicPath: "auto",
      clean: {
        keep(asset) {
          const normalized = String(asset).replace(/\\/g, "/");
          return (
            normalized === "atlas" ||
            normalized.startsWith("atlas/") ||
            normalized.includes("/atlas/")
          );
        },
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: MF_NAME,
        filename: "remoteEntry.js",
        library: { type: "global", name: MF_NAME },
        exposes: {
          "./plugin": "./src/index.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: "18.2.0", eager: false },
          "react-dom": {
            singleton: true,
            requiredVersion: "18.2.0",
            eager: false,
          },
          "react/jsx-runtime": {
            singleton: true,
            requiredVersion: "18.2.0",
            eager: false,
          },
        },
      }),
      new CopyManifestPlugin(),
    ],
    devtool: isProd ? false : "source-map",
    optimization: { minimize: isProd },
  };
};

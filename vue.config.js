const path = require("path");
const vueSrc = "./src";
const modules = "./src/modules";
const assets = "./src/assets";
const components = "./src/components";
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vand-test/" : "/",
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc),
        "@assets": path.resolve(__dirname, assets),
        "@modules": path.resolve(__dirname, modules),
        "@components": path.resolve(__dirname, components),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
};

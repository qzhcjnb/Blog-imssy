import { defineConfig } from "vitepress";
import { createRssFile } from "./theme/utils/generateRSS.mjs";
import { themeConfig, siteBasicData } from "./theme/assets/themeConfig.mjs";
import { withPwa } from "@vite-pwa/vitepress";
import headLinks from "./theme/assets/headLinks.mjs";
import path from "path";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    title: siteBasicData.title,
    description: siteBasicData.description,
    lang: "zh-CN",
    // 简洁的 URL
    cleanUrls: true,
    // 最后更新时间戳
    lastUpdated: true,
    // 主题
    appearance: "dark",
    // Head
    head: headLinks,
    // sitemap
    sitemap: {
      hostname: "https://blog.imsyy.top",
    },
    // 主题配置
    themeConfig,
    // markdown
    markdown: {
      lineNumbers: true,
      image: {
        lazyLoading: true,
      },
    },
    // 构建排除
    srcExclude: ["**/README.md", "**/TODO.md"],
    // buildEnd
    buildEnd: createRssFile,
    // vite
    vite: {
      plugins: [],
      resolve: {
        // 配置路径别名
        alias: {
          // eslint-disable-next-line no-undef
          "@": path.resolve(__dirname, "./theme"),
        },
      },
      // 服务器
      server: {
        port: 9877,
      },
      // 构建
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      },
    },
    // PWA
    pwa: {
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // 资源缓存
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
            handler: "CacheFirst",
            options: {
              cacheName: "file-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
        // 排除路径
        navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/feed.xml$/],
      },
      manifest: {
        name: siteBasicData.title,
        short_name: siteBasicData.title,
        description: siteBasicData.description,
        display: "standalone",
        start_url: "/",
        theme_color: "#fff",
        background_color: "#efefef",
        icons: [
          {
            src: "/images/logo/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
  }),
);

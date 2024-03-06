import { defineConfig } from "vitepress";
import { createRssFile } from "./theme/utils/generateRSS.mjs";
import { themeConfig, siteBasicData } from "./theme/assets/themeConfig.mjs";
import { withPwa } from "@vite-pwa/vitepress";
import {
  getAllPosts,
  getAllType,
  getAllCategories,
  getAllArchives,
} from "./theme/utils/getPostData.mjs";
import headLinks from "./theme/assets/headLinks.mjs";
import markdownItAttrs from "markdown-it-attrs";
import path from "path";

// 获取全局数据
const postData = await getAllPosts();

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
    themeConfig: {
      ...themeConfig,
      // 必要数据
      postData: postData,
      tagsData: getAllType(postData),
      categoriesData: getAllCategories(postData),
      archivesData: getAllArchives(postData),
    },
    // markdown
    markdown: {
      lineNumbers: true,
      image: {
        lazyLoading: true,
      },
      config: (md) => {
        // 插件
        md.use(markdownItAttrs);
        // 表格规则
        md.renderer.rules.table_open = () => {
          return '<div class="table-container"><table>';
        };
        md.renderer.rules.table_close = () => {
          return "</table></div>";
        };
        // 图片规则
        md.renderer.rules.image = (tokens, idx) => {
          const token = tokens[idx];
          const src = token.attrs[token.attrIndex("src")][1];
          const alt = token.content;
          return `<a class="img-fancybox" href="${src}" data-fancybox="gallery" data-caption="${alt}">
                    <img class="post-img" src="${src}" alt="${alt}" loading="lazy" />
                    <span class="post-img-tip">${alt}</span>
                  </a>`;
        };
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
      selfDestroying: true,
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
          {
            urlPattern: /^https:\/\/cdn2\.codesign\.qq\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "iconfont-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 2,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // 缓存文件
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}"],
        // 排除路径
        navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/rss.xml$/, /^\/robots.txt$/],
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
            src: "/images/logo/favicon-32x32.webp",
            sizes: "32x32",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-96x96.webp",
            sizes: "96x96",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-256x256.webp",
            sizes: "256x256",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
    },
  }),
);

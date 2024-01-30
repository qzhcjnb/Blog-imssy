// 外部资源引入
const headLinks = [
  // HarmonyOS font
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css",
    },
  ],
  // iconfont
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
    },
  ],
  // Embed code
  ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
  ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
  [
    "link",
    {
      href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap",
      rel: "stylesheet",
    },
  ],
  // vanilla-lazyload
  [
    "script",
    { src: "https://cdn.staticfile.net/vanilla-lazyload/17.8.5/lazyload.min.js", defer: true },
  ],
  // Fancybox
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn.staticfile.net/fancyapps-ui/4.0.31/fancybox.min.css",
    },
  ],
  ["script", { src: "https://cdn.staticfile.net/fancyapps-ui/4.0.31/fancybox.umd.js" }],
];

export default headLinks;

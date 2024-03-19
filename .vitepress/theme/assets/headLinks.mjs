// Head
const headLinks = [
  // favicon
  ["link", { rel: "icon", href: "/favicon.ico" }],
  [
    "link",
    {
      rel: "canonical",
      href: "https://blog.imsyy.top/",
    },
  ],
  // 预载 CDN
  [
    "link",
    {
      crossorigin: "",
      rel: "preconnect",
      href: "https://s1.hdslb.com",
    },
  ],
  [
    "link",
    {
      crossorigin: "",
      rel: "preconnect",
      href: "https://cdn.staticfile.org",
    },
  ],
  // HarmonyOS font
  [
    "link",
    {
      crossorigin: "anonymous",
      rel: "stylesheet",
      href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css",
    },
  ],
  [
    "link",
    {
      crossorigin: "anonymous",
      rel: "stylesheet",
      href: "https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.7.0/style.css",
    },
  ],
  // iconfont
  [
    "link",
    {
      crossorigin: "anonymous",
      rel: "stylesheet",
      href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
    },
  ],
  // Embed code
  ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
  ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
  [
    "link",
    {
      crossorigin: "anonymous",
      href: "https://use.sevencdn.com/css2?family=Fira+Code:wght@300..700&display=swap",
      rel: "stylesheet",
    },
  ],
  // Fancybox
  [
    "link",
    {
      rel: "stylesheet",
      crossorigin: "anonymous",
      href: "https://cdn.staticfile.net/fancyapps-ui/4.0.27/fancybox.min.css",
    },
  ],
  ["script", { src: "https://cdn.staticfile.net/fancyapps-ui/4.0.27/fancybox.umd.js" }],
  // 预载 DocSearch
  [
    "link",
    {
      href: "https://X5EBEZB53I-dsn.algolia.net",
      rel: "preconnect",
      crossorigin: "",
    },
  ],
  // 百度统计
  ["meta", { name: "baidu-site-verification", content: "codeva-w1yWYD5DlA" }],
  ["script", { src: "https://hm.baidu.com/hm.js?9267c4f28b616921175e384bf7835a4a" }],
  // 51 LA
  ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "https://sdk.51.la/js-sdk-pro.min.js" }],
  ["script", {}, `LA.init({id:"KKMqCI5RC3srS4kX",ck:"KKMqCI5RC3srS4kX",hashMode:true})`],
];

export default headLinks;

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
  // Fancybox
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn.staticfile.net/fancyapps-ui/4.0.31/fancybox.min.css",
    },
  ],
  ["script", { src: "https://cdn.staticfile.net/fancyapps-ui/4.0.31/fancybox.umd.js" }],
  // 百度统计
  ["script", { src: "https://hm.baidu.com/hm.js?9267c4f28b616921175e384bf7835a4a" }],
  // 51 LA
  ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "https://sdk.51.la/js-sdk-pro.min.js" }],
  ["script", {}, `LA.init({id:"KKMqCI5RC3srS4kX",ck:"KKMqCI5RC3srS4kX",hashMode:true})`],
];

export default headLinks;

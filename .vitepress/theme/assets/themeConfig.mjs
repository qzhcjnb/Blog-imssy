// 站点基础数据
export const siteBasicData = {
  title: "無名小栈",
  description: "分享技术与科技生活",
  logo: "/images/logo/logo.webp",
  site: "https://blog.imsyy.top",
  author: {
    name: "無名",
    cover: "/images/logo/logo.webp",
    email: "one@imsyy.top",
    link: "https://www.imsyy.top",
  },
};

// 主题配置
export const themeConfig = {
  // 站点信息
  ...siteBasicData,
  // 备案信息
  icp: "豫ICP备2022018134号-1",
  // 建站日期
  since: "2020-07-28",
  // 每页文章数据
  postSize: 8,
  // 导航栏菜单
  nav: [
    {
      text: "文库",
      items: [
        { text: "文章列表", link: "/pages/archives", icon: "article" },
        { text: "全部分类", link: "/pages/categories", icon: "folder" },
        { text: "全部标签", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "专栏",
      items: [
        { text: "技术分享", link: "/pages/categories/技术分享", icon: "technical" },
        { text: "我的项目", link: "/pages/project", icon: "code" },
        { text: "效率工具", link: "/pages/tools", icon: "tools" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友链鱼塘", link: "/pages/friends", icon: "fish" },
        { text: "友情链接", link: "/pages/link", icon: "people" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "畅所欲言", link: "/pages/message", icon: "chat" },
        { text: "关于本站", link: "/pages/about", icon: "contacts" },
      ],
    },
  ],
  navMore: [
    {
      name: "博客",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "主站",
          url: "/",
        },
        {
          icon: "/images/logo/logo.webp",
          name: "博客镜像站",
          url: "https://blog-backup.imsyy.top/",
        },
      ],
    },
    {
      name: "服务",
      list: [
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
          name: "起始页",
          url: "https://nav.imsyy.top/",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
          name: "今日热榜",
          url: "https://hot.imsyy.top/",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
          name: "站点监测",
          url: "https://status.imsyy.top/",
        },
      ],
    },
    {
      name: "项目",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "Curve",
          url: "https://github.com/imsyy/vitepress-theme-curve",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/07/66124f5fc63c8.png",
          name: "SPlayer",
          url: "https://github.com/imsyy/SPlayer",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
          name: "Snavigation",
          url: "https://github.com/imsyy/SPlayer",
        },
        {
          icon: "/images/logo/logo.webp",
          name: "Home",
          url: "https://github.com/imsyy/home",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
          name: "DailyHotApi",
          url: "https://github.com/imsyy/DailyHotApi",
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
          name: "site-status",
          url: "https://github.com/imsyy/site-status",
        },
      ],
    },
  ],
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "email",
        link: "mailto:one@imsyy.top",
      },
      {
        icon: "github",
        link: "https://www.github.com/imsyy/",
      },
      {
        icon: "telegram",
        link: "https://t.me/bottom_user",
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/98544142",
      },
      {
        icon: "qq",
        link: "https://res.abeim.cn/api/qq/?qq=1539250352",
      },
      {
        icon: "twitter-x",
        link: "https://twitter.com/iimmsyy",
      },
    ],
    // sitemap
    sitemap: [
      // 不要超过 7 组
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/pages/categories" },
          { text: "全部标签", link: "/pages/tags" },
          { text: "文章归档", link: "/pages/archives", newTab: true },
        ],
      },
      {
        text: "项目",
        items: [
          { text: "Home", link: "https://github.com/imsyy/home/", newTab: true },
          { text: "SPlayer", link: "https://github.com/imsyy/SPlayer/", newTab: true },
          { text: "DailyHotApi", link: "https://github.com/imsyy/DailyHotApi/", newTab: true },
          { text: "Snavigation", link: "https://github.com/imsyy/Snavigation/", newTab: true },
        ],
      },
      {
        text: "专栏",
        items: [
          { text: "技术分享", link: "/pages/categories/技术分享" },
          { text: "我的项目", link: "/pages/project" },
          { text: "效率工具", link: "/pages/tools" },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "畅所欲言", link: "/pages/message" },
          { text: "关于本站", link: "/pages/about" },
          { text: "隐私政策", link: "/pages/privacy" },
          { text: "版权协议", link: "/pages/cc" },
        ],
      },
      {
        text: "服务",
        items: [
          { text: "站点状态", link: "https://status.imsyy.top/", newTab: true },
          { text: "一个导航", link: "https://nav.imsyy.top/", newTab: true },
          { text: "站点订阅", link: "https://blog.imsyy.top/rss.xml", newTab: true },
          {
            text: "反馈投诉",
            link: "https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",
            newTab: true,
          },
        ],
      },
    ],
  },
  // 技能数据
  skillsData: [
    {
      name: "JavaScript",
      color: "#f1e05abd",
      icon: "javascript",
      link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
    },
    {
      name: "HTML5",
      color: "#e34f26",
      icon: "html5",
      link: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
    },
    {
      name: "CSS3",
      color: "#563d7c",
      icon: "css3",
      link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS",
    },
    {
      name: "Vue",
      color: "#41b883",
      icon: "vue",
      link: "https://cn.vuejs.org/",
    },
    {
      name: "React",
      color: "#149ECA",
      icon: "react",
      link: "https://zh-hans.reactjs.org/",
    },
    {
      name: "Node.js",
      color: "#026E00",
      icon: "nodejs",
      link: "https://nodejs.org/",
    },
    {
      name: "Python",
      color: "#3776AB",
      icon: "python",
      link: "https://www.python.org/",
    },
    {
      name: "Docker",
      color: "#2496f2",
      icon: "docker",
      link: "https://www.docker.com/",
    },
    {
      name: "Git",
      color: "#F05032",
      icon: "git",
      link: "https://git-scm.com/",
    },
    {
      name: "Photoshop",
      color: "#31A8FF",
      icon: "photoshop",
      link: "https://www.adobe.com/cn/lead/creativecloud/business.html",
    },
    {
      name: "ChatGPT",
      color: "#4AA181",
      icon: "chatgpt",
      link: "https://chat.openai.com/",
    },
  ],
  // 评论
  comment: {
    enable: true,
    // 评论系统选择
    type: "artalk",
    // 评论系统配置
    artalk: {
      site: "無名小栈",
      server: "https://artalk.efefee.cn",
    },
  },
  // 打赏
  rewardData: {
    enable: true,
    // 微信二维码
    wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    // 支付宝二维码
    alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp",
  },
  // 外链中转
  jumpRedirect: {
    enable: true,
    // 排除类名
    exclude: [
      "cf-friends-link",
      "upyun",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
    ],
  },
  // 站点统计
  tongji: {
    "51la": "KKMqCI5RC3srS4kX",
  },
  // 服务地址
  serverData: {
    // 友链朋友圈
    circleOfFriends: "https://friends.efefee.cn",
  },
};

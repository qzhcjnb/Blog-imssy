import {
  getAllPosts,
  getAllType,
  getAllCategories,
  getAllArchives,
} from "../utils/getPostData.mjs";

// 获取全局数据
const postData = await getAllPosts();

// 站点基础数据
export const siteBasicData = {
  title: "無名小栈",
  description: "分享技术与科技生活",
  logo: "/images/logo/logo.png",
  site: "https://blog.imsyy.top",
  author: {
    text: "無名",
    cover: "/images/logo/logo.png",
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
        { text: "设计报告", link: "/pages/about" },
        { text: "实际分享", link: "/api-examples" },
        { text: "设计工具", link: "/api-examples" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友链鱼塘", link: "/pages/about" },
        { text: "友情链接", link: "/api-examples" },
        { text: "宝藏博主", link: "/api-examples" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "我的装备", link: "/pages/about" },
        { text: "在线工具", link: "/api-examples" },
        { text: "关于本站", link: "https://www.imsyy.top" },
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
      // 不要超过 8 组
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "https://www.imsyy.top", newTab: true },
        ],
      },
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "/api-examples" },
        ],
      },
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "/api-examples" },
        ],
      },
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "/api-examples" },
        ],
      },
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "/api-examples" },
        ],
      },
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/api-examples" },
          { text: "全部标签", link: "/api-examples" },
          { text: "文章归档", link: "/api-examples" },
        ],
      },
    ],
  },
  // 必要数据
  postData: postData,
  tagsData: getAllType(postData),
  categoriesData: getAllCategories(postData),
  archivesData: getAllArchives(postData),
};

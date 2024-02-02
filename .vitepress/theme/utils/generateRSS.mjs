import { createContentLoader } from "vitepress";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import path from "path";

const hostLink = "https://blog.imsyy.top";

export const createRssFile = async (config) => {
  // Feed 实例
  const feed = new Feed({
    title: "無名小栈",
    description: "分享技术与科技生活",
    id: hostLink,
    link: hostLink,
    language: "zh-CH",
    favicon: "https://pic.imgdb.cn/item/65bc52b0871b83018a06699d.png",
    copyright: "Copyright © 2020-present imsyy",
  });
  // 加载文章
  let posts = await createContentLoader("posts/**/*.md", {
    render: true,
  }).load();
  // 日期降序排序
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
  for (const { url, html, frontmatter } of posts) {
    // 仅保留最近 10 篇文章
    if (feed.items.length >= 10) break;
    // 文章信息
    const { title, description } = frontmatter;
    // 添加文章
    feed.addItem({
      title,
      id: `${hostLink}${url}`,
      link: `${hostLink}${url}`,
      description,
      content: html,
      author: [
        {
          name: "無名",
          email: "one@imsyy.top",
          link: "https://www.imsyy.top",
        },
      ],
    });
  }
  // 写入文件
  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
};

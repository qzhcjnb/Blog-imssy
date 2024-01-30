import { getAllPosts } from "../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();

// 文章分页动态路由
export default {
  paths() {
    // 计算总的页数，每页 10 篇文章
    const totalPages = Math.ceil(postData.length / 10);
    const pages = [];
    // 生成每一页的路由参数
    for (let num = 1; num <= totalPages; num++) {
      pages.push({ params: { num: num.toString() } });
    }
    console.info("文章动态路由：", pages);
    return pages;
  },
};

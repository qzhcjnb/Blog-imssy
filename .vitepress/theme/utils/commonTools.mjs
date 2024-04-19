import { themeConfig } from "../assets/themeConfig.mjs";
import { load } from "cheerio";

/**
 * 从文件名生成数字 ID
 * @param {string} fileName - 文件名
 * @returns {number} - 生成的数字ID
 */
export const generateId = (fileName) => {
  // 将文件名转换为哈希值
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
  }
  // 将哈希值转换为正整数
  const numericId = Math.abs(hash % 10000000000);
  return numericId;
};

/**
 * 创建或者刷新脚本标签
 * @param {string} src - 脚本 URL
 */
export const loadScript = (src, async = false) => {
  if (typeof document === "undefined" || !src) return false;
  // 检查是否已经加载过此脚本
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) existingScript.remove();
  // 创建一个新的script标签并加载
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    if (async) script.async = true;
    script.onload = () => resolve(script);
    script.onerror = reject;
    document.head.append(script);
  });
};

/**
 * 跳转中转页
 * @param {string} html - 页面内容
 * @param {boolean} isDom - 是否为 DOM 对象
 */
export const jumpRedirect = (html, isDom = false) => {
  try {
    // 是否为开发环境
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return false;
    // 是否启用
    if (!themeConfig.jumpRedirect.enable) return html;
    // 中转页地址
    const redirectPage = "/redirect";
    // 排除的 className
    const excludeClass = themeConfig.jumpRedirect.exclude;
    if (isDom) {
      if (typeof window === "undefined" || typeof document === "undefined") return false;
      // 所有链接
      const allLinks = [...document.getElementsByTagName("a")];
      if (allLinks?.length === 0) return false;
      allLinks.forEach((link) => {
        // 检查链接是否包含 target="_blank" 属性
        if (link.getAttribute("target") === "_blank") {
          // 检查链接是否包含排除的类
          if (excludeClass.some((className) => link.classList.contains(className))) {
            return false;
          }
          const linkHref = link.getAttribute("href");
          // 存在链接且非中转页
          if (linkHref && !linkHref.includes(redirectPage)) {
            // Base64
            const encodedHref = btoa(linkHref);
            const redirectLink = `${redirectPage}?url=${encodedHref}`;
            // 保存原始链接
            link.setAttribute("original-href", linkHref);
            // 覆盖 href
            link.setAttribute("href", redirectLink);
          }
        }
      });
    } else {
      const $ = load(html);
      // 替换符合条件的标签
      $("a[target='_blank']").each((_, el) => {
        const $a = $(el);
        const href = $a.attr("href");
        const classesStr = $a.attr("class");
        const innerText = $a.text();
        // 检查是否包含排除的类
        const classes = classesStr ? classesStr.trim().split(" ") : [];
        if (excludeClass.some((className) => classes.includes(className))) {
          return;
        }
        // 存在链接且非中转页
        if (href && !href.includes(redirectPage)) {
          // Base64 编码 href
          const encodedHref = Buffer.from(href, "utf-8").toString("base64");
          // 获取所有属性
          const attributes = el.attribs;
          // 重构属性字符串，保留原有属性
          let attributesStr = "";
          for (let attr in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
              attributesStr += ` ${attr}="${attributes[attr]}"`;
            }
          }
          // 构造新标签
          const newLink = `<a href="${redirectPage}?url=${encodedHref}" original-href="${href}" ${attributesStr}>${innerText}</a>`;
          // 替换原有标签
          $a.replaceWith(newLink);
        }
      });
      return $.html();
    }
  } catch (error) {
    console.error("处理链接时出错：", error);
  }
};

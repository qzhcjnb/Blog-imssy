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
 * 创建一个新的script标签，或者刷新一个已存在的脚本标签
 * @param {string} src - 脚本的URL
 * @returns {Promise} 一个代表脚本加载状态的Promise对象。如果成功则resolve，否则reject
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

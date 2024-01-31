import { mainStore } from "@/store";

/**
 * 跳转链接
 * @param {string} url - 要跳转的链接地址
 * @param {boolean} [newTab=false] - 是否在新标签页中打开，默认为 true
 */
export const jumpLink = (url, newTab = true) => {
  try {
    if (typeof window === "undefined" || !url) return false;
    // 区分跳转
    newTab ? window.open(url, "_blank") : (window.location.href = url);
  } catch (error) {
    console.error("跳转出错：", error);
  }
};

/**
 * 防抖函数
 * @param {Function} func - 要进行防抖处理的函数
 * @param {number} delay - 延迟时间，单位毫秒
 * @returns {Function} - 返回一个新的函数，该函数在指定的时间间隔内最多只会执行一次
 */
export const debounce = (func, delay) => {
  let timerId;
  // 返回一个新的函数
  return (...args) => {
    // 清除上一个定时器
    clearTimeout(timerId);
    // 设置新的定时器，在指定的延迟时间后执行函数
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * 节流函数
 * @param {Function} func - 要进行节流处理的函数
 * @param {number} delay - 延迟时间，单位毫秒
 * @param {boolean} trailing - 是否在最后执行一次
 * @returns {Function} - 返回一个新的函数，该函数在指定的时间间隔内最多只会执行一次
 */
export const throttle = (func, delay, trailing = false) => {
  let isThrottled = false;
  let args;
  // 返回一个新的函数
  return (...currentArgs) => {
    if (!isThrottled) {
      // 保存当前参数
      args = currentArgs;
      isThrottled = true;
      func.apply(this, args);
      setTimeout(() => {
        isThrottled = false;
        // 在最后执行一次
        if (trailing && args) {
          func.apply(this, args);
          args = null;
        }
      }, delay);
    }
  };
};

/**
 * 计算滚动高度和滚动百分比
 */
export const calculateScroll = () => {
  try {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    const store = mainStore();
    const scrollY = window.scrollY || window.pageYOffset;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = ((scrollY / totalHeight) * 100).toFixed(0);
    // 判断滚动方向
    const scrollDirection = scrollY > store.scrollData.height ? "down" : "up";
    // 储存计算结果
    store.scrollData = {
      height: Number(scrollY.toFixed(0)),
      percentage: Number(scrollPercentage),
      direction: scrollDirection,
    };
  } catch (error) {
    console.error("计算滚动时出现错误：", error);
  }
};

/**
 * 平滑滚动至目标高度或元素
 * @param {number|HTMLElement} target - 目标高度或元素
 */
export const smoothScrolling = (target = 0) => {
  try {
    if (typeof window === "undefined") return false;
    if (typeof target === "number") {
      // 滚动至指定高度
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      // 滚动至元素
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // 滚动至顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    console.error("平滑滚动出错：", error);
  }
};

/**
 * 格式化时间戳为相应的日期格式
 * 如果时间戳表示的时间为7天内，则返回 'n天内'
 * 如果时间戳表示的时间为7天之后但在当年，则返回 '月/日'
 * 如果时间戳表示的时间在当年之前，则返回 '年/月/日'
 * @param {number} timestamp - 时间戳（以毫秒为单位）
 * @return {string} 返回日期格式的字符串
 */
export const formatTimestamp = (timestamp) => {
  let now = Date.now();
  let difference = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
  if (difference <= 0) {
    return "今日内";
  } else if (difference < 7) {
    return `${difference}天前`;
  } else {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (year === new Date(now).getFullYear()) {
      return `${month}/${day}`;
    } else {
      return `${year}/${month}/${day}`;
    }
  }
};

/**
 * 计算给定日期与当前日期相差的天数
 * @param {string} dateStr - 要计算差值的日期，为字符串形式
 * @returns {number} 天数差值
 */
export const daysFromNow = (dateStr) => {
  const currentDate = new Date();
  const inputDate = new Date(dateStr);
  const timeDiff = currentDate - inputDate;
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff;
};

/**
 * 随机前往一篇文章
 * @param {Object} postData - 文章数据
 * @returns {number} 天数差值
 */
let lastIndex = -1;
export const shufflePost = (postData) => {
  let randomIndex;
  do {
    // 随机生成一个索引值
    randomIndex = Math.floor(Math.random() * postData.length);
  } while (randomIndex === lastIndex && postData.length > 1);
  // 更新上一次的索引值
  lastIndex = randomIndex;
  // 随机文章
  const randomPost = postData[randomIndex];
  console.log(randomPost);
  // 跳转到随机文章
  return randomPost.regularPath;
};

/**
 * 复制文本到剪贴板
 * @param {string} data 要复制到剪贴板的文本
 */
export const copyText = async (data) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(data);
    } catch (error) {
      console.error("复制出错：", error);
    }
  } else {
    // 如果浏览器不支持 navigator.clipboard
    const textArea = document.createElement("textarea");
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("复制出错：", err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

/**
 * 图片 URL 复制到剪贴板
 * @param {string} imageURL 要复制到剪贴板的图片的URL
 */
export const copyImage = async (imageURL) => {
  if (!navigator.clipboard) {
    console.error("浏览器不支持 Clipboard API");
    return;
  }
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("图片已复制到剪贴板");
  } catch (error) {
    console.error("复制图片出错：", error);
  }
};

// 获取一言
export const getHitokoto = async () => {
  const result = await fetch("https://v1.hitokoto.cn");
  const hitokoto = await result.json();
  return hitokoto;
};

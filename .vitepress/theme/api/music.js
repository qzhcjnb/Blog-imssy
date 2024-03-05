// Meting
export const getMusicList = async () => {
  const result = await fetch("https://api-meting.efefee.cn/?type=playlist&id=9379831714");
  const list = await result.json();
  return list.map((song) => {
    const { pic, ...data } = song;
    return {
      ...data,
      cover: pic,
    };
  });
};

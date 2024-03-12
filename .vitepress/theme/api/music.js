// Meting
export const getMusicList = async (id, server = "netease", type = "playlist") => {
  const result = await fetch(
    `https://api-meting.efefee.cn/?server=${server}&type=${type}&id=${id}`,
  );
  const list = await result.json();
  return list.map((song) => {
    const { pic, ...data } = song;
    return {
      ...data,
      cover: pic,
    };
  });
};

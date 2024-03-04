import { themeConfig } from "@/assets/themeConfig.mjs";

/**
 * 获取友链朋友圈。
 * @param {string} [rule="updated"] - 文章的排序规则，可以是 "created" 或 "updated"
 */
export const getFriendsLink = async (rule = "updated") => {
  const result = await fetch(`${themeConfig.serverData.circleOfFriends}/all?rule=${rule}`);
  const friends = await result.json();
  return friends;
};

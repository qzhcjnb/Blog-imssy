import { themeConfig } from "@/assets/themeConfig.mjs";

// 获取友链朋友圈
export const getFriendsLink = async () => {
  const result = await fetch(`${themeConfig.serverData.circleOfFriends}/all`);
  const friends = await result.json();
  return friends;
};

---
title: 友情链接
aside: false
---

<script setup>
import { ref } from "vue";
import Link from "@/views/Link.vue";
import Comments from "@/components/Comments.vue";

// 添加友链勾选
const addLinkChecked = ref(false);
</script>

<Link />

## 友情链接申请

很高兴能和各位优秀的朋友们交流，本站友链目前采用**手动添加**，如果你想加入友链，可以在下方留言，我会在不忙的时候统一添加。

### 友链相关须知

- 为了友链相关页面和组件的统一性和美观性，可能会对你的部分信息进行缩短处理，例如昵称包含`博客`、`XX的XX`等内容或形式**将被简化**。
- 为了图片加载速度和内容安全性考虑，头像或其他信息中的图片均使用本站图床，**所以无法收到贵站自己的头像更新**，如果有迫切的更改信息需求，**请在本页的评论中评论说明**。

### 我的友链信息

- 名称：`無名小栈`
- 描述：`分享技术与科技生活`
- 地址：`https://blog.imsyy.top/`
- 头像：`https://pic.imgdb.cn/item/65bc52b0871b83018a06699d.png`
- 站点图片：`https://pic.imgdb.cn/item/65dc47009f345e8d030b65ba.png`

```yml
name: 無名小栈
desc: 分享技术与科技生活
link: https://blog.imsyy.top/
avatar: https://pic.imgdb.cn/item/65bc52b0871b83018a06699d.png
screenshot: https://pic.imgdb.cn/item/65dc47009f345e8d030b65ba.png
```

### 申请友链

<div class="add-link">
  <input type="checkbox" id="add-link" v-model="addLinkChecked">
  <label for="add-link"> 我已认真确认阅读上方要求，并希望添加友链 </label>
</div>

<Comments v-if="addLinkChecked" />
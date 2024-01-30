---
title: 跳转中
---

<script setup>
import { onMounted } from "vue"
import { useRouter } from 'vitepress'
    
const router = useRouter();

onMounted(() => router.go("/"));
</script>

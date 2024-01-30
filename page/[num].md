<script setup>
import { useData } from "vitepress"
import Home from "@/views/Home.vue"

const { params } = useData();
</script>

<!-- 引用主页，用于显示分页数据 -->
<Home :page="Number(params.num)" />
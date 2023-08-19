<template>
  <div id="card">
    <header class="header">
      <img
        class="avatar"
        :src="VITE_CDN_URL + (avatarUrl ? avatarUrl : '/image/heard2.jpg')"
        alt=""
      />
      <div class="info">
        <p class="name">{{ hrName }}</p>
        <p class="position">{{ postName }}</p>
      </div>
    </header>
    <footer>
      <el-input
        v-model="input2"
        class="w-50 m-2"
        placeholder="输入搜索信息"
        :prefix-icon="Search"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { Search } from "@element-plus/icons-vue";
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL as string;
const store = useMainStore();
const { avatarUrl, hrName, postName } = toRefs(store.hrInformation);

const input2 = ref("");
</script>

<style lang="scss" scoped>
#card {
  background-color: rgb(255 228 228 / 50%);

  .header {
    display: flex;
    align-items: center;
    height: 60px;

    .avatar {
      width: 40px;
      height: 40px;
      margin: 0 10px;
      vertical-align: middle; /* 这个是图片和文字居中对齐 */
      border-radius: 50%;
    }

    .info {
      margin-left: 10px;

      .name {
        display: block;
        font-size: 16px;
        color: #999;
      }

      .position {
        display: block;
        font-size: 14px;
        color: #999;
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;

    .el-input {
      width: 85%;
      border-radius: 100px;
    }
  }
}
</style>

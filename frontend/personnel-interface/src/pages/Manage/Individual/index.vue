<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="header">
          <div class="item" :class="type ? 'header-left' : ' '" @click="turnUp">
            <span>个人中心</span>
          </div>
          <div
            class="item"
            :class="types ? 'header-right' : ' '"
            @click="turnDown"
          >
            <span>企业资料</span>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ElMessage } from "element-plus";
const type = ref(true);
const types = ref(false);
const turnUp = () => {
  if (type.value) {
    ElMessage.warning("您已经在个人中心了");
  } else {
    type.value = !type.value;
    types.value = false;
    router.push("/System/Individual/Guy");
  }
};
const turnDown = () => {
  if (types.value) {
    ElMessage.warning("您已经在企业资料了");
  } else {
    types.value = !types.value;
    type.value = false;
    router.push("/System/Individual/Firm");
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: rgb(245 245 250);

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      height: 100%;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 80px;
        margin: 40px 0;
        background-color: aliceblue;
        border: solid 1px #ccc;
        border-radius: 5px;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          height: 80px;
          color: rgb(0 179 139);
          text-align: center;
        }

        .header-left {
          background-color: rgb(0 179 139);

          span {
            color: rgb(255 255 255);
          }
        }

        .header-right {
          background-color: rgb(0 179 139);

          span {
            color: rgb(255 255 255);
          }
        }
      }
    }
  }
}
</style>

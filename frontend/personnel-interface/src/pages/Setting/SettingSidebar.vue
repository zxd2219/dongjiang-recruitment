<template>
  <system-header />
  <div class="outer">
    <div class="sidebar">
      <div class="title">
        <span>招聘设置</span>
      </div>
      <div class="list">
        <div>
          <router-link to="/setting/personInfo">
            <span>个人信息</span>
          </router-link>
        </div>
        <div>
          <router-link to="/setting/Authentication">
            <span>企业认证</span>
          </router-link>
        </div>
        <div>
          <router-link to="/setting/Comprises">
            <span>常用语</span>
          </router-link>
        </div>
        <div>
          <router-link to="/setting/Other">
            <span>其它设置</span>
          </router-link>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import SystemHeader from "@/components/System/SystemHeader.vue";
</script>

<style scoped lang="scss">
.outer {
  display: flex;
  flex-direction: row;

  .sidebar {
    position: relative;
    flex: 0 0 300px;
    align-items: center;
    height: 95vh;
    background: #fff9f9;

    .title {
      margin-top: 90px;
      font-size: 16px;
      text-align: center;
      text-shadow: 4px 4px 5px rgb(50 55 62);
    }

    .list {
      text-align: center;

      a {
        color: rgb(0 0 0);
        text-decoration: none;
      }

      a:hover {
        color: rgb(0 139 179);
      }

      a::selection {
        color: rgb(0 139 179);
      }

      div {
        margin-top: 40px;
        list-style: none;
      }
    }
  }

  .line {
    position: absolute;
    top: 11%;
    right: 0;
    width: 1px;
    height: 70vh;
    background-color: rgb(0 0 0 / 50%);
  }

  .content {
    flex: 1;
    background: #fff;
  }
}
</style>

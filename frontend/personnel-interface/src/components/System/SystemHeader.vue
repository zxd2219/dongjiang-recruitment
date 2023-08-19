<template>
  <div class="top">
    <div class="left">
      <div class="left-we">
        <span>We</span>
        <span class="red">❤</span>
        <span>{{ fullName || "You" }}</span>
      </div>
      <div class="left-route">
        <router-link to="/Manage">
          <span>首页</span>
        </router-link>
        <router-link to="/System/Position">
          <span>管理</span>
        </router-link>
        <router-link to="/PublishJob">
          <span>发职位</span>
        </router-link>
      </div>
    </div>
    <div class="right">
      <img
        id="avatar"
        :src="VITE_CDN_URL + (avatarUrl ? avatarUrl : '/image/heard2.jpg')"
        alt=""
      />
      <div class="dropdown">
        <div class="user">
          <span>{{ hrName || "HR" }}</span>
        </div>
        <ul class="dropdown-content">
          <li>
            <router-link to="/Setting">账号设置</router-link>
          </li>
          <li>
            <a href="#">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useMainStore();

const { avatarUrl, hrName } = toRefs(store.hrInformation);

const { fullName } = toRefs(store.companyInformation);
</script>

<style scoped lang="scss">
a {
  color: rgb(255 255 255);
  text-decoration: none;
}

a:hover {
  color: rgb(176 163 192);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 42.5px;
  color: rgb(255 255 255);
  background-color: rgb(50 55 62);

  .left {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-right: 100px;

    .left-route {
      display: flex;
      justify-content: space-around;
      width: 200px;

      a {
        color: rgb(255 255 255);
        text-decoration: none;
      }

      span {
        cursor: pointer;
      }
    }

    .red {
      margin: 0 10px;
      color: red;
    }
  }

  .right {
    display: flex;
    align-items: center;

    #avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .dropdown {
      position: relative;
      display: inline-block;
      width: 90px;
      cursor: pointer;

      .user {
        width: 100%;
        height: 30px;
        padding-left: 10px;
        text-align: center;

        span {
          display: block;
          width: 80px;
          margin-top: 10px;
        }
      }
    }

    .dropdown-content {
      position: absolute;
      top: 25px;
      left: 5px;
      display: none;
      width: 60px;
      height: 55px;
      padding: 12px 16px;
      font-size: 14px;
      list-style: none;
      border-radius: 0;
      box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);
      transform: matrix();

      :nth-child(1) {
        width: 60px;
        margin-top: 1px;
        text-align: center;
      }

      :nth-child(2) {
        position: absolute;
        left: 30px;
        margin-top: 15px;
        text-align: center;
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;
      background-color: rgb(51 51 51);
    }
  }
}
</style>

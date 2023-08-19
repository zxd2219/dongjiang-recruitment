<template>
  <div class="layout">
    <div class="header">
      <span>东江人才招聘 HR端</span>
      <div class="dropdown">
        <span class="user">{{ hrName || "HR" }}</span>
        <ul class="dropdown-content">
          <li>
            <router-link to="/Setting/PersonInfo">账号设置</router-link>
          </li>
          <li>
            <a href="#">退出</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="above">
        <div class="top">
          <img src="@/assets/logo.png" alt="网络问题，请刷新" />
          <div class="line"></div>
          <span>HR端</span>
        </div>
        <div class="back">
          <span>确认信息，开始招聘</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <div class="bottom">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from "@/stores/main";

const store = useMainStore();

const { hrName } = toRefs(store.hrInformation);
</script>

<style lang="scss" scoped>
$hd-height: 27.5px;

li {
  list-style: none;
}

a {
  color: rgb(255 255 255);
  text-decoration: none;
}

a:hover {
  color: rgb(176 163 192);
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .header {
    display: flex;
    justify-content: space-around;
    height: $hd-height;
    background-color: rgb(51 51 51);

    span {
      font-size: 14px;
      line-height: $hd-height;
      color: rgb(255 255 255);
      cursor: pointer;
    }

    .dropdown {
      position: relative;
      display: inline-block;
      width: 85px;

      .user {
        padding-left: 30px;
      }
    }

    .dropdown-content {
      position: absolute;
      top: 9px;
      display: none;
      width: 60px;
      padding: 12px 16px;
      font-size: 14px;
      box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);

      :nth-child(1) {
        text-align: center;
      }

      :nth-child(2) {
        margin-top: 15px;
        text-align: center;
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;
      background-color: rgb(51 51 51);
    }

    .user:hover {
      color: rgb(0 179 179);
      cursor: pointer;
    }
  }

  .main {
    flex: auto;

    .above {
      display: flex;
      flex-direction: column;

      .top {
        display: flex;
        flex-direction: row;

        img {
          width: auto;
          height: 50px;
          margin-left: 15vw;
        }

        .line {
          width: 1px;
          height: 30px;
          margin: 10px 0 5px 2vw;
          background-color: rgb(0 0 0 / 10%);
        }

        span {
          margin-left: 2vw;
          line-height: 50px;
          color: rgb(0 179 179);
        }
      }

      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 165px;
        background-image: url("@/assets/background1.png");

        span {
          font-size: 30px;
          color: rgb(255 255 255);
        }
      }
    }
  }

  .bottom {
    height: 2rem;

    div {
      width: 100%;
      height: 1px;
      background-color: rgb(0 0 0 / 10%);
    }
  }
}
</style>

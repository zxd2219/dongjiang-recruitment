<template>
  <div class="cards">
    <div class="cards-header">
      <div class="resume-item">
        <div class="header-person">
          <img
            :src="
              VITE_CDN_URL +
              (formLabelAlign.avatarUrl
                ? formLabelAlign.avatarUrl
                : '/image/heard2.jpg')
            "
            alt=""
          />
          <div class="person">
            <span>姓名:{{ formLabelAlign.hrName }}</span>
            <span>职位:{{ formLabelAlign.postName }}</span>

            <span
              ><img
                src="@/assets/Email.png"
                alt=""
                style="width: 25px; height: 25px"
              />:{{ formLabelAlign.acceptEmail }}</span
            >
          </div>
        </div>
      </div>
      <div class="update">
        <router-link to="/Setting">编辑</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { Personnel } from "@dongjiang-recruitment/service-common";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useMainStore();

const imgUrl = ref(
  "https://tse1-mm.cn.bing.net/th/id/R-C.b4504d02c6b9a71453c61fef88578b77?rik=rBhjlBcXKOZkiw&riu=http%3a%2f%2fimg.jj20.com%2fup%2fallimg%2ftx25%2f380412030426662.jpg&ehk=MrcDJRR%2fT3NWdla%2fkub6nInyr7M3eZF72Kzo%2brbcCVI%3d&risl=&pid=ImgRaw&r=0"
);
const formLabelAlign = ref<Personnel>(store.hrInformation);
</script>

<style scoped lang="scss">
.cards {
  width: 100%;
  height: 160px;
  border: solid 1px rgb(3 252 198);
  border-radius: 5px;

  .cards-header {
    display: flex;
    justify-content: space-around;
    width: auto;
    height: 100%;

    .resume-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      .header-person {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0 30px;
        font-size: 14px;

        .person {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          margin: 0 10px;
        }
      }
    }

    .update {
      width: 5%;
      cursor: pointer;

      a {
        color: rgb(0 179 139);
        text-decoration: none;
      }
    }
  }
}
</style>

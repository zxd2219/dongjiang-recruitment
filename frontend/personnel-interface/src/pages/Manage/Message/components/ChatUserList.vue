<template>
  <el-scrollbar>
    <div id="list">
      <template
        v-for="(message, userInformationId) in props.messages"
        :key="userInformationId"
      >
        <div
          class="job-hunter"
          :class="{ active: userInformationId === activeUserInformationId }"
          @click="emits('chatWithUser', userInformationId)"
        >
          <el-badge :value="countNum(message)" :max="10" class="item">
            <div class="hunter">
              <img
                :src="
                  props.userInformations.get(userInformationId)
                    ? VITE_CDN_URL +
                      props.userInformations.get(userInformationId)?.avatarUrl
                    : ''
                "
                alt=""
              />
              <div class="hunter-info">
                <span>{{
                  props.userInformations.get(userInformationId)
                    ? props.userInformations.get(userInformationId)?.firstName +
                      "" +
                      props.userInformations.get(userInformationId)?.lastName
                    : ""
                }}</span>
                <div class="info">
                  <span>{{
                    props.userInformations.get(userInformationId)?.cityName
                  }}</span>
                </div>
              </div>
            </div>
          </el-badge>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type { withReadStateMessageRecord } from "@/stores/main";
import type { Applicant } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL as string;

const props = defineProps({
  messages: {
    type: Object as PropType<{ [key: string]: withReadStateMessageRecord[] }>,
    default: () => ({}),
  },
  userInformations: {
    type: Object as PropType<Map<string | number, Applicant>>,
    default: () => new Map(),
  },
  activeUserInformationId: {
    type: String as PropType<string>,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "chatWithUser", activeUserInformationId: string | number): void;
}>();

// 计算未读消息数的函数。
const countNum = (messages: withReadStateMessageRecord[]) => {
  let num = 0;
  messages?.forEach((item) => {
    if (!item.haveRead && item.initiateType === 1) {
      num++;
    }
  });
  if (num === 0) {
    return "";
  }
  return num;
};
</script>

<style lang="scss" scoped>
#list {
  .job-hunter {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #ccc;

    .el-badge {
      width: 95%;
      height: 95%;

      .hunter {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .hunter-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 60%;
          height: 80%;

          .info {
            display: flex;
            margin-left: 5px;
            font-size: 13px;
            color: #ccc;
          }
        }
      }
    }

    &.active {
      cursor: pointer;
      background-color: rgb(147 255 232);
    }
  }

  .job-hunter:hover {
    cursor: pointer;
    background-color: rgb(191 254 209);
  }
}
</style>

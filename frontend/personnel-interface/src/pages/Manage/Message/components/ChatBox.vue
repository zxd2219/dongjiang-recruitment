<template>
  <div class="container">
    <el-scrollbar ref="scrollbarRef">
      <div ref="content">
        <div
          v-for="(chat, index) in props.chatList"
          :key="index"
          class="chat-list"
        >
          <p class="time">
            <span>{{ timeNow(chat.createdAt) }}</span>
          </p>
          <div v-if="chat.initiateType === 1" class="user-main">
            <div class="user-info">
              <img
                class="user-avatar"
                :src="
                  VITE_CDN_URL +
                  (userInfo.avatarUrl
                    ? userInfo.avatarUrl
                    : '/image/heard1.jpg')
                "
                alt=""
              />
              <span class="name">{{
                userInfo.firstName + userInfo.lastName
              }}</span>
            </div>
            <div v-if="chat.messageType === 1" class="left-farm">
              <p class="text">{{ chat.content }}</p>
            </div>
            <div v-else-if="chat.messageType === 2">
              <el-image
                :src="VITE_CDN_URL + chat.content"
                alt=""
                :preview-src-list="srcList"
                :initial-index="index"
                fit="cover"
              />
            </div>
            <div v-else-if="chat.messageType === 4">
              <img
                src="https://cn.bing.com/images/search?view=detailV2&ccid=Mz3FUZRM&id=EB574CC32857D56CF1EDB5CD0D86EBF46B436817&thid=OIP.Mz3FUZRMsAIZ1eH3cHA_cwHaHa&mediaurl=https%3a%2f%2fimg.51miz.com%2fElement%2f00%2f37%2f79%2f59%2f10df0417_E377959_b7bb9dfa.png&exph=840&expw=840&q=%e6%96%87%e4%bb%b6&simid=608014356928596846&FORM=IRPRST&ck=6B9D61BFFB8CFAE93B4A0F00B91369C3&selectedIndex=29"
                alt=""
              />
            </div>
            <div v-else></div>
          </div>
          <div v-else class="hr-main">
            <div class="hr-info">
              <img
                :src="
                  VITE_CDN_URL +
                  (hravatarUrl ? hravatarUrl : '/image/heard2.jpg')
                "
                alt=""
                class="hr-avatar"
              />
              <span class="name">{{ hrName }}</span>
            </div>
            <div v-if="chat.messageType === 1" class="right-farm">
              <p class="text">{{ chat.content }}</p>
            </div>
            <div v-else-if="chat.messageType === 2">
              <el-image
                :src="VITE_CDN_URL + chat.content"
                alt=""
                :preview-src-list="srcList"
                :initial-index="index"
                fit="cover"
              />
            </div>
            <div v-else-if="chat.messageType === 4">
              <a :href="chat.content">
                <el-image
                  src="https://tse4-mm.cn.bing.net/th/id/OIP-C.qMT0AS-__JD0KNeqL6rucgHaHa?w=215&h=216&c=7&r=0&o=5&dpr=2&pid=1.7"
                  alt=""
                />
              </a>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import useTimeChange from "@/hooks/useTimeChange";
import { useMainStore, type withReadStateMessageRecord } from "@/stores/main";
import type { Applicant } from "@dongjiang-recruitment/service-common";
import { ElScrollbar } from "element-plus";
import type { PropType } from "vue";
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL as string;
const mainStore = useMainStore();
const srcList = ref<string[]>([]);
const { avatarUrl: hravatarUrl, hrName } = mainStore.hrInformation;

const content = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
let props = defineProps({
  chatId: {
    type: String,
    default: "",
  },
  userInfo: {
    type: Object as PropType<Applicant>,
    default: () => ({}),
  },
  chatList: {
    type: Array as PropType<withReadStateMessageRecord[]>,
    default: () => [],
  },
});
const time = ref();
const formatDate = (timestamp: any) => {
  return timestamp.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "");
};
watchEffect(() => {
  srcList.value = props.chatList.map((obj) => obj.content);
  if (scrollbarRef.value && props.chatList.length) {
    nextTick(() => {
      scrollbarRef.value!.scrollTo(0, content.value?.offsetHeight);
    });
  }
});
const timeNow = (messageTime: any) => {
  let str = formatDate(messageTime);
  str = str.replace(/-/g, "/");
  let date = new Date(str);
  time.value = useTimeChange(date);
  return time.value;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 70%;

  .el-scrollbar {
    width: 100%;
    height: 100%;
  }

  .chat-list {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .time {
      display: flex;
      justify-content: center;
      font-size: 12px;
    }

    .user-main {
      display: flex;
      height: 60px;

      .user-info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 8px;
          color: #999;
        }
      }

      .left-farm {
        display: flex;
        align-items: center;
        width: auto;
        height: 30px;
        padding: 5px;
        margin-left: 10px;
        background-color: #4dcaae;
        border: #ddd 1px solid;
        border-radius: 10px;
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }

    .hr-main {
      display: flex;
      flex-direction: row-reverse;

      .hr-info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 8px;
          color: #999;
        }
      }

      .right-farm {
        display: flex;
        align-items: center;
        width: auto;
        height: 30px;
        padding: 5px;
        margin-right: 10px;
        background-color: #4dcaae;
        border: #ddd 1px solid;
        border-radius: 10px;

        .name {
          font-size: 14px;
          color: #fff;
        }
      }

      .hr-avatar {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }

    .el-image {
      width: 80px;
      height: 80px;
      margin: 0 10px;
    }
  }
}
</style>

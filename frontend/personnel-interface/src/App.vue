<template>
  <router-view> </router-view>
</template>
<script setup lang="ts">
import {
  AxiosError,
  Company,
  axios,
  request,
  type Account,
  type Personnel,
} from "@dongjiang-recruitment/service-common";
import { ElMessage } from "element-plus";
import router from "./router";
import { useMainStore, useMessageStore } from "./stores/main";

const mainStore = useMainStore();
const messageStore = useMessageStore();
request.config.BASE = import.meta.env.VITE_BASE_URL;

commonService.getPositionTypes().then((res) => {
  mainStore.positionTypes = res;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError && error.response) {
      switch ((error.response as { status: number }).status) {
        case 401:
          mainStore.jsonWebToken = null as unknown as string;
          mainStore.hrInformation = null as unknown as Personnel;
          mainStore.accountInformation = null as unknown as Account;
          mainStore.companyInformation = null as unknown as Company;
          void router.replace("/Login");
          ElMessage.error("登录已过期，请重新登录");
          break;
        case 500:
          ElMessage.error(
            `服务器错误: ${(error.response.data as { error: string }).error}`
          );
          break;
        default:
          ElMessage.error((error.response.data as { error: string }).error);
          break;
      }
    }
    return Promise.reject(error);
  }
);

// 检查用户是否登录，如果用户已经登录，它会为axios设置授权头，并获取用户的信息。如果用户没有登录，它会将用户重定向到登录页面。
if (mainStore.jsonWebToken != null) {
  request.config.TOKEN = mainStore.jsonWebToken;
}
onMounted(() => {
  document.getElementById("loading")?.remove();
});
</script>

<style lang="scss">
/************************************************************
** 请将全局样式拷贝到项目的全局 CSS 文件或者当前页面的顶部 **
** 否则页面将无法正常显示                                  **
************************************************************/

:root {
  --el-color-primary: #00b38b;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

view,
image,
text {
  box-sizing: border-box;
  flex-shrink: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.items-stretch {
  display: flex;
  align-items: stretch;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.items-center {
  display: flex;
  align-items: center;
}

.items-end {
  display: flex;
  align-items: flex-end;
}
</style>

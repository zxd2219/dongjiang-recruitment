<script setup lang="ts">
import { useMainStore } from "@/stores";
import { axios, AxiosError } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

// let timer: NodeJS.Timeout;
axios.interceptors.request.use(
  (config) => {
    // timer = setTimeout(() => {
    //   uni.showLoading({
    //     title: "加载中...",
    //   });
    // }, 2000);
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${mainStore.token}`,
      } as any,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器，当返回401时，跳转到登录页面
axios.interceptors.response.use(
  (response) => {
    // clearTimeout(timer);
    // uni.hideLoading();
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          uni.showToast({
            title: (error.response.data as { error: string }).error,
            icon: "none",
          });
          break;
        case 401:
          uni.showToast({
            title: "登录过期，请重新登录",
            icon: "none",
          });
          mainStore.token = "";
          uni.reLaunch({ url: "/pages/account/denglu_zhuce/denglu" });
          break;
        case 403:
          uni.showToast({
            title: (error.response.data as { error: string }).error,
            icon: "none",
          });
          break;
        case 404:
          uni.showToast({
            title: (error.response.data as { error: string }).error,
            icon: "none",
          });
          break;
        case 500:
          uni.showToast({
            title:
              "服务器错误" + (error.response.data as { error: string }).error,
            icon: "none",
          });
          break;
        default:
          uni.showToast({
            title: "服务器连接错误",
            icon: "none",
          });
          break;
      }
    } else {
      uni.showToast({
        title: "服务器连接错误",
        icon: "none",
      });
    }
    // clearTimeout(timer);
    // uni.hideLoading();
    return Promise.reject(error);
  }
);

nextTick(() => {
  if (mainStore.token === "") {
    uni.reLaunch({ url: "/pages/account/denglu_zhuce/denglu" });
  }
});
</script>

<style lang="scss">
/************************************************************
** 请将全局样式拷贝到项目的全局 CSS 文件或者当前页面的顶部 **
** 否则页面将无法正常显示                                  **
************************************************************/

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

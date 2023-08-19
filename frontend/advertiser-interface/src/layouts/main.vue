<template>
  <div class="h-full w-full flex flex-col">
    <header class="h-16 border-b-2" v-if="route.meta.showHeader !== false">
      <header-cmp />
    </header>
    <div class="flex flex-1 overflow-auto">
      <n-layout has-sider class="h-full">
        <n-layout-sider
          v-if="route.meta.showMenu !== false"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
        >
          <menu-cmp
            v-model:collapsed="collapsed"
            class="w-full h-full overflow-auto"
          />
        </n-layout-sider>
        <n-layout
          class="flex flex-col"
          content-style="display: flex; flex-direction: column;"
        >
          <nav-bar-cmp
            v-if="route.meta.showNav !== false"
            v-model:collapsed="collapsed"
          />
          <main class="flex-1 overflow-auto" ref="main">
            <router-view v-slot="{ Component, route }">
              <keep-alive
                v-if="
                  route.meta.keepAlive !== false &&
                  mainStore.history.some((r) => r.path === route.path)
                "
              >
                <component :is="Component" />
              </keep-alive>
              <component v-else :is="Component" />
            </router-view>
          </main>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores";
import { isNullOrUndef } from "@/utils";
import { axios, AxiosError } from "@dongjiang-recruitment/service-common";
import type { ConfirmDialogOptions } from "env";
import type { MessageReactive } from "naive-ui";
import HeaderCmp from "./components/header.vue";
import MenuCmp from "./components/menu.vue";
import NavBarCmp from "./components/nav-bar.vue";

const collapsed = ref(false);

// @ts-ignore
window.$message = useMessage();
const NDialog = useDialog();
// @ts-ignore
window.$dialog = {
  ...NDialog,
  confirm(option = {} as ConfirmDialogOptions) {
    const showIcon = !isNullOrUndef(option.title);
    return NDialog[(option.type || "warning") as keyof typeof NDialog]({
      showIcon,
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    });
  },
};
const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();

let timer: NodeJS.Timeout;
let loading: MessageReactive;
axios.interceptors.request.use(
  (config) => {
    timer = setTimeout(() => {
      loading = $message.loading("仍在处理中...", {
        duration: 3000,
      });
    }, 5000);
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
    clearTimeout(timer);
    loading?.destroy();
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          $message.error(error.response.data.error);
          break;
        case 401:
          $message.error("登录过期，请重新登录");
          mainStore.token = "";
          mainStore.history = [];
          mainStore.account = undefined;
          router.replace({ name: "Login" });
          break;
        case 403:
          $message.error("您没有权限访问该资源");
          break;
        case 404:
          $message.error("请求的资源不存在");
          break;
        case 500:
          $message.error("服务器内部错误");
          break;
        default:
          $message.error("服务器连接错误");
          break;
      }
    } else {
      $message.error("服务器连接错误");
    }
    clearTimeout(timer);
    loading?.destroy();
    return Promise.reject(error);
  }
);

nextTick(() => {
  if (mainStore.token === "") {
    router.replace({ name: "Login" });
  }
});
</script>

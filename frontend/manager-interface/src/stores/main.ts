import type { Account } from "@dongjiang-recruitment/service-common";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import type { RouteLocationNormalized } from "vue-router";

const parseJwt = (
  token: string
): { id?: string; did?: Account["detailId"] } => {
  if (!token) return {};
  try {
    return jwtDecode(token) as { id: string; did: Account["detailId"] };
  } catch (e) {
    return {};
  }
};

export const useMainStore = defineStore(
  "main",
  () => {
    // 授权信息
    const token = ref<string>("");
    const checked = ref<boolean>(false);
    const accountId = computed(() => parseJwt(token.value).id);
    const {
      data: account,
      loading: loadingAccount,
      mutate: setAccount,
      refresh: refreshAccount,
    } = authenticationAccountService.useGetAccount(
      () => ({ id: accountId.value! }),
      {
        ready: computed(() => !!accountId.value),
        refreshDeps: [accountId],
        onSuccess(res) {
          checked.value = true;
        },
        onError(err) {
          if (err?.message === "Not Found") {
            checked.value = false;
            $message.error("当前账户已被删除");
            token.value = "";
          }
        },
      }
    );

    // 路由历史
    const history = ref<RouteLocationNormalized[]>([]);

    return {
      token,
      account,
      setAccount,
      refreshAccount,
      loadingAccount,
      history,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          paths: ["token"],
          storage: localStorage,
        },
        {
          paths: ["account"],
          storage: sessionStorage,
        },
      ],
    },
  }
);

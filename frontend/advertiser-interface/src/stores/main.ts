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
    const router = useRouter();

    // 授权信息
    const token = ref<string>("");
    const checked = ref<boolean>(false);
    const accountId = computed(() => parseJwt(token.value).id);
    const {
      data: account,
      loading: loadingAccount,
      mutate: setAccount,
      refreshAsync: refreshAccount,
    } = authenticationAccountService.useGetAccount(
      () => ({ id: accountId.value! }),
      {
        ready: computed(() => Boolean(accountId.value)),
        refreshDeps: [accountId],
        onSuccess(res) {
          if (!res?.detailId?.advertiser) {
            $message.error("当前账户不是广告商账户，请前往注册");
            router.replace("/register");
            return;
          }
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
    const {
      data: advertiser,
      loading: loadingAdvertiser,
      mutate: setAdvertiser,
      refreshAsync: refreshAdvertiser,
    } = advertiserService.useGetAdvertiser(
      () => ({ id: account.value!.detailId.advertiser! }),
      {
        ready: computed(() => !!account.value?.detailId.advertiser),
        refreshDeps: [account],
        onSuccess(res) {
          if (!res?.name) {
            $message.error("当前广告商账户未完善信息，请前往完善");
            router.replace({ name: "Advertiser" });
          }
          checked.value = true;
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
      advertiser,
      setAdvertiser,
      refreshAdvertiser,
      loadingAdvertiser,
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
        {
          paths: ["advertiser"],
          storage: sessionStorage,
        },
      ],
    },
  }
);

import { until } from "@/hooks";
import type { Message } from "@/interfaces";
import {
  request,
  type Account,
  type MessageRecord,
} from "@dongjiang-recruitment/service-common";
// @ts-ignore
import io from "@hyoga/uni-socket.io";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";

const parseJwt = (
  token: string
): { id?: string; did?: Account["detailId"] } => {
  if (!token) return {};
  try {
    return jwtDecode(token);
  } catch (e) {
    return {};
  }
};

const socket = io(import.meta.env.VITE_BASE_URL, {
  // const socket = io("http://127.0.0.1:3004", {
  path: "/common/socket.io",
  transports: ["websocket", "polling"],
  timeout: 5000,
});

export const useMainStore = defineStore(
  "main",
  () => {
    // 系统信息
    const system = ref<UniApp.GetSystemInfoResult>(uni.getSystemInfoSync());
    const menu = ref<UniApp.GetMenuButtonBoundingClientRectRes>(
      uni.getMenuButtonBoundingClientRect?.()
    );
    // 授权信息
    const token = ref<string>("");
    const isInit = ref<boolean>(false);
    const checked = ref<boolean>(false);
    watch(token, (token) => (request.config.TOKEN = token));
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
          if (res && !res.detailId?.applicant) {
            uni.showToast({
              title: "当前账户不是求职者账户，请注册求职者账户",
            });
            uni.reLaunch({
              url: "/pages/account/denglu_zhuce/zhucezhanghao",
            });
          }
        },
        onError(err) {
          if (err?.message === "Not Found") {
            checked.value = false;
            uni.showToast({
              title: "当前账户已被删除，请重新注册",
            });
            uni.reLaunch({
              url: "/pages/account/denglu_zhuce/zhucezhanghao",
            });
            token.value = "";
          }
        },
      }
    );
    // 用户信息
    const applicantId = computed(() => parseJwt(token.value).did?.applicant);
    const {
      data: applicant,
      loading: loadingApplicant,
      mutate: setApplicant,
      refresh: refreshApplicant,
    } = applicantService.useGetApplicant(() => ({ id: applicantId.value! }), {
      ready: computed(() => !!applicantId.value && checked.value),
      refreshDeps: [applicantId, checked],
      onSuccess(res) {
        if (res && !res.email && !isInit.value) {
          uni.showToast({
            title: "请先完善个人信息",
          });
          uni.reLaunch({
            url: "/pages/init/wanshangerenxinxi/wanshangerenxinxi",
          });
        } else {
          applicantEducationExperienceService
            .queryEducationExperience({
              applicantId: applicantId.value!,
            })
            .then((res1) => {
              const applicant = {
                ...res,
                age: dayjs().diff(res.dateOfBirth, "year"),
                education: res1.items.length
                  ? res1.items.reduce(
                      (prev, curr) =>
                        curr.education > prev ? curr.education : prev,
                      res1.items[0].education as any
                    )
                  : null,
              };
              setApplicant(applicant);
              applicantService.updateApplicant({
                id: applicantId.value!,
                requestBody: applicant,
              });
            });
        }
      },
    });
    const {
      data: jobExpectations,
      loading: loadingJobExpectations,
      mutate: setJobExpectations,
      refresh: refreshJobExpectations,
    } = applicantJobExpectationService.useQueryJobExpectation(
      () => ({
        applicantId: applicantId.value!,
      }),
      {
        ready: computed(() => !!applicantId.value && checked.value),
        refreshDeps: [applicantId, checked],
        onSuccess(res) {
          if (res && !res.items.length && !isInit.value) {
            uni.showToast({
              title: "请先完善求职意向",
            });
            uni.reLaunch({
              url: "/pages/init/tianjiaqiuzhiqiwang/tianjiaqiuzhiqiwang",
            });
          }
        },
      }
    );
    // 其他信息
    const {
      data: cities,
      loading: loadingCities,
      mutate: setCities,
      refresh: refreshCities,
    } = commonService.useGetCities(undefined, {
      initialData: [],
    });

    return {
      system,
      menu,
      token,
      isInit,
      accountId,
      account,
      setAccount,
      refreshAccount,
      loadingAccount,
      applicant,
      setApplicant,
      refreshApplicant,
      loadingApplicant,
      jobExpectations,
      setJobExpectations,
      refreshJobExpectations,
      loadingJobExpectations,
      cities,
      setCities,
      refreshCities,
      loadingCities,
    };
  },
  {
    persist: {
      enabled: true,
      H5Storage: window.localStorage,
      detached: true,
      strategies: [
        {
          paths: ["token"],
        },
      ],
    },
  }
);

export const useMessageStore = defineStore(
  "message",
  () => {
    const mainStore = useMainStore();
    const messages = ref<{
      [key: string]: Message[];
    }>({});
    let timer: NodeJS.Timeout;
    const startReceiveMessage = () => {
      until(
        computed(() => !!mainStore.applicant?.id),
        () => {
          clearInterval(timer);
          const sendPingToServer = () => {
            socket.emit("ping", {
              accountId: mainStore.applicant!.id,
              accountType: 1,
            });
          };
          timer = setInterval(sendPingToServer, 40000);
          sendPingToServer();
        }
      );
    };
    startReceiveMessage();
    socket.on("connect", startReceiveMessage);
    socket.on("message", (message: MessageRecord) => {
      uni.showToast({
        title: "收到新消息",
      });
      const { initiateId } = message;
      if (!messages.value[initiateId]) {
        messages.value[initiateId] = [];
      }
      messages.value[initiateId].push({
        ...message,
        haveRead: false,
      });
    });
    socket.on("error", (err: { reason: string; message: Message }) => {
      uni.showToast({
        title: err.reason,
      });
      messages.value[err.message.serviceId]?.forEach((message) => {
        if (message.id === err.message.id) {
          message.failed = true;
        }
      });
    });

    return {
      messages,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);
export type SendMessageOptions = Omit<
  MessageRecord,
  "id" | "createdAt" | "updatedAt" | "initiateId" | "initiateType"
>;
export const sendMessage = (message: SendMessageOptions) => {
  const mainStore = useMainStore();
  const messageStore = useMessageStore();
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      const _message = {
        id: nanoid(),
        createdAt: dayjs().format(),
        initiateId: mainStore.applicant!.id,
        initiateType: 1,
        ...message,
      };
      socket.emit("message", _message);
      if (!messageStore.messages[message.serviceId]) {
        messageStore.messages[message.serviceId] = [];
      }
      messageStore.messages[message.serviceId].push({
        ..._message,
        haveRead: true,
      } as any);
    }
  );
};

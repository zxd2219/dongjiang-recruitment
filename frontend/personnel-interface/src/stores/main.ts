import type {
  Account,
  Company,
  DirectionTags,
  MessageRecord,
  Personnel,
  PositionTypes,
} from "@dongjiang-recruitment/service-common";
import { ElMessage, dayjs } from "element-plus";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import io from "socket.io-client";

export interface withReadStateMessageRecord extends MessageRecord {
  haveRead: boolean;
}
export const useMainStore = defineStore("main", {
  state: () => ({
    jsonWebToken: null as unknown as string,
    hrInformation: null as unknown as Personnel,
    accountInformation: null as unknown as Account,
    companyInformation: null as unknown as Company,
    positionTypes: null as unknown as PositionTypes,
    directionTags: null as unknown as DirectionTags,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia-main",
      },
    ],
  },
});

export const useCompriseStore = defineStore("comprise", {
  state: () => ({
    comprise: [] as Array<string>,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia-comprise",
        storage: localStorage,
      },
    ],
  },
});

const socket = io(import.meta.env.VITE_BASE_URL, {
  // const socket = io("http://127.0.0.1:3004", {
  path: "/common/socket.io",
  transports: ["websocket", "polling"],
  timeout: 5000,
});

export interface Message extends MessageRecord {
  haveRead: boolean;
  failed?: boolean;
}
export const useMessageStore = defineStore(
  "message",
  () => {
    const messages = ref<{
      [key: string]: Message[];
    }>({});
    const mainStore = useMainStore();
    let timer: NodeJS.Timeout;
    const startReceiveMessage = () => {
      until(() => !!mainStore.hrInformation?.id)
        .toMatch(Boolean)
        .then(() => {
          clearInterval(timer);
          const sendPingToServer = () => {
            socket.emit("ping", {
              accountId: mainStore.hrInformation.id,
              accountType: 2,
            });
          };
          timer = setInterval(sendPingToServer, 40000);
          sendPingToServer();
        });
    };
    startReceiveMessage();
    socket.on("connect", startReceiveMessage);
    socket.on("message", (message: MessageRecord) => {
      ElMessage.success("收到新消息");
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
      ElMessage.error(err.reason);
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
      strategies: [
        {
          key: "pinia-message",
          storage: localStorage,
        },
      ],
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

  until(() => !!mainStore.hrInformation?.id)
    .toMatch(Boolean)
    .then(() => {
      const _message = {
        id: nanoid(),
        createdAt: dayjs().format(),
        initiateId: mainStore.hrInformation.id,
        initiateType: 2,
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
    });
};

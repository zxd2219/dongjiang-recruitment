import type { MessageRecord } from "@dongjiang-recruitment/service-common";

export interface Message extends MessageRecord {
  haveRead: boolean;
  failed?: boolean;
}

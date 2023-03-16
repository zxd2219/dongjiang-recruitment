/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useRequest, type Options, type Service } from "vue-request";
import type { Entries, QueryResult } from "../interfaces";
import type { ApiClient } from "../request";

type ClientWithHooks = {
  [SKey in Exclude<keyof ApiClient, "request"> as `${SKey}Service`]: {
    [FKey in Exclude<keyof ApiClient[SKey], "httpRequest"> as `use${Capitalize<
      string & FKey
    >}`]: ApiClient[SKey][FKey] extends Service<infer R, infer P>
      ? (
          params?: P[0] | (() => P[0]),
          options?: Options<R, P>
        ) => QueryResult<R, P>
      : never;
  } & {
    httpRequest: ApiClient[SKey]["httpRequest"];
  };
} & {
  request: ApiClient["request"];
};

function getAllProperties<T extends object>(obj: T): Entries<T> {
  // @ts-ignore
  return (
    // @ts-ignore
    [Reflect.ownKeys(obj), Reflect.ownKeys(obj.__proto__)]
      .flat()
      .filter((k) => k !== "constructor")
      // @ts-ignore
      .map((k) => [k, obj[k]])
  );
}

export const buildHooks = (client: ApiClient): ClientWithHooks => {
  // 遍历 client，将 client 中的每个 service 中的普通请求方法替换为 hooks 版本
  return (Object.entries(client) as unknown as Entries<ApiClient>).reduce(
    (sAcc, [sKey, service]) => {
      if (sKey === "request") return { ...sAcc, request: service };
      return {
        // 保留已处理的 service 和 request
        ...sAcc,
        // 遍历 service，将 service 中的普通请求方法替换为 hooks 版本
        [`${sKey}Service`]: getAllProperties(service).reduce(
          (fAcc, [fKey, request]) => {
            if (fKey === "httpRequest")
              return { ...fAcc, httpRequest: request };
            return {
              // 保留已处理的请求方法
              ...fAcc,
              [`use${fKey.charAt(0).toUpperCase()}${fKey.slice(1)}`]: (
                params?:
                  | Parameters<typeof request>[0]
                  // @ts-ignore
                  | (() => Parameters<typeof request>[0]),
                options?: Options<
                  ReturnType<typeof request>,
                  Parameters<typeof request>
                >
              ) => {
                const _params =
                  typeof params === "function" ? params : () => params;
                return useRequest(
                  // @ts-ignore
                  () => request.call(service, _params.call(service)),
                  // @ts-ignore
                  options
                );
              },
            };
          },
          {} as Omit<ClientWithHooks[`${typeof sKey}Service`], "httpRequest">
        ),
      };
    },
    {} as ClientWithHooks
  );
};

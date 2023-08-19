/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { readFileSync } from "node:fs";
import { ApiClient } from "../";

void (async function () {
  const json = JSON.parse(readFileSync("openapi.json").toString());
  const paths = Object.entries(json.paths) as [string, any][];
  const client = new ApiClient();

  client.request.config.BASE = "https://develop.api.djzhaopin.ucstu.com";
  client.request.config.TOKEN = (
    await client.authentication.loginAccount({
      requestBody: {
        userName: process.env.USER_NAME || "admin",
        password: process.env.PASSWORD || "admin",
      },
    })
  ).token;
  console.log("登录成功", client.request.config.TOKEN);

  const authorities = paths
    .map(([key, value]) => {
      const result1 = /\{(\S*?)\}/.exec(key);
      if (!result1) {
        return Object.keys(value).map((method) => {
          return `${key},${method.toUpperCase()}`;
        });
      }
      key = result1.input.replace(/\{(\S*?)\}/, `:${result1[1]}`);
      const result2 = /\{(\S*?)\}/.exec(key);
      if (!result2) {
        return Object.keys(value).map((method) => {
          return `${key},${method.toUpperCase()}`;
        });
      }
      key = result2.input.replace(/\{(\S*?)\}/, `:${result2[1]}`);
      return Object.keys(value).map((method) => {
        return `${key},${method.toUpperCase()}`;
      });
    })
    .flat();

  await Promise.all(
    authorities.map(async (authority) => {
      const result = await client.authenticationAuthority.queryAuthority({
        query: {
          name: ["$eq", authority],
        },
      });
      if (result.total === 0) {
        await client.authenticationAuthority.addAuthority({
          requestBody: {
            name: authority,
          },
        });
        console.log(authority, "添加成功");
      } else {
        console.log(authority, "已存在");
      }
    })
  );
})();

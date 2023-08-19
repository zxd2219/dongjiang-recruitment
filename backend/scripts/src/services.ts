import concurrently from "concurrently";
import httpProxy from "http-proxy";
import { readFileSync, watchFile } from "node:fs";
import http from "node:http";
import { resolve } from "node:path";

type Services = Array<{
  name: string;
  prefix: string;
  current: "local" | "remote";
  autoStart: boolean;
  local: {
    host: string;
    protocol: "http" | "https";
    port: number;
  };
  remote: {
    host: string;
    protocol: "http" | "https";
    port: number;
  };
}>;

let services = JSON.parse(
  readFileSync(resolve(process.cwd(), "services.json")).toString()
) as Services;

services.filter(
  ({ current, autoStart }) => current === "local" && autoStart !== false
).length &&
  concurrently(
    services
      .filter(
        ({ current, autoStart }) => current === "local" && autoStart !== false
      )
      .map(({ name }) => ({
        name,
        command: `"pnpm run --filter '@dongjiang-recruitment/${name}' start:dev"`,
      })),
    {
      group: true,
      cwd: process.cwd(),
    }
  );

watchFile(resolve(process.cwd(), "services.json"), () => {
  console.log("\x1b[34m%s\x1b[0m", "services.json changed");
  services = JSON.parse(
    readFileSync(resolve(process.cwd(), "services.json")).toString()
  ) as Services;
});

const proxy = httpProxy.createProxyServer({
  autoRewrite: true,
  changeOrigin: true,
});

const server = http.createServer((req, res) => {
  for (const service of services) {
    if (req.url?.startsWith(service.prefix)) {
      const { host, protocol, port } = service[service.current];
      proxy.web(req, res, {
        target: `${protocol}://${host}:${port}`,
      });
      break;
    }
  }
});

server.listen(3000);
console.log("\x1b[34m%s\x1b[0m", "Proxy server started on port 3000");
process.on("uncaughtException", (e) => {
  console.error(e);
});

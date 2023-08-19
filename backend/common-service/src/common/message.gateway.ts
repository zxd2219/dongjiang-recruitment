import { MessageRecord } from "@dongjiang-recruitment/nest-common/dist/http";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import { OnModuleInit } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  path: "/common/socket.io",
  cors: "*",
})
export class MessageGateWay implements OnModuleInit {
  private readonly redis: Redis;

  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  onModuleInit() {
    this.server.on("connection", (socket) => {
      socket.on(
        "ping",
        ({
          accountId,
          accountType,
        }: {
          accountId: string;
          accountType: number;
        }) => {
          // 60s内没有心跳，就认为用户下线了
          this.redis.set(
            `socket:${accountId}-${accountType}`,
            socket.id,
            "EX",
            60
          );
          socket.on("disconnect", () => {
            this.redis.del(`socket:${accountId}-${accountType}`);
          });
        }
      );
    });
  }

  @SubscribeMessage("message")
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: MessageRecord
  ) {
    const socketId = await this.redis.get(
      `socket:${body.serviceId}-${body.serviceType}`
    );
    if (!socketId) {
      return client.emit("error", { reason: "用户不在线", message: body });
    }
    this.server.to(socketId).emit("message", body);
  }
}

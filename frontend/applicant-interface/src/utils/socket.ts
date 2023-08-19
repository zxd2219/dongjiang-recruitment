class WebSocketPolyfill {
  constructor(url: string, protocols?: string[]) {
    // 创建连接
    uni.connectSocket({
      url: url,
      protocols: protocols,
    });

    // 连接开启
    uni.onSocketOpen((res) => {
      this.onopen(res);
    });

    // 连接关闭
    uni.onSocketClose((res) => {
      uni.connectSocket({
        url: url,
        protocols: protocols,
      });
      this.onclose(res);
    });

    // 连接异常
    uni.onSocketError((res) => {
      this.onerror(res);
    });

    // 接收消息
    uni.onSocketMessage((res) => {
      this.onmessage(res);
    });
  }

  /**
   * 连接开启
   */
  onopen(res: UniApp.OnSocketOpenCallbackResult) {}

  /**
   * 连接关闭
   */
  onclose(res: UniApp.GeneralCallbackResult) {}

  /**
   * 连接异常
   */
  onerror(res: UniApp.GeneralCallbackResult) {}

  /**
   * 接收消息
   */
  onmessage(res: UniApp.OnSocketMessageCallbackResult) {}

  /**
   * 发送消息
   */
  send(data: any) {
    uni.sendSocketMessage({
      data: data,
    });
  }

  /**
   * 关闭连接
   */
  close() {
    uni.closeSocket({});
  }
}

export default WebSocketPolyfill;

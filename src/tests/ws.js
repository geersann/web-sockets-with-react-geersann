class WebSocket {
  constructor(url) {
    this._onmessage = () => {};
    this.onopen = () => {};
  }

  set onmessage(handler) {
    this._onmessage = handler;
    WebSocket.instance = this;
  }

  static instance = {};

  addEventListener(event, cb) {
    WebSocket.instance = this;
    if (event === "message") {
      this.onmessage = cb;
    }
  }

  send(data) {
    this._onmessage({ data: data });
  }
}
let instance = WebSocket.instance;
export { instance };
export default WebSocket;

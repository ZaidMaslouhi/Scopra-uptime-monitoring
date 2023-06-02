import { Middleware } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

const websocketMiddleware: Middleware = (storeApi) => {
  let socket: WebSocket | null = null;

  const onMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    // storeApi.dispatch(data);
    console.log(data);
  };

  return (next) => (action: AnyAction) => {
    switch (action.type) {
      case "WEBSOCKET_CONNECT":
        if (socket !== null) socket.close();

        socket = new WebSocket(action.payload.url);
        socket.onmessage = onMessage;
        break;

      case "WEBSOCKET_SEND":
        if (socket !== null) socket.send(JSON.stringify(action.payload));
        break;

      case "WEBSOCKET_DISCONNECT":
        if (socket !== null) socket.close();
        socket = null;
        break;

      default:
        return next(action);
    }
  };
};

export default websocketMiddleware;

import { AnyAction } from "@reduxjs/toolkit";

export const connectWebSocket = (url: string): AnyAction => ({
  type: "WEBSOCKET_CONNECT",
  payload: { url },
});

export const sendWebSocketMessage = (message: any): AnyAction => ({
  type: "WEBSOCKET_SEND",
  payload: message,
});

export const disconnectWebSocket = (): AnyAction => ({
  type: "WEBSOCKET_DISCONNECT",
});

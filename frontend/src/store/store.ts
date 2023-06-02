import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/index";
import websocketMiddleware from "./middlewares/websocket.middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

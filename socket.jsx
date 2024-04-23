import { io } from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
const URL = "http://localhost:3000";

export const socket = io(URL, {
  query: { user_id: window.localStorage.getItem("id") },
});

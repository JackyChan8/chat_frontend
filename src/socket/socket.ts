'use client';
import { io, Socket } from "socket.io-client";

import { SERVER_WEBSOCKET } from "@/constants";

let socketChat: Socket | any;

// Get Token JWT User
let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
}

// Initialization Socket
if (!socketChat) {
  socketChat = io(`${SERVER_WEBSOCKET}chat`, {
    autoConnect: false,
    transportOptions: {
      polling: {
        extraHeaders: { Authorization: token },
      },
    },
  });
}

// Init Events DEBUG
socketChat.onAny((event: any, ...args: any) => {
  console.log("onAny socketChat: ", event, args);
});

export default socketChat;

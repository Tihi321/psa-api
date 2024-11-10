import { io, Socket } from "socket.io-client";

let globalSocket: Socket | null = null;

export const getSocket = () => {
  const socket = globalSocket || io("http://localhost:5000");

  return socket;
};

export const initializeSocket = (onConnect?: (message: string) => void) => {
  const socket = getSocket();

  socket.on("connect", () => {
    onConnect?.("Connected to Python backend!");
  });
};

export const send = (topic: string, value: any) => {
  const socket = getSocket();
  socket.emit(topic, value);
};

export const subscribe = (topic: string, Callback: (values?: any) => void) => {
  const socket = getSocket();
  socket.on(topic, Callback);
};

export const once = (topic: string, Callback: (values?: any) => void) => {
  const socket = getSocket();
  socket.once(topic, Callback);
};

export const sendMessage = (value: any) => {
  send("message", value);
};

export const subscribeMessage = (Callback: (values?: any) => void) => {
  subscribe("message", Callback);
};

export const onceMessage = (Callback: (values?: any) => void) => {
  once("message", Callback);
};

export const sendAndReceive = (topic: string, value: any, Callback: (values?: any) => void) => {
  return new Promise((resolve) => {
    once(topic, (values) => {
      Callback(values);
      resolve(values);
    });
    send(topic, value);
  });
};

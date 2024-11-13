type MessageCallback = (value?: any) => void;
type MessageHandler = {
  topic: string;
  callback: MessageCallback;
  once: boolean;
};

let globalSocket: WebSocket | null = null;
const messageHandlers: MessageHandler[] = [];

const createSocket = (port: number = 5000) => {
  const socket = new WebSocket(`ws://localhost:${port}`);

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      const { type, data } = message;

      // Find and execute matching handlers
      const handlersToExecute = messageHandlers.filter((handler) => handler.topic === type);
      handlersToExecute.forEach((handler) => {
        handler.callback(data);
        if (handler.once) {
          const index = messageHandlers.indexOf(handler);
          if (index > -1) {
            messageHandlers.splice(index, 1);
          }
        }
      });
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
    globalSocket = null;
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

export const getSocket = (port?: number) => {
  if (!globalSocket || globalSocket.readyState === WebSocket.CLOSED) {
    globalSocket = createSocket(port);
  }
  return globalSocket;
};

export const initializeSocket = (onConnect?: MessageCallback, options?: { port?: number }) => {
  const socket = getSocket(options?.port);

  socket.onopen = () => {
    onConnect?.("Connected to Python backend!");
  };
};

export const send = (topic: string, value: any) => {
  const socket = getSocket();
  if (socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ type: topic, data: value });
    socket.send(message);
  } else {
    console.error("WebSocket is not connected");
  }
};

export const subscribe = (topic: string, callback: MessageCallback) => {
  messageHandlers.push({ topic, callback, once: false });
};

export const once = (topic: string, callback: MessageCallback) => {
  messageHandlers.push({ topic, callback, once: true });
};

export const sendMessage = (value: any) => {
  send("message", value);
};

export const subscribeMessage = (callback: MessageCallback) => {
  subscribe("message", callback);
};

export const onceMessage = (callback: MessageCallback) => {
  once("message", callback);
};

export const sendAndReceive = (topic: string, value: any, callback: MessageCallback) => {
  return new Promise((resolve) => {
    once(topic, (values) => {
      callback(values);
      resolve(values);
    });
    send(topic, value);
  });
};

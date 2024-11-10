# psa-api

A Socket.IO client wrapper for Python backend communication.

## Installation

```bash
npm install psa-api
# or
yarn add psa-api
```

## Usage

```typescript
import { initializeSocket, sendMessage, subscribeMessage } from "psa-api";

// Initialize socket connection
initializeSocket((message) => {
  console.log(message); // "Connected to Python backend!"
});

// Send a message
sendMessage({ data: "Hello Python!" });

// Subscribe to messages
subscribeMessage((data) => {
  console.log("Received:", data);
});

// Send and receive in one call
import { sendAndReceive } from "psa-api";

const response = await sendAndReceive("custom-topic", { data: "test" }, (data) => {
  console.log("Received response:", data);
});
```

## API

- `initializeSocket(onConnect?: (message: string) => void)`: Initialize socket connection
- `sendMessage(value: any)`: Send a message on the "message" topic
- `subscribeMessage(callback: (values?: any) => void)`: Subscribe to messages on the "message" topic
- `onceMessage(callback: (values?: any) => void)`: Listen for a single message on the "message" topic
- `send(topic: string, value: any)`: Send a message on a custom topic
- `subscribe(topic: string, callback: (values?: any) => void)`: Subscribe to messages on a custom topic
- `once(topic: string, callback: (values?: any) => void)`: Listen for a single message on a custom topic
- `sendAndReceive(topic: string, value: any, callback: (values?: any) => void): Promise<unknown>`: Send a message and wait for a response

## License

MIT

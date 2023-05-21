import * as WebSocket from "ws";
import { Journal } from "../entity/Journal";

// change this to redis
const journalEntry = {};

const connectionManager = (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    let parsedMessage = JSON.parse(message);
    let { userId, timestamp, entry } = parsedMessage;
    if (!journalEntry[userId]) {
      journalEntry[userId] = {};
    }
    journalEntry[userId][timestamp] = { entry, newEntry: true };

    console.log(journalEntry[userId][timestamp]);
  });
};

export const insertData = () => {
  setInterval(() => {
    Object.entries(journalEntry).forEach(([user, timestamp]) => {
      Object.values(timestamp).forEach((entryObject) => {
        const { entry, newEntry } = entryObject;
        console.log(entry);
        // select user 
        // select journal
      });
    });
  }, 3000);
};

export const initWebSocketServer = () => {
  const wss = new WebSocket.Server({ port: 3003 });

  wss.on("connection", (ws: WebSocket) => {
    connectionManager(ws);
  });
};

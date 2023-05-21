"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocketServer = exports.insertData = void 0;
const WebSocket = require("ws");
// change this to redis
const journalEntry = {};
const connectionManager = (ws) => {
    ws.on("message", (message) => {
        let parsedMessage = JSON.parse(message);
        let { userId, timestamp, entry } = parsedMessage;
        if (!journalEntry[userId]) {
            journalEntry[userId] = {};
        }
        journalEntry[userId][timestamp] = { entry, newEntry: true };
        console.log(journalEntry[userId][timestamp]);
    });
};
const insertData = () => {
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
exports.insertData = insertData;
const initWebSocketServer = () => {
    const wss = new WebSocket.Server({ port: 3003 });
    wss.on("connection", (ws) => {
        connectionManager(ws);
    });
};
exports.initWebSocketServer = initWebSocketServer;
//# sourceMappingURL=webSocketController.js.map
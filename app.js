const WebSocket = require("ws");
const PORT = process.env.PORT || 7071;
const wss = new WebSocket.Server({ port: PORT });
const clients = new Map();

wss.on("connection", (ws) => {
  // const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  const metadata = { color };
  // console.log(id);
  clients.set(ws, metadata);

  ws.on("message", (messageAsString) => {
    console.log(messageAsString);
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);

    message.sender = metadata.id;
    message.color = metadata.color;

    [...clients.keys()].forEach((client) => {
      client.send(JSON.stringify(message));
    });
  });
});

wss.on("close", () => {
  clients.delete(ws);
});

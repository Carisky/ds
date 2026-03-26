const http = require("http");
const os = require("os");
const crypto = require("crypto");
const { WebSocket, WebSocketServer } = require("ws");

function getLocalIPv4Addresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family === "IPv4" && !entry.internal) {
        addresses.push(entry.address);
      }
    }
  }

  return [...new Set(addresses)];
}

function sendJson(socket, payload) {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(JSON.stringify(payload));
}

function createSignalServer(port) {
  return new Promise((resolve, reject) => {
    const httpServer = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("DS Voice LAN signaling server is running.");
    });

    const wss = new WebSocketServer({ server: httpServer });
    const clients = new Map();

    function getUsers() {
      return [...clients.values()].map((client) => ({
        id: client.id,
        username: client.username,
        muted: Boolean(client.muted)
      }));
    }

    function broadcast(payload, excludeId = null) {
      for (const client of clients.values()) {
        if (client.id === excludeId) {
          continue;
        }

        sendJson(client.socket, payload);
      }
    }

    wss.on("connection", (socket) => {
      const id = crypto.randomUUID();
      const client = {
        id,
        socket,
        username: "Guest",
        muted: false
      };

      clients.set(id, client);

      socket.on("message", (raw) => {
        let message = null;

        try {
          message = JSON.parse(raw.toString());
        } catch (error) {
          sendJson(socket, { type: "error", message: "Invalid JSON payload." });
          return;
        }

        if (message.type === "join") {
          const username = String(message.username || "").trim().slice(0, 24);
          client.username = username || "Guest";
          client.muted = Boolean(message.muted);

          const peers = getUsers().filter((user) => user.id !== id);
          sendJson(socket, {
            type: "welcome",
            selfId: id,
            peers,
            users: getUsers()
          });

          broadcast(
            {
              type: "peer-joined",
              peer: {
                id,
                username: client.username,
                muted: client.muted
              },
              users: getUsers()
            },
            id
          );

          return;
        }

        if (message.type === "presence") {
          client.muted = Boolean(message.muted);

          broadcast({
            type: "peer-presence",
            peerId: id,
            peerUsername: client.username,
            muted: client.muted,
            users: getUsers()
          });

          return;
        }

        if (message.type === "signal") {
          const targetId = String(message.targetId || "");
          const target = clients.get(targetId);

          if (!target) {
            sendJson(socket, { type: "error", message: "Target user is offline." });
            return;
          }

          sendJson(target.socket, {
            type: "signal",
            fromId: id,
            fromUsername: client.username,
            signal: message.signal
          });
        }
      });

      socket.on("close", () => {
        const disconnectedUsername = client.username;
        clients.delete(id);

        broadcast({
          type: "peer-left",
          peerId: id,
          peerUsername: disconnectedUsername,
          users: getUsers()
        });
      });
    });

    httpServer.on("error", (error) => {
      reject(error);
    });

    httpServer.listen(port, "0.0.0.0", () => {
      resolve({
        port,
        stop: () =>
          new Promise((resolveStop) => {
            for (const client of clients.values()) {
              try {
                client.socket.close();
              } catch (error) {
                void error;
              }
            }

            wss.close(() => {
              httpServer.close(() => {
                resolveStop();
              });
            });
          })
      });
    });
  });
}

module.exports = {
  createSignalServer,
  getLocalIPv4Addresses
};

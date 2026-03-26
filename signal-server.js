const dgram = require("dgram");
const http = require("http");
const os = require("os");
const crypto = require("crypto");
const { WebSocket, WebSocketServer } = require("ws");

const DISCOVERY_PORT = 39931;
const DISCOVERY_REQUEST_TYPE = "ds-voice-lan:discover";
const DISCOVERY_RESPONSE_TYPE = "ds-voice-lan:server";
const DISCOVERY_TIMEOUT_MS = 1200;
const PROBE_TIMEOUT_MS = 1200;

function getLocalIPv4Interfaces() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family === "IPv4" && !entry.internal) {
        addresses.push({
          address: entry.address,
          netmask: entry.netmask
        });
      }
    }
  }

  return addresses;
}

function getLocalIPv4Addresses() {
  return [...new Set(getLocalIPv4Interfaces().map((entry) => entry.address))];
}

function ipv4ToInt(value) {
  const parts = String(value || "")
    .split(".")
    .map((part) => Number(part));

  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return null;
  }

  return (
    ((parts[0] << 24) >>> 0) +
    ((parts[1] << 16) >>> 0) +
    ((parts[2] << 8) >>> 0) +
    (parts[3] >>> 0)
  ) >>> 0;
}

function intToIpv4(value) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255
  ].join(".");
}

function getBroadcastAddresses() {
  const addresses = new Set(["255.255.255.255"]);

  for (const entry of getLocalIPv4Interfaces()) {
    const ip = ipv4ToInt(entry.address);
    const mask = ipv4ToInt(entry.netmask);

    if (ip === null || mask === null) {
      continue;
    }

    const broadcast = (ip | (~mask >>> 0)) >>> 0;
    addresses.add(intToIpv4(broadcast));
  }

  return [...addresses];
}

function sendJson(socket, payload) {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(JSON.stringify(payload));
}

function sanitizeDiscoveryName(value, fallbackPort) {
  const clean = String(value || "").trim().slice(0, 32);
  if (clean) {
    return clean;
  }

  const host = String(os.hostname() || "").trim().slice(0, 24);
  if (host) {
    return `${host}:${fallbackPort}`;
  }

  return `Server ${fallbackPort}`;
}

function sanitizeNodeId(value, fallback = "") {
  const raw = String(value || fallback || crypto.randomUUID());
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || crypto.randomUUID();
}

function startDiscoveryResponder({ port, name, serverId }) {
  const discoverySocket = dgram.createSocket({ type: "udp4", reuseAddr: true });

  discoverySocket.on("message", (rawMessage, remoteInfo) => {
    let payload = null;

    try {
      payload = JSON.parse(rawMessage.toString("utf8"));
    } catch (error) {
      return;
    }

    if (payload?.type !== DISCOVERY_REQUEST_TYPE) {
      return;
    }

    const response = Buffer.from(JSON.stringify({
      type: DISCOVERY_RESPONSE_TYPE,
      id: serverId,
      name,
      hostname: os.hostname(),
      port,
      addresses: getLocalIPv4Addresses()
    }));

    try {
      discoverySocket.send(response, remoteInfo.port, remoteInfo.address);
    } catch (error) {
      void error;
    }
  });

  discoverySocket.on("error", () => {
    try {
      discoverySocket.close();
    } catch (error) {
      void error;
    }
  });

  try {
    discoverySocket.bind(DISCOVERY_PORT, "0.0.0.0", () => {
      try {
        discoverySocket.setBroadcast(true);
      } catch (error) {
        void error;
      }
    });
  } catch (error) {
    return null;
  }

  return discoverySocket;
}

function sanitizeDiscoveredServer(payload, remoteAddress) {
  const port = Number(payload?.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return null;
  }

  const address = `${remoteAddress}:${port}`;
  const rawId = String(payload?.id || address);
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || `server_${port}`;

  return {
    id,
    name: sanitizeDiscoveryName(payload?.name, port),
    hostname: String(payload?.hostname || "").trim().slice(0, 64),
    address,
    status: "online"
  };
}

function getDiscoveredServerPriority(server) {
  const host = String(server?.address || "").split(":")[0];

  if (host.startsWith("169.254.")) {
    return 0;
  }

  if (
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  ) {
    return 2;
  }

  return 1;
}

function discoverSignalServers(timeoutMs = DISCOVERY_TIMEOUT_MS) {
  return new Promise((resolve) => {
    const socket = dgram.createSocket("udp4");
    const discovered = new Map();
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeoutId);

      try {
        socket.close();
      } catch (error) {
        void error;
      }

      resolve([...discovered.values()]);
    };

    socket.on("message", (rawMessage, remoteInfo) => {
      let payload = null;

      try {
        payload = JSON.parse(rawMessage.toString("utf8"));
      } catch (error) {
        return;
      }

      if (payload?.type !== DISCOVERY_RESPONSE_TYPE) {
        return;
      }

      const server = sanitizeDiscoveredServer(payload, remoteInfo.address);
      if (!server) {
        return;
      }

      const key = server.id || server.address;
      const existing = discovered.get(key);

      if (!existing || getDiscoveredServerPriority(server) > getDiscoveredServerPriority(existing)) {
        discovered.set(key, server);
      }
    });

    socket.on("error", () => {
      finish();
    });

    socket.bind(0, "0.0.0.0", () => {
      try {
        socket.setBroadcast(true);
      } catch (error) {
        void error;
      }

      const request = Buffer.from(JSON.stringify({
        type: DISCOVERY_REQUEST_TYPE,
        requestedAt: Date.now()
      }));

      for (const broadcastAddress of getBroadcastAddresses()) {
        try {
          socket.send(request, DISCOVERY_PORT, broadcastAddress);
        } catch (error) {
          void error;
        }
      }
    });

    const timeoutId = setTimeout(finish, Math.max(250, Number(timeoutMs) || DISCOVERY_TIMEOUT_MS));
  });
}

function parseServerAddress(value) {
  const raw = String(value || "")
    .trim()
    .replace(/^wss?:\/\//i, "")
    .replace(/^https?:\/\//i, "");

  if (!raw) {
    return null;
  }

  try {
    const target = new URL(`http://${raw}`);
    return {
      hostname: target.hostname,
      port: Number(target.port || 80)
    };
  } catch (error) {
    return null;
  }
}

function probeSignalServer(address, timeoutMs = PROBE_TIMEOUT_MS) {
  const target = parseServerAddress(address);
  if (!target) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = (value) => {
      if (settled) {
        return;
      }

      settled = true;
      resolve(value);
    };

    const request = http.get(
      {
        hostname: target.hostname,
        port: target.port,
        path: "/",
        timeout: Math.max(250, Number(timeoutMs) || PROBE_TIMEOUT_MS)
      },
      (response) => {
        response.resume();
        finish(true);
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("Probe timeout"));
    });

    request.on("error", () => {
      finish(false);
    });
  });
}

function createSignalServer(port, options = {}) {
  return new Promise((resolve, reject) => {
    const serverId = crypto.randomUUID();
    const serverName = sanitizeDiscoveryName(options?.name, port);
    const leaderNodeId = sanitizeNodeId(options?.ownerNodeId, serverId);
    const httpServer = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("DS Voice LAN signaling server is running.");
    });
    const discoverySocket = startDiscoveryResponder({
      port,
      name: serverName,
      serverId
    });
    const wss = new WebSocketServer({ server: httpServer });
    const clients = new Map();

    function getUsers() {
      const users = new Map();

      for (const client of clients.values()) {
        if (!client.nodeId) {
          continue;
        }

        users.set(client.nodeId, {
          id: client.nodeId,
          sessionId: client.id,
          username: client.username,
          muted: Boolean(client.muted),
          leader: client.nodeId === leaderNodeId
        });
      }

      return [...users.values()];
    }

    function getClientByNodeId(nodeId) {
      for (const client of clients.values()) {
        if (client.nodeId === nodeId) {
          return client;
        }
      }

      return null;
    }

    function broadcast(payload, excludeId = null) {
      for (const client of clients.values()) {
        if (client.id === excludeId || !client.nodeId) {
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
        nodeId: "",
        username: "Guest",
        muted: false,
        replaced: false
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
          const nodeId = sanitizeNodeId(message.nodeId, id);
          client.username = username || "Guest";
          client.nodeId = nodeId;
          client.muted = Boolean(message.muted);

          const replacedClient = getClientByNodeId(nodeId);
          if (replacedClient && replacedClient.id !== id) {
            replacedClient.replaced = true;
            clients.delete(replacedClient.id);

            try {
              replacedClient.socket.close();
            } catch (error) {
              void error;
            }
          }

          const peers = getUsers().filter((user) => user.id !== nodeId);
          sendJson(socket, {
            type: "welcome",
            selfId: nodeId,
            peers,
            users: getUsers(),
            leaderId: leaderNodeId
          });

          broadcast(
            {
              type: "peer-joined",
              peer: {
                id: nodeId,
                username: client.username,
                muted: client.muted,
                leader: nodeId === leaderNodeId
              },
              users: getUsers(),
              leaderId: leaderNodeId
            },
            id
          );

          return;
        }

        if (message.type === "presence") {
          client.muted = Boolean(message.muted);

          broadcast({
            type: "peer-presence",
            peerId: client.nodeId,
            peerUsername: client.username,
            muted: client.muted,
            users: getUsers(),
            leaderId: leaderNodeId
          });

          return;
        }

        if (message.type === "signal") {
          const targetId = sanitizeNodeId(message.targetId);
          const target = getClientByNodeId(targetId);

          if (!target) {
            sendJson(socket, { type: "error", message: "Target user is offline." });
            return;
          }

          sendJson(target.socket, {
            type: "signal",
            fromId: client.nodeId,
            fromUsername: client.username,
            signal: message.signal
          });
        }
      });

      socket.on("close", () => {
        if (client.replaced) {
          return;
        }

        if (!client.nodeId) {
          clients.delete(id);
          return;
        }

        const disconnectedUsername = client.username;
        clients.delete(id);

        broadcast({
          type: "peer-left",
          peerId: client.nodeId,
          peerUsername: disconnectedUsername,
          users: getUsers(),
          leaderId: leaderNodeId
        });
      });
    });

    httpServer.on("error", (error) => {
      try {
        discoverySocket?.close();
      } catch (closeError) {
        void closeError;
      }

      reject(error);
    });

    httpServer.listen(port, "0.0.0.0", () => {
      resolve({
        id: serverId,
        name: serverName,
        ownerNodeId: leaderNodeId,
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

            try {
              discoverySocket?.close();
            } catch (error) {
              void error;
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
  discoverSignalServers,
  getLocalIPv4Addresses,
  probeSignalServer
};

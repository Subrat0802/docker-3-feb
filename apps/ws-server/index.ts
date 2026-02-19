import { prismaClient } from "@repo/db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      try {
        await prismaClient.user.create({
          data: {
            username: Math.random().toString(),
            password: Math.random().toString(),
          },
        });

        ws.send(message);
      } catch (err) {
        console.error("DB error:", err);
        ws.send("Something went wrong");
      }
    },
  },
});

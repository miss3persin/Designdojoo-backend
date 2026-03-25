import http from "node:http";
import { URL } from "node:url";

import healthHandler from "../api/health.js";
import slotsHandler from "../api/slots.js";
import submitHandler from "../api/applications/submit.js";
import merchHandler from "../api/orders/merch.js";
import sendReminderHandler from "../api/sendReminder.js";

const PORT = Number(process.env.API_DEV_PORT || 3001);

const routes = new Map([
  ["/api/health", healthHandler],
  ["/api/slots", slotsHandler],
  ["/api/applications/submit", submitHandler],
  ["/api/orders/merch", merchHandler],
  ["/api/sendReminder", sendReminderHandler],
]);

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", () => resolve(""));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const handler = routes.get(url.pathname);

  const resAdapter = {
    setHeader: (name, value) => res.setHeader(name, value),
    getHeader: (name) => res.getHeader(name),
    status: (code) => {
      res.statusCode = code;
      return resAdapter;
    },
    end: (payload = "") => res.end(payload),
  };

  if (url.pathname === "/" || url.pathname === "/api") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify(
        {
          ok: true,
          message: "API dev server is running",
          endpoints: Array.from(routes.keys()).sort(),
        },
        null,
        2
      )
    );
    return;
  }

  if (!handler) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
    return;
  }

  const raw = await readBody(req);
  if (raw) {
    req.body = raw;
  }

  await handler(req, resAdapter);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API dev server listening on http://localhost:${PORT}`);
});

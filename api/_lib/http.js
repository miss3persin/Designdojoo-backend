const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS;
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin, allowedOrigins) {
  if (!origin) {
    return false;
  }

  if (!allowedOrigins.length) {
    return true;
  }

  if (allowedOrigins.includes("*")) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

export function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (isOriginAllowed(origin, allowedOrigins)) {
    const allowOrigin = allowedOrigins.includes("*") ? "*" : origin;
    res.setHeader("Access-Control-Allow-Origin", allowOrigin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");
}

export function handleCorsPreflight(req, res) {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

export function sendJson(res, statusCode, payload, extraHeaders = {}) {
  Object.entries(BASE_HEADERS).forEach(([name, value]) => {
    res.setHeader(name, value);
  });
  Object.entries(extraHeaders).forEach(([name, value]) => {
    res.setHeader(name, value);
  });
  res.status(statusCode).end(JSON.stringify(payload));
}

export function methodNotAllowed(res, allowedMethods) {
  sendJson(
    res,
    405,
    {
      error: "Method not allowed",
      allowed_methods: allowedMethods,
    },
    { Allow: allowedMethods.join(", ") }
  );
}

export function getClientIp(req) {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.trim()) {
    return xForwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(xForwardedFor) && xForwardedFor.length) {
    return xForwardedFor[0];
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress ?? null;
}

export function readJsonBody(req) {
  if (req.body == null) {
    return {};
  }

  if (typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    const trimmed = req.body.trim();
    if (!trimmed) {
      return {};
    }
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      throw new Error("Invalid JSON body");
    }
  }

  throw new Error("Unsupported request body");
}

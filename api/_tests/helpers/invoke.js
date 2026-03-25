export async function invokeHandler(handler, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    remoteAddress = "127.0.0.1",
  } = options;

  const normalizedHeaders = Object.entries(headers).reduce((acc, [key, value]) => {
    acc[String(key).toLowerCase()] = value;
    return acc;
  }, {});

  const req = {
    method,
    headers: normalizedHeaders,
    body,
    socket: {
      remoteAddress,
    },
  };

  const responseHeaders = {};
  let statusCode = 200;
  let responseBody = "";
  let ended = false;

  const res = {
    setHeader(name, value) {
      responseHeaders[String(name).toLowerCase()] = value;
    },
    getHeader(name) {
      return responseHeaders[String(name).toLowerCase()];
    },
    status(code) {
      statusCode = code;
      return this;
    },
    end(payload = "") {
      ended = true;
      responseBody = payload == null ? "" : String(payload);
      return this;
    },
  };

  await handler(req, res);
  if (!ended) {
    res.end("");
  }

  let json = null;
  try {
    json = responseBody ? JSON.parse(responseBody) : null;
  } catch {
    json = null;
  }

  return {
    statusCode,
    headers: responseHeaders,
    body: responseBody,
    json,
  };
}

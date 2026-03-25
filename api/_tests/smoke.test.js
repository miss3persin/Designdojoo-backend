import test from "node:test";
import assert from "node:assert/strict";

import healthHandler from "../health.js";
import slotsHandler from "../slots.js";
import submitApplicationHandler from "../applications/submit.js";
import merchOrderHandler from "../orders/merch.js";
import { invokeHandler } from "./helpers/invoke.js";

const HAS_BACKEND_ENV = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

test("health endpoint responds healthy", { skip: !HAS_BACKEND_ENV }, async () => {
  const response = await invokeHandler(healthHandler, {
    method: "GET",
    headers: { origin: "http://localhost:5173" },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json?.ok, true);
  assert.equal(response.json?.status, "healthy");
});

test("slots endpoint returns slot payload", { skip: !HAS_BACKEND_ENV }, async () => {
  const response = await invokeHandler(slotsHandler, {
    method: "GET",
    headers: { origin: "http://localhost:5173" },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json?.ok, true);
  assert.equal(typeof response.json?.slots_left, "number");
});

test(
  "application submit rejects invalid payload",
  { skip: !HAS_BACKEND_ENV },
  async () => {
    const response = await invokeHandler(submitApplicationHandler, {
      method: "POST",
      headers: { origin: "http://localhost:5173" },
      body: {
        full_name: "Only Name",
      },
    });

    assert.equal(response.statusCode, 422);
    assert.equal(response.json?.ok, false);
    assert.equal(response.json?.error, "Validation failed");
  }
);

test("merch endpoint rejects empty order payload", { skip: !HAS_BACKEND_ENV }, async () => {
  const response = await invokeHandler(merchOrderHandler, {
    method: "POST",
    headers: { origin: "http://localhost:5173" },
    body: {
      customer_name: "Test User",
      customer_phone: "+2347000000000",
      items: [],
    },
  });

  assert.equal(response.statusCode, 422);
  assert.equal(response.json?.ok, false);
  assert.equal(response.json?.error, "Validation failed");
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  validateApplicationPayload,
  validateMerchOrderPayload,
} from "../_lib/validation.js";

test("validateApplicationPayload accepts valid payload", () => {
  const result = validateApplicationPayload({
    full_name: "Jane Doe",
    email: "jane@example.com",
    phone: "+2348000000000",
    social_handle: "@janedoe",
    city: "Lagos",
    country: "Nigeria",
    portfolio: "https://linkedin.com/in/jane",
    track: "Combined Scholarship (UI/UX + PM)",
    referral: "Instagram",
    blocker: "I have no portfolio projects and no structure.",
    accountability: "I need someone to keep me consistent weekly.",
    commitment: "Yes, I can commit",
  });

  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.data.email, "jane@example.com");
});

test("validateApplicationPayload rejects missing required fields", () => {
  const result = validateApplicationPayload({
    full_name: "",
    email: "bad-email",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.field === "full_name"));
  assert.ok(result.errors.some((e) => e.field === "email"));
  assert.ok(result.errors.some((e) => e.field === "phone"));
});

test("validateMerchOrderPayload accepts merch cart and computes totals", () => {
  const result = validateMerchOrderPayload({
    customer_name: "Jane Doe",
    customer_phone: "+2348000000000",
    customer_email: "jane@example.com",
    currency: "ngn",
    shipping: "500",
    items: [
      { name: "T-Shirt", quantity: 2, unit_price: "5500" },
      { name: "Lanyard", qty: 1, price: "1850" },
    ],
  });

  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.data.subtotal, 12850);
  assert.equal(result.data.total, 13350);
  assert.equal(result.data.currency, "NGN");
});

test("validateMerchOrderPayload rejects empty carts", () => {
  const result = validateMerchOrderPayload({
    customer_name: "Jane Doe",
    customer_phone: "+2348000000000",
    items: [],
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.field === "items"));
});

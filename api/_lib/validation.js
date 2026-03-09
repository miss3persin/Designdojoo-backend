const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function coerceMoney(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Number(value.toFixed(2));
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    if (!cleaned) {
      return NaN;
    }
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed)) {
      return Number(parsed.toFixed(2));
    }
  }

  return NaN;
}

function pushError(errors, field, message) {
  errors.push({ field, message });
}

export function validateApplicationPayload(payload) {
  const errors = [];
  const sanitized = {
    full_name: normalizeString(payload?.full_name),
    email: normalizeString(payload?.email).toLowerCase(),
    phone: normalizeString(payload?.phone),
    social_handle: normalizeString(payload?.social_handle),
    city: normalizeString(payload?.city),
    country: normalizeString(payload?.country),
    portfolio: normalizeString(payload?.portfolio),
    track: normalizeString(payload?.track),
    referral: normalizeString(payload?.referral),
    blocker: normalizeString(payload?.blocker),
    accountability: normalizeString(payload?.accountability),
    commitment: normalizeString(payload?.commitment),
  };

  const requiredFields = [
    "full_name",
    "email",
    "phone",
    "social_handle",
    "city",
    "country",
    "track",
    "referral",
    "blocker",
    "accountability",
    "commitment",
  ];

  requiredFields.forEach((field) => {
    if (!sanitized[field]) {
      pushError(errors, field, "This field is required");
    }
  });

  if (sanitized.email && !EMAIL_REGEX.test(sanitized.email)) {
    pushError(errors, "email", "Email format is invalid");
  }

  if (sanitized.phone && sanitized.phone.length < 7) {
    pushError(errors, "phone", "Phone number is too short");
  }

  if (sanitized.blocker && sanitized.blocker.length < 10) {
    pushError(errors, "blocker", "Please add more details");
  }

  if (sanitized.accountability && sanitized.accountability.length < 10) {
    pushError(errors, "accountability", "Please add more details");
  }

  if (sanitized.portfolio.length > 300) {
    pushError(errors, "portfolio", "Portfolio URL is too long");
  }

  if (sanitized.full_name.length > 120) {
    pushError(errors, "full_name", "Full name is too long");
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: sanitized,
  };
}

export function validateMerchOrderPayload(payload) {
  const errors = [];
  const customer_name = normalizeString(payload?.customer_name);
  const customer_phone = normalizeString(payload?.customer_phone);
  const customer_email = normalizeString(payload?.customer_email).toLowerCase();
  const notes = normalizeString(payload?.notes);
  const rawItems = Array.isArray(payload?.items) ? payload.items : [];
  const currency = normalizeString(payload?.currency).toUpperCase() || "NGN";

  if (!customer_name) {
    pushError(errors, "customer_name", "Customer name is required");
  }
  if (!customer_phone) {
    pushError(errors, "customer_phone", "Customer phone is required");
  }
  if (customer_email && !EMAIL_REGEX.test(customer_email)) {
    pushError(errors, "customer_email", "Email format is invalid");
  }
  if (!rawItems.length) {
    pushError(errors, "items", "At least one item is required");
  }

  const items = [];
  rawItems.forEach((item, index) => {
    const name = normalizeString(item?.name);
    const quantity = Number(item?.quantity ?? item?.qty);
    const unit_price = coerceMoney(item?.unit_price ?? item?.price);

    if (!name) {
      pushError(errors, `items[${index}].name`, "Item name is required");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      pushError(errors, `items[${index}].quantity`, "Quantity must be 1-100");
      return;
    }
    if (!Number.isFinite(unit_price) || unit_price < 0) {
      pushError(errors, `items[${index}].unit_price`, "Invalid item price");
      return;
    }

    const line_total = Number((unit_price * quantity).toFixed(2));
    items.push({
      name,
      quantity,
      unit_price,
      line_total,
    });
  });

  const subtotal = Number(
    items.reduce((total, item) => total + item.line_total, 0).toFixed(2)
  );
  const shipping = coerceMoney(payload?.shipping ?? 0);
  const total = Number(
    (subtotal + (Number.isFinite(shipping) && shipping > 0 ? shipping : 0)).toFixed(2)
  );

  if (notes.length > 2000) {
    pushError(errors, "notes", "Notes are too long");
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      customer_name,
      customer_phone,
      customer_email: customer_email || null,
      notes: notes || null,
      currency,
      items,
      subtotal,
      total,
    },
  };
}

export const DATE_TIME_FORMAT = "dd MMM, yyyy HH:mm:ss a";
export const DATE_FORMAT = "dd MMM, yyyy";

export const STATUS = Object.freeze({
  DRAFT: 0,
  ACTIVE: 1,
  ARCHIVE: -1,
});

export const ORDER_STATUS = Object.freeze({
  PENDING: 0,
  PLACED: 1,
  PREPARED: 2,
  DISPATCHED: 3,
  CANCELLED: 4,
  DELIVERED: 5,
  RETURNED: 6,
});

export const USER_STATUS = Object.freeze({
  ARCHIVE: -1,
  ACTIVE: 1,
  INACTIVE: 0,
});

export const FACET_TYPE = Object.freeze({
  OTHER: 0,
  SIZE: 1,
  MATERIAL: 2,
  COLOR: 3,
});

export const ADDRESS_TYPE = Object.freeze({
  HOME: 0,
  OFFICE: 1,
  OTHER: 2,
});

export const NUMBER_TYPE = Object.freeze({
  ABSOLUTE: 0,
  PERCENTAGE: 1,
});

export const WEIGHT_UNIT = Object.freeze({
  KG: 0,
  G: 1,
  OZ: 2,
  LB: 3,
  ML: 4,
  L: 5,
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
  REFUNDED: 3,
});

export const PAYMENT_GATEWAY = Object.freeze({
  NONE: 0,
  PHONEPE: 1,
  RAZORPAY: 2,
  PAYTM: 3,
});

export const SHIPPING_VENDOR = Object.freeze({
  SHIPROCKET: 0,
  DELHIVERY: 1,
  AMAZON: 2,
  FLIPKART: 3,
  MYNTRA: 4,
  NONE: 5,
});

export const PAYMENT_MODE = Object.freeze({
  OFFLINE: 0,
  ONLINE: 1,
});

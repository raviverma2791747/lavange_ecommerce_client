import { service } from "@/types/service";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const asNumber = (value: unknown, fallback: number): number =>
  typeof value === "number" ? value : fallback;

const asBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === "boolean" ? value : fallback;

const asString = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

export const normalizeApiResponse = (
  payload: unknown,
  fallbackStatus = 200,
): service.IBaseResponse => {
  const okByStatus = fallbackStatus >= 200 && fallbackStatus < 300;
  const raw = isObject(payload) ? payload : {};
  const status = asNumber(raw.status, fallbackStatus);
  const success = asBoolean(raw.success, status >= 200 && status < 300);
  const message = asString(
    raw.message,
    success ? "Request successful" : `Request failed with status ${status}`,
  );

  const data = (() => {
    if (isObject(raw.data)) return raw.data;
    if (isObject(payload)) return payload as Record<string, unknown>;
    return {};
  })();

  return { status, success, message, data: okByStatus ? data : data };
};

export const toApiErrorResponse = (error: unknown): service.IBaseResponse => {
  const raw = isObject(error) ? error : {};
  const status = asNumber(raw.status, 0);
  const message = asString(
    raw.message,
    status === 0
      ? "Unable to reach server. Please check your connection and try again."
      : `Request failed with status ${status}`,
  );

  return {
    status,
    success: false,
    message,
    data: {},
  };
};

export const isApiSuccess = (response: service.IBaseResponse | null | undefined): boolean =>
  !!response && response.success && response.status >= 200 && response.status < 300;

export const getApiErrorMessage = (
  response: service.IBaseResponse | null | undefined,
  fallback = "Something went wrong",
): string => {
  if (!response) return fallback;
  if (response.status === 0) return response.message || fallback;
  if (response.status === 401) return response.message || "Unauthorized request";
  if (response.status === 403) return response.message || "You do not have permission";
  if (response.status === 404) return response.message || "Requested resource not found";
  if (response.status === 422) return response.message || "Please check submitted fields";
  if (response.status === 429) return response.message || "Too many requests. Please try again later";
  return response.message || fallback;
};

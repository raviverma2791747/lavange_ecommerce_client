import { API_CONFIG } from "./config";
import { HttpError } from "./errors";

type RequestOptions = RequestInit;

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // ⭐ critical
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
console.log(options, res)
  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = "/login";
    }

    throw new HttpError(data?.message || "Request failed", res.status);
  }

  return data;
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),

  post: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

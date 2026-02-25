import { API_CONFIG } from "./config";
import { HttpError } from "./errors";

type RequestOptions = RequestInit & {
  _retry?: boolean;
  _skipAuthHandling?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = fetch(`${API_CONFIG.BASE_URL}/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { _retry, _skipAuthHandling, ...fetchOptions } = options;

  const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const isRefreshRequest = endpoint === "/v1/auth/refresh";

    if (res.status === 401 && !_skipAuthHandling && !_retry && !isRefreshRequest) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return request<T>(endpoint, { ...options, _retry: true });
      }
    }

    if (res.status === 401 && typeof window !== "undefined") {
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?redirect=${redirect}`;
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
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PUT",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  patch: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PATCH",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

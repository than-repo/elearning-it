// src/lib/api.ts

const API_BASE = "https://elearningnew.cybersoft.edu.vn/api";
const CYBERSOFT_TOKEN = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

//  CUSTOM ERROR
class ApiError extends Error {
  status: number;
  body?: string;
  constructor(message: string, status: number, body?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

//  UTILS
const isClient = typeof window !== "undefined";

//  TOKEN CACHE
let tokenCache: string | null = null;

const getAccessToken = (): string | null => {
  if (tokenCache) return tokenCache;
  if (!isClient) return null;

  for (const key of ["USER_INFO", "ADMIN_INFO"] as const) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.accessToken) {
          tokenCache = data.accessToken;
          return tokenCache;
        }
      }
    } catch {}
  }
  return null;
};

const updateAccessToken = (newToken: string) => {
  tokenCache = newToken;
  if (!isClient) return;

  for (const key of ["USER_INFO", "ADMIN_INFO"] as const) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.refreshToken) {
          localStorage.setItem(
            key,
            JSON.stringify({ ...data, accessToken: newToken })
          );
        }
      }
    } catch {}
  }
};

const clearAuth = () => {
  tokenCache = null;
  if (isClient) {
    localStorage.removeItem("USER_INFO");
    localStorage.removeItem("ADMIN_INFO");
  }
};

//  REFRESH TOKEN QUEUE (CLIENT ONLY)
let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const subscribeTokenRefresh = (
  cb: (token: string | null) => void
) => {
  refreshSubscribers.push(cb);
};

const broadcastRefresh = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

//  CORE FETCHER (có timeout + abort mới mỗi lần)
const fetcher = async (
  url: string,
  init: RequestInit & { timeout?: number } = {}
): Promise<Response> => {
  const { timeout = 15000, ...fetchOptions } = init;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

//  MAIN API
export const api = async <T = any>(
  endpoint: string,
  {
    method = "GET",
    body,
    cache,
    next,
    auth = true,
    server = false, // true -> gọi từ server component/action -> KHÔNG refresh token
    timeout = 15000,
  }: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    cache?: RequestCache;
    next?: NextFetchOptions;
    auth?: boolean;
    server?: boolean;
    timeout?: number;
  } = {}
): Promise<T> => {
  const url = `${API_BASE}${endpoint}`;

  const createHeaders = (token?: string | null) => {
    const h = new Headers({
      TokenCybersoft: CYBERSOFT_TOKEN,
    });
    if (token) h.set("Authorization", `Bearer ${token}`);
    if (body && !(body instanceof FormData)) {
      h.set("Content-Type", "application/json");
    }
    return h;
  };

  const makeRequest = (token?: string | null) =>
    fetcher(url, {
      method,
      headers: createHeaders(token),
      body:
        body instanceof FormData
          ? body
          : body
          ? JSON.stringify(body)
          : undefined,
      cache,
      next: server
        ? { revalidate: next?.revalidate, tags: next?.tags }
        : undefined,
      timeout,
    });

  //  1. Trường hợp server -> không refresh token, chỉ gọi 1 lần
  if (server) {
    const res = await makeRequest(getAccessToken()); // token thường null, hoặc bạn truyền từ cookie
    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(`HTTP ${res.status}`, res.status, text);
    }
    return parseResponse<T>(res);
  }

  //  2. Client-side: gọi lần đầu
  let res = await makeRequest(getAccessToken());

  // = 3. 401 -> refresh token (chỉ client)
  if (res.status === 401 && auth && isClient) {
    // Tránh vòng lặp nếu chính endpoint refresh token bị 401
    if (url.includes("/refresh-token")) {
      clearAuth();
      throw new ApiError("UNAUTHENTICATED", 401);
    }

    if (isRefreshing) {
      // Đang có người khác refresh -> đợi
      const newToken = await new Promise<string | null>((resolve) => {
        subscribeTokenRefresh((token) => resolve(token));
      });
      if (!newToken) throw new ApiError("UNAUTHENTICATED", 401);
      res = await makeRequest(newToken);
    } else {
      isRefreshing = true;
      try {
        const refreshToken = getRefreshTokenFromStorage();
        if (!refreshToken) throw new Error("No refresh token");

        const refreshRes = await fetcher(
          `${API_BASE}/QuanLyNguoiDung/refresh-token`,
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              TokenCybersoft: CYBERSOFT_TOKEN,
            }),
            body: JSON.stringify({ refreshToken }),
            timeout,
          }
        );

        if (!refreshRes.ok) throw new Error("Refresh failed");
        const json = await refreshRes.json();
        const newToken =
          json.content?.accessToken || json.accessToken;
        if (!newToken) throw new Error("No new token");

        updateAccessToken(newToken);
        broadcastRefresh(newToken);

        res = await makeRequest(newToken);
      } catch {
        clearAuth();
        broadcastRefresh(null);
        throw new ApiError("UNAUTHENTICATED", 401); // ← để component xử lý redirect
      } finally {
        isRefreshing = false;
      }
    }
  }

  //  4. Xử lý response
  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(`HTTP ${res.status}`, res.status, text);
  }

  return parseResponse<T>(res);
};

//  HELPER FUNCTIONS
const getRefreshTokenFromStorage = (): string | null => {
  if (!isClient) return null;
  for (const key of ["USER_INFO", "ADMIN_INFO"] as const) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.refreshToken) return data.refreshToken;
      }
    } catch {}
  }
  return null;
};

const parseResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    const json = JSON.parse(text);
    return (json.content ?? json) as T;
  } catch {
    return text as T;
  }
};

// Default to backend dev port 3001; override via REACT_APP_API_URL for other environments.
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export { API_BASE };

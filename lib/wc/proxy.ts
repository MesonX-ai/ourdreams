"use client";

/**
 * TIER 3 — runtime, privileged.
 *
 * Thin typed wrapper around our own PHP proxy (`/api/*.php`). The browser only
 * ever talks to our endpoints on the same origin; secrets live server-side in
 * `php/`. Request/response shapes mirror the zod schemas in `lib/campaign` and
 * the PHP validators in `php/`.
 */

export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string>) {
    super(message);
  }
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    errors?: Record<string, string>;
    data?: T;
  };

  if (!res.ok || json.ok === false) {
    throw new ApiError(res.status, json.message ?? "Request failed", json.errors);
  }
  return json.data as T;
}

export const api = {
  contact: (payload: unknown) => request<{ id: string }>("contact", payload),
  demoRequest: (payload: unknown) => request<{ id: string }>("demo-request", payload),
  quote: (payload: unknown) => request<{ id: string }>("quote", payload),
  newsletter: (payload: unknown) => request<{ ok: true }>("newsletter", payload),
  campaignSave: (payload: unknown) => request<{ id: number }>("campaigns", payload),
};

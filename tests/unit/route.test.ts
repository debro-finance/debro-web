import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WaitlistDb } from "@/server/waitlist";

const state = vi.hoisted(() => ({
  db: null as WaitlistDb | null,
  enabled: true,
}));

vi.mock("@/server/db", () => ({
  getWaitlistDb: () => state.db,
}));

vi.mock("@/lib/site", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site")>();
  return {
    ...actual,
    isWaitlistEnabled: () => state.enabled,
  };
});

const { POST } = await import("@/app/api/waitlist/route");

function makeDb(implementation?: WaitlistDb["insertSubscriber"]) {
  const insertSubscriber: WaitlistDb["insertSubscriber"] =
    implementation ?? (async () => "inserted");

  return {
    insertSubscriber: vi.fn(insertSubscriber),
  };
}

function request(
  body: string,
  {
    ip = "203.0.113.10",
    headers = {},
  }: { ip?: string; headers?: Record<string, string> } = {},
) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `${ip}, 10.0.0.1`,
      ...headers,
    },
    body,
  });
}

beforeEach(() => {
  state.db = makeDb();
  state.enabled = true;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/waitlist", () => {
  it("accepts a valid signup and marks the response as uncacheable", async () => {
    const response = await POST(
      request(JSON.stringify({ email: "User@Example.com", consent: true })),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(state.db?.insertSubscriber).toHaveBeenCalledWith("user@example.com");
  });

  it("rejects a disabled waitlist without reading subscriber data", async () => {
    state.enabled = false;
    const response = await POST(
      request(JSON.stringify({ email: "user@example.com", consent: true })),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: "disabled" });
    expect(state.db?.insertSubscriber).not.toHaveBeenCalled();
  });

  it("rejects an oversized content length", async () => {
    const response = await POST(
      request("{}", { headers: { "content-length": "999999" } }),
    );

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({
      ok: false,
      error: "invalid_request",
    });
  });

  it("rejects malformed requests with a safe error", async () => {
    const response = await POST(request("not json"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      error: "invalid_request",
    });
  });

  it("returns a retry header after repeated submissions", async () => {
    const body = JSON.stringify({ email: "limit@example.com", consent: true });
    let response: Response | null = null;

    for (let attempt = 0; attempt < 6; attempt += 1) {
      response = await POST(request(body, { ip: "198.51.100.77" }));
    }

    expect(response?.status).toBe(429);
    expect(Number(response?.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("hides database failures behind a generic response", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    state.db = makeDb(async () => {
      throw new Error("database exploded");
    });

    const response = await POST(
      request(JSON.stringify({ email: "user@example.com", consent: true })),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: "unavailable" });
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(
      "user@example.com",
    );
  });
});

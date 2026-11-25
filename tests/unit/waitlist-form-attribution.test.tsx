// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.pushState({}, "", "/");
});

describe("waitlist form attribution capture", () => {
  it("sends only approved UTM query parameters with the registration", async () => {
    window.history.pushState(
      {},
      "",
      "/?utm_source=newsletter&utm_medium=email&utm_campaign=prelaunch&utm_content=hero&utm_term=ignore&ref=secret",
    );

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<WaitlistForm enabled />);
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "subscriber@example.com" },
    });
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /I agree to receive one email announcing DeBro's availability/,
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Join the waitlist" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/waitlist");
    expect(JSON.parse(String(init.body))).toEqual({
      email: "subscriber@example.com",
      consent: true,
      company: "",
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "prelaunch",
      utm_content: "hero",
    });
  });
});

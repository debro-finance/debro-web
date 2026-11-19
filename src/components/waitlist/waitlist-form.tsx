"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckIcon, SpinnerIcon } from "@/components/ui/icons";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string; field?: "email" | "consent" };

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Enter a valid email address.",
  consent_required:
    "Please confirm that we may email you about DeBro's launch.",
  rate_limited: "Too many attempts. Please try again in a few minutes.",
  disabled: "The waitlist is not open yet.",
  unavailable: "We couldn't save your signup. Please try again shortly.",
  invalid_request: "We couldn't process that request. Please try again.",
};

export function WaitlistForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const loading = status.kind === "loading";
  const error = status.kind === "error" ? status : null;
  const describedBy = error ? "waitlist-note waitlist-error" : "waitlist-note";

  useEffect(() => {
    if (status.kind === "success") {
      successRef.current?.focus();
    }
  }, [status.kind]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enabled || loading) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";
    const company = String(data.get("company") ?? "");

    if (!email) {
      setStatus({
        kind: "error",
        message: "Enter your email address.",
        field: "email",
      });
      emailRef.current?.focus();
      return;
    }

    if (!consent) {
      setStatus({
        kind: "error",
        message: "Please confirm that we may email you about DeBro's launch.",
        field: "consent",
      });
      consentRef.current?.focus();
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, company }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (response.ok && payload?.ok) {
        form.reset();
        setStatus({ kind: "success" });
        return;
      }

      const message =
        (payload?.error && ERROR_MESSAGES[payload.error]) ||
        ERROR_MESSAGES.unavailable ||
        "Something went wrong. Please try again shortly.";

      setStatus({
        kind: "error",
        message,
        field: payload?.error === "invalid_email" ? "email" : undefined,
      });

      if (payload?.error === "invalid_email") {
        emailRef.current?.focus();
      }
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Please try again shortly.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-72 flex-col items-start justify-center rounded-2xl border border-line bg-surface p-7"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckIcon className="h-5 w-5" />
        </div>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink focus:outline-none"
        >
          You&apos;re on the list.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We&apos;ll email you when DeBro launches.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={loading}
      noValidate
      className="space-y-5"
    >
      <p className="sr-only" role="status" aria-live="polite">
        {loading ? "Submitting your waitlist signup." : ""}
      </p>
      {!enabled ? (
        <p className="rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted-strong">
          Waitlist registration is currently unavailable. Please check back for
          updates.
        </p>
      ) : null}

      <div>
        <label
          htmlFor="waitlist-email"
          className="block text-sm font-medium text-ink"
        >
          Email address
        </label>
        <input
          ref={emailRef}
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={!enabled || loading}
          aria-invalid={error?.field === "email" ? true : undefined}
          aria-describedby={describedBy}
          placeholder="you@example.com"
          className="mt-2 block h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-base text-ink shadow-sm transition-colors placeholder:text-muted hover:border-navy/25 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-strong">
          <input
            ref={consentRef}
            type="checkbox"
            name="consent"
            required
            disabled={!enabled || loading}
            aria-invalid={error?.field === "consent" ? true : undefined}
            aria-describedby={describedBy}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy disabled:cursor-not-allowed"
          />
          <span>
            I agree to receive one email announcing DeBro&apos;s availability.
            No newsletters or recurring marketing.
          </span>
        </label>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="waitlist-company">Company</label>
        <input
          id="waitlist-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error ? (
        <p
          id="waitlist-error"
          role="alert"
          className="rounded-xl border border-danger/20 bg-danger/[0.04] px-4 py-3 text-sm text-danger"
        >
          {error.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!enabled || loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <SpinnerIcon className="h-4 w-4 animate-spin" />
            Joining…
          </>
        ) : enabled ? (
          "Join the waitlist"
        ) : (
          "Waitlist unavailable"
        )}
      </button>

      <p id="waitlist-note" className="text-xs leading-relaxed text-muted">
        We use your email only to announce DeBro&apos;s launch. Read our{" "}
        <a
          href="/waitlist-privacy"
          className="font-medium text-navy underline underline-offset-2"
        >
          Waitlist Privacy notice
        </a>
        .
      </p>
    </form>
  );
}

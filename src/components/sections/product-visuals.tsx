"use client";

import { useEffect, useRef, useState } from "react";

const DISCOVER_SECTIONS = [
  {
    eyebrow: "EXPLORE",
    title: "Find your next opportunity.",
    description: "Discover companies, stocks, and ETFs across a growing universe of tokenized assets.",
  },
  {
    eyebrow: "RESEARCH",
    title: "Look beyond the ticker.",
    description: "Get to know the companies behind the assets through company information and market context.",
  },
  {
    eyebrow: "EVALUATE",
    title: "Invest with greater perspective.",
    description: "Review relevant information and assess opportunities before making your own investment decisions.",
  },
] as const;

const INVEST_STEPS = [
  { number: "01", title: "Select an asset", description: "Choose from a wide range of tokenized stocks and ETFs." },
  { number: "02", title: "Set an amount", description: "Decide how much to invest." },
  { number: "03", title: "Review and confirm", description: "Check the details before proceeding." },
] as const;

const ALLOCATIONS = [
  { name: "Technology", value: 58, color: "#141b3d" },
  { name: "Financials", value: 24, color: "#2f55d4" },
  { name: "Other", value: 18, color: "#cbd0dc" },
] as const;
const DONUT_RADIUS = 42;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

export function DiscoverVisual() {
  return (
    <figure aria-label="Discover investment opportunities" className="w-full">
      <div className="border-y border-line">
        {DISCOVER_SECTIONS.map((section, index) => (
          <div
            key={section.eyebrow}
            className={`${index > 0 ? "border-t border-line" : ""} py-8`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {section.eyebrow}
            </p>
            <h4 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
              {section.title}
            </h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function InvestVisual() {
  return (
    <figure aria-label="Illustrative investing steps" className="w-full">
      <div className="border-y border-line">
        <p className="py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          How investing works
        </p>
        <ol className="divide-y divide-line">
          {INVEST_STEPS.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr]"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.05em] text-navy/20">
                {step.number}
              </span>
              <div>
                <h4 className="text-lg font-semibold tracking-[-0.015em] text-ink">
                  {step.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-xs text-muted">
        Illustrative only. No live prices or trades.
      </figcaption>
    </figure>
  );
}

export function ControlVisual() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setHasEntered(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(chart);
    return () => observer.disconnect();
  }, []);

  return (
    <figure aria-label="Illustrative portfolio overview" className="w-full">
      <div className="border-y border-line py-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div ref={chartRef} className="relative size-40 shrink-0 sm:size-44">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="size-full -rotate-90 overflow-visible"
            >
              <circle
                cx="50"
                cy="50"
                r={DONUT_RADIUS}
                fill="none"
                stroke="#e4e6ec"
                strokeWidth="11"
              />
              {ALLOCATIONS.map((allocation, index) => {
                const length =
                  (allocation.value / 100) * DONUT_CIRCUMFERENCE;
                const offset =
                  -ALLOCATIONS.slice(0, index).reduce(
                    (total, previous) =>
                      total + (previous.value / 100) * DONUT_CIRCUMFERENCE,
                    0,
                  );
                return (
                  <circle
                    key={allocation.name}
                    cx="50"
                    cy="50"
                    r={DONUT_RADIUS}
                    fill="none"
                    stroke={allocation.color}
                    strokeWidth="11"
                    strokeLinecap="butt"
                    strokeDasharray={`${hasEntered ? length : 0} ${DONUT_CIRCUMFERENCE}`}
                    strokeDashoffset={offset}
                    style={{
                      transition:
                        "stroke-dasharray 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay: hasEntered ? `${index * 110}ms` : "0ms",
                    }}
                  />
                );
              })}
            </svg>
          </div>
          <ul className="w-full min-w-0 space-y-4 sm:w-auto">
            {ALLOCATIONS.map((allocation) => (
              <li key={allocation.name} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0"
                  style={{ backgroundColor: allocation.color }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted">{allocation.name}</span>
                  <span className="mt-0.5 block text-sm font-semibold tabular-nums text-ink">
                    {allocation.value}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Illustrative allocation only. Not a live portfolio.</p>
    </figure>
  );
}

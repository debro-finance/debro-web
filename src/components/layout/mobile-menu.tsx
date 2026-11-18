"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { WAITLIST_HREF } from "@/lib/site";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Move focus without scrolling the page behind the fixed panel.
    panelRef.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    function handleDesktopChange() {
      if (desktop.matches) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", handleDesktopChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", handleDesktopChange);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-surface focus-visible:outline-accent"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
      </button>

      {open ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-navy/15"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-card"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto max-w-6xl px-5 py-4 sm:px-6"
            >
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line/70 py-3.5 text-base font-medium text-ink transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={WAITLIST_HREF}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-accent"
              >
                Join the waitlist
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { isWaitlistEnabled, NAV_LINKS, WAITLIST_HREF } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const waitlistEnabled = isWaitlistEnabled();

  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#main"
              aria-label="DeBro — back to top"
              className="inline-flex rounded-sm"
            >
              <Logo variant="white" className="h-6 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Explore global investment opportunities in tokenized stocks and
              financial assets.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-300"
              />
              Prelaunch
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={WAITLIST_HREF}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Join the waitlist
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Waitlist privacy
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {waitlistEnabled
                ? "Waitlist registration is open for one launch-availability email only; there are no newsletters. Our privacy notice is not yet published, and key details still require confirmation."
                : "Waitlist registration is currently unavailable. Our privacy notice is not yet published, and key details still require confirmation."}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/55">
            Tokenized assets involve risk, and a token may not provide direct
            ownership of an underlying asset. Nothing on this website is
            investment advice or an offer to buy or sell a financial
            instrument.
          </p>
          <p className="mt-6 text-xs text-white/55">
            © {year} DeBro. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

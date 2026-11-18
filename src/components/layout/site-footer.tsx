import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

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
              A modern investing experience for tokenized financial assets.
              Designed for clarity.
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
                  href="#waitlist"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Join the waitlist
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Status
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              DeBro is in active development. Investing and account features
              are not available yet.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Privacy Policy and Terms will be published before public signup
              opens.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/55">
            Digital assets involve significant risk, including the possible
            loss of your entire investment. Tokenized assets may not give you
            direct ownership of an underlying financial asset. Nothing on this
            website is investment advice or an offer to buy or sell any
            financial instrument. Availability is subject to eligibility and
            applicable law.
          </p>
          <p className="mt-6 text-xs text-white/55">
            © {year} DeBro. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

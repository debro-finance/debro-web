import { NAV_LINKS, WAITLIST_HREF } from "@/lib/site";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white">
      <Container className="relative flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#" aria-label="Scroll to top" className="cursor-pointer">
          <Logo preload className="h-[1.35rem] w-auto sm:h-6" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-strong transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WAITLIST_HREF}
            className="hidden h-10 items-center justify-center rounded bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-accent sm:inline-flex"
          >
            Join the waitlist
          </a>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </header>
  );
}

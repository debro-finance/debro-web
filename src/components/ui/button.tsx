import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-soft focus-visible:outline-accent",
  secondary:
    "border border-line-strong bg-white text-ink hover:border-navy/30 hover:bg-surface focus-visible:outline-accent",
  light:
    "bg-white text-navy hover:bg-accent-soft focus-visible:outline-white",
  "outline-light":
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem] sm:px-7",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...rest}
    >
      {children}
    </a>
  );
}

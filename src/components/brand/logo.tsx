import Image from "next/image";

export function Logo({
  variant = "navy",
  className = "h-6 w-auto sm:h-7",
  preload = false,
  ...props
}: {
  variant?: "navy" | "white";
  className?: string;
  preload?: boolean;
}) {
  const src = variant === "white" ? "/branding/debro-logo.svg" : "/branding/debro-logo-navy.svg";

  return (
    <Image
      src={src}
      alt=""
      width={2522}
      height={470}
      preload={preload}
      fetchPriority={preload ? "high" : "auto"}
      className={className}
      {...props}
    />
  );
}

export function BrandIcon({
  variant = "navy",
  className = "h-10 w-10",
}: {
  variant?: "navy" | "white";
  className?: string;
}) {
  const src = variant === "white" ? "/branding/debro-icon.svg" : "/branding/debro-icon-navy.svg";

  return <Image src={src} alt="" width={1024} height={1024} className={className} />;
}

import { useId } from "react";

/**
 * Símbolo provisório da Garra Studios: "G" geométrico angular, desenhado numa grade de 32×32.
 * Substituir pelo SVG oficial quando o símbolo for aprovado (ver README → Identidade visual).
 */
export const LOGO_G_PATH = "M23 8H12L7 13V19L12 24H20L24 20V16";
export const LOGO_BAR_PATH = "M24 16H17";

type MarkVariant = "color" | "mono" | "light";

type LogoMarkProps = {
  className?: string;
  variant?: MarkVariant;
  title?: string;
};

export function LogoMark({ className, variant = "color", title }: LogoMarkProps) {
  const gradientId = useId();
  const stroke =
    variant === "color" ? `url(#${gradientId})` : variant === "light" ? "#0B0F1A" : "currentColor";
  const barStroke = variant === "color" ? "#06B6D4" : variant === "light" ? "#2563FF" : "currentColor";

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {variant === "color" && (
        <defs>
          <linearGradient id={gradientId} x1="7" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B8BFF" />
            <stop offset="1" stopColor="#2563FF" />
          </linearGradient>
        </defs>
      )}
      <path d={LOGO_G_PATH} stroke={stroke} strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d={LOGO_BAR_PATH} stroke={barStroke} strokeWidth="3.2" strokeLinecap="square" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  variant?: MarkVariant;
};

/** Versão horizontal: símbolo + nome. O texto usa a fonte de títulos do site. */
export function Logo({ className, variant = "color" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark variant={variant} className="size-8 shrink-0" />
      <span className="font-display text-[1.05rem] leading-none tracking-tight">
        <span className="font-bold">Garra</span> <span className="font-medium opacity-80">Studios</span>
      </span>
    </span>
  );
}

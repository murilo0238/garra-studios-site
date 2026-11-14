import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`reveal flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl font-bold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-light">
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-brand to-brand-2" />
      {children}
    </span>
  );
}

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-fg shadow-[0_1px_0_0_rgb(255_255_255/0.18)_inset,0_8px_24px_-10px_rgb(37_99_255/0.8)] hover:bg-brand-strong hover:shadow-glow",
  secondary: "border border-line-strong bg-white/[0.03] text-fg hover:border-brand-light/50 hover:bg-white/[0.06]",
  ghost: "text-fg-soft hover:text-fg hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Link com aparência de botão (todos os CTAs do site são navegação real). */
export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

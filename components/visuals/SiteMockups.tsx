import type { ReactNode } from "react";

/**
 * Três mini-interfaces ilustrativas (institucional, landing page e loja).
 * São demonstrações conceituais — o selo deixa isso explícito ao visitante.
 */
export function SiteMockups({ disclaimer }: { disclaimer: string }) {
  return (
    <figure className="relative">
      <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-lg select-none">
        <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(6_182_212/0.16),transparent)] blur-2xl" />

        {/* Institucional (desktop) */}
        <MockWindow className="absolute left-0 top-0 w-[82%]" label="sua-marca.com.br">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-14 rounded bg-white/25" />
            <div className="h-5 w-12 rounded bg-brand/80" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-white/25" />
              <div className="h-3 w-2/3 rounded bg-white/25" />
              <div className="h-1.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-4/5 rounded bg-white/10" />
              <div className="mt-2 h-5 w-16 rounded bg-brand" />
            </div>
            <div className="rounded-lg bg-[linear-gradient(150deg,rgb(37_99_255/0.4),rgb(11_15_26/0.2))]" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-10 rounded-md border border-line bg-white/[0.03]" />
            ))}
          </div>
        </MockWindow>

        {/* Landing page (tablet) */}
        <MockWindow className="absolute bottom-[4%] right-[16%] w-[46%]" label="campanha">
          <div className="mx-auto h-2.5 w-3/4 rounded bg-white/25" />
          <div className="mx-auto mt-2 h-1.5 w-1/2 rounded bg-white/10" />
          <div className="mt-3 space-y-1.5 rounded-lg border border-line bg-white/[0.03] p-2">
            <div className="h-3 rounded bg-white/10" />
            <div className="h-3 rounded bg-white/10" />
            <div className="h-4 rounded bg-brand-2/70" />
          </div>
        </MockWindow>

        {/* Loja (celular) */}
        <div className="surface absolute bottom-0 right-0 w-[26%] rounded-[1.25rem] bg-bg-elevated p-2 shadow-2xl">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className="aspect-square rounded-md bg-[linear-gradient(140deg,rgb(37_99_255/0.35),rgb(6_182_212/0.15))]" />
                <div className="h-1 w-3/4 rounded bg-white/20" />
              </div>
            ))}
          </div>
          <div className="mt-2 h-4 rounded-md bg-brand" />
        </div>
      </div>

      <figcaption className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-xs text-muted">
        <span className="whitespace-nowrap rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-soft">
          Demonstração conceitual
        </span>
        {disclaimer}
      </figcaption>
    </figure>
  );
}

function MockWindow({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  return (
    <div className={`surface overflow-hidden rounded-xl bg-bg-elevated/95 shadow-2xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
        </div>
        <span className="truncate font-mono text-[9px] text-muted">{label}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

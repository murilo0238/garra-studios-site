/**
 * Composição decorativa do hero: janela de navegador com um site em construção
 * e um terminal estilizado. Tudo em HTML/CSS — sem imagens.
 */
export function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-xl select-none lg:max-w-none">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(37_99_255/0.28),transparent)] blur-2xl" />

      {/* Navegador */}
      <div className="surface overflow-hidden rounded-2xl bg-bg-elevated/90 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-line bg-white/[0.03] px-3 font-mono text-[11px] text-muted">
            <span className="size-1.5 rounded-full bg-brand-2" />
            seunegocio.com.br
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-white/20" />
            <div className="hidden gap-3 sm:flex">
              <div className="h-2 w-10 rounded bg-white/10" />
              <div className="h-2 w-10 rounded bg-white/10" />
              <div className="h-2 w-10 rounded bg-white/10" />
            </div>
            <div className="h-6 w-16 rounded-md bg-brand/80" />
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 space-y-3 pt-2">
              <div className="h-4 w-full rounded bg-white/25" />
              <div className="h-4 w-4/5 rounded bg-white/25" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-20 rounded-md bg-brand" />
                <div className="h-7 w-16 rounded-md border border-line-strong" />
              </div>
            </div>
            <div className="col-span-2 rounded-xl border border-line bg-[linear-gradient(140deg,rgb(37_99_255/0.35),rgb(6_182_212/0.12))]" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-lg border border-line bg-white/[0.02] p-3">
                <div className="size-5 rounded-md bg-brand-2/30" />
                <div className="h-2 w-4/5 rounded bg-white/15" />
                <div className="h-1.5 w-full rounded bg-white/[0.07]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="surface absolute -bottom-10 -left-4 w-[78%] max-w-sm rounded-xl bg-[#080b14]/95 p-4 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur sm:-left-10 sm:text-xs">
        <div className="mb-2 flex items-center justify-between text-muted">
          <span>~/projeto</span>
          <span className="rounded border border-line px-1.5 text-[10px]">zsh</span>
        </div>
        <p>
          <span className="text-brand-2">$</span> <span className="text-fg">npm run build</span>
        </p>
        <p className="text-muted">
          <span className="text-brand-light">›</span> layout responsivo <Dots /> <span className="text-brand-2">ok</span>
        </p>
        <p className="text-muted">
          <span className="text-brand-light">›</span> SEO técnico <Dots /> <span className="text-brand-2">ok</span>
        </p>
        <p className="text-muted">
          <span className="text-brand-light">›</span> integração WhatsApp <Dots /> <span className="text-brand-2">ok</span>
        </p>
        <p className="mt-1">
          <span className="text-brand-2">$</span> <span className="text-fg">deploy --prod</span>
          <span className="blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-fg/80" />
        </p>
      </div>

      {/* Selo flutuante */}
      <div className="surface absolute -right-2 -top-5 hidden items-center gap-2 rounded-full bg-bg-elevated/95 px-3 py-1.5 text-xs text-fg-soft backdrop-blur sm:flex">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-2/60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-brand-2" />
        </span>
        Em desenvolvimento
      </div>
    </div>
  );
}

function Dots() {
  return <span className="text-white/15">··········</span>;
}

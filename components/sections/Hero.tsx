import { ArrowRight, Check, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_255/0.22),rgb(6_182_212/0.06)_60%,transparent)]"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="hero-enter flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-wide text-fg-soft sm:text-xs">
            <span className="size-1.5 rounded-full bg-brand-2" aria-hidden />
            {hero.eyebrow}
          </span>

          <h1
            id="hero-title"
            className="text-[2.15rem] font-bold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          >
            <span className="text-gradient">{hero.title}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero.subtitle}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              <Wrench aria-hidden className="size-4 text-brand-2" />
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm text-fg-soft">
            {hero.highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-brand-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-enter [animation-delay:120ms] pb-8 lg:pb-0">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

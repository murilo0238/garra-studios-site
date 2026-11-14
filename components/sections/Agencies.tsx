import { ArrowRight, Check, Handshake } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agenciesSection } from "@/content/site";

export function Agencies() {
  return (
    <section id="agencias" aria-labelledby="agencias-title" className="relative py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-brand/25 bg-[linear-gradient(135deg,rgb(37_99_255/0.14),rgb(11_15_26/0.4)_45%,rgb(6_182_212/0.08))] px-6 py-14 sm:px-10 md:px-14 md:py-16">
          <Handshake
            aria-hidden
            strokeWidth={1}
            className="pointer-events-none absolute -bottom-10 -right-6 size-64 text-brand/10 md:size-80"
          />
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-8">
              <SectionHeading
                id="agencias-title"
                eyebrow={agenciesSection.eyebrow}
                title={agenciesSection.title}
                subtitle={agenciesSection.text}
              />
              <div>
                <ButtonLink href={agenciesSection.cta.href} size="lg">
                  {agenciesSection.cta.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            </div>

            <ul className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {agenciesSection.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-line bg-bg/50 px-4 py-3.5 text-sm text-fg-soft backdrop-blur"
                >
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

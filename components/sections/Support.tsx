import { ArrowRight, CircleAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { supportSection } from "@/content/site";

export function Support() {
  return (
    <section id="suporte" aria-labelledby="suporte-title" className="relative py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="suporte-title"
            eyebrow={supportSection.eyebrow}
            title={supportSection.title}
            subtitle={supportSection.text}
          />
          <p className="reveal max-w-xl border-l-2 border-brand-2/60 pl-4 text-sm leading-relaxed text-fg-soft">
            {supportSection.note}
          </p>
          <div>
            <ButtonLink href={supportSection.cta.href} size="lg">
              {supportSection.cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>

        <div className="reveal surface overflow-hidden rounded-2xl bg-[#080b14]/80">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs text-muted">
            <span>tipos-de-demanda.txt</span>
            <span className="inline-flex items-center gap-1.5 text-brand-2">
              <span className="size-1.5 rounded-full bg-brand-2" aria-hidden />
              disponível para demandas pontuais
            </span>
          </div>
          <h3 className="sr-only">Exemplos de demandas</h3>
          <ul className="grid sm:grid-cols-2">
            {supportSection.issues.map((issue, index) => (
              <li
                key={issue}
                className="flex items-center gap-3 border-b border-line px-5 py-4 text-sm text-fg-soft transition-colors hover:bg-white/[0.03] sm:[&:nth-child(odd)]:border-r"
              >
                <span aria-hidden className="font-mono text-[11px] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CircleAlert aria-hidden className="size-4 shrink-0 text-brand-light" strokeWidth={1.75} />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSection } from "@/content/site";

export function Process() {
  return (
    <section id="como-trabalhamos" aria-labelledby="processo-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="processo-title"
          eyebrow="Como trabalhamos"
          title={processSection.title}
          subtitle={processSection.subtitle}
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden
            className="absolute left-[1.375rem] top-0 h-full w-px bg-gradient-to-b from-brand via-brand-2/60 to-transparent md:left-0 md:top-[1.375rem] md:h-px md:w-full md:bg-gradient-to-r"
          />
          {processSection.steps.map((step) => (
            <li key={step.number} className="reveal relative flex gap-5 md:flex-col md:gap-6">
              <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/50 bg-bg font-mono text-sm font-semibold text-brand-light shadow-[0_0_0_6px_var(--color-bg)]">
                {step.number}
              </span>
              <div className="pt-1.5 md:pt-0 md:pr-4">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

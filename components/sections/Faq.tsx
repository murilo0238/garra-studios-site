import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqSection } from "@/content/site";

/** Accordion com <details>/<summary>: teclado, leitores de tela e funcionamento sem JS são nativos. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title={faqSection.title}
          subtitle="Não encontrou sua dúvida? Fale com a gente pelo formulário de contato."
        />

        <div className="reveal surface divide-y divide-line rounded-[var(--radius-card)]">
          {faqSection.items.map((item, index) => (
            <details key={item.question} name="faq" className="faq-item group" open={index === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-[var(--radius-card)] px-6 py-5 text-left transition-colors hover:text-brand-light">
                <h3 className="text-base font-semibold">{item.question}</h3>
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-soft transition-colors group-open:border-brand/50 group-open:text-brand-light">
                  <Plus aria-hidden className="faq-icon size-4 transition-transform duration-300" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

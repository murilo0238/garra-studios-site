import Image from "next/image";
import { CircleAlert, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactSection, founder } from "@/content/site";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, formatBrazilianPhone, quickMessages } from "@/lib/whatsapp";

export function Contact() {
  const whatsapp = siteConfig.whatsappNumber;

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgb(37_99_255/0.16),transparent)]"
      />
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading id="contato-title" eyebrow="Contato" title={contactSection.title} subtitle={contactSection.subtitle} />

          <ol className="reveal flex flex-col gap-4">
            {contactSection.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4 text-sm text-fg-soft">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-brand-light">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>

          {whatsapp && (
            <a
              href={buildWhatsAppLink(whatsapp, quickMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group inline-flex w-fit items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-4 py-3 transition-colors hover:border-brand-2/40"
            >
              <span className="relative shrink-0">
                <Image
                  src={founder.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover ring-2 ring-line-strong"
                />
                <span className="absolute -bottom-0.5 -right-0.5 inline-flex size-5 items-center justify-center rounded-full bg-brand-2 text-bg ring-2 ring-bg">
                  <MessageCircle aria-hidden className="size-3" strokeWidth={2.5} />
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-muted">Fale direto com o {founder.name} no WhatsApp</span>
                <span className="text-sm font-medium text-fg">
                  {formatBrazilianPhone(whatsapp)}
                  <span className="sr-only"> (abre em nova aba)</span>
                </span>
              </span>
            </a>
          )}
        </div>

        <div className="reveal surface rounded-[1.75rem] bg-bg-elevated/80 p-6 backdrop-blur sm:p-8">
          {whatsapp ? (
            <ContactForm whatsappNumber={whatsapp} />
          ) : (
            <div role="status" className="flex h-full flex-col items-start justify-center gap-4 py-10">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand-light">
                <CircleAlert aria-hidden className="size-5" />
              </span>
              <h3 className="text-xl font-semibold">Canal de contato em configuração</h3>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                O atendimento por WhatsApp está sendo configurado e estará disponível em breve. Enquanto isso, o
                formulário fica desativado para que nenhuma mensagem se perca.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

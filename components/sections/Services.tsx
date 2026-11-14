import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHref, services, servicesSection } from "@/content/site";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading id="servicos-title" eyebrow="Serviços" title={servicesSection.title} subtitle={servicesSection.subtitle} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ slug, title, description, icon: Icon, featured }) => (
            <li key={slug} className="reveal">
              <article className="card-glow surface group flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-surface/50">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-light transition-colors group-hover:border-brand/60 group-hover:bg-brand/20">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  {featured && (
                    <span className="rounded-full border border-brand-2/30 bg-brand-2/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-2">
                      Destaque
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-[1.05rem] font-semibold leading-snug">{title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{description}</p>
                <Link
                  href={contactHref(slug)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-colors hover:text-fg after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
                >
                  Solicitar orçamento
                  <span className="sr-only">: {title}</span>
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

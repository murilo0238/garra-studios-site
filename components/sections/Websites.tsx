import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteMockups } from "@/components/visuals/SiteMockups";
import { websitesSection } from "@/content/site";

export function Websites() {
  return (
    <section id="criacao-de-sites" aria-labelledby="sites-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(180deg,transparent,rgb(37_99_255/0.05)_40%,transparent)]" />
      <Container>
        <div className="surface relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 md:px-14 md:py-20">
          <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-60" />
          <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-brand/20 blur-3xl" />

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="flex flex-col gap-10">
              <SectionHeading
                id="sites-title"
                eyebrow={websitesSection.eyebrow}
                title={websitesSection.title}
                subtitle={websitesSection.text}
              />

              <ul className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                {websitesSection.features.map(({ title, description, icon: Icon }) => (
                  <li key={title} className="reveal flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/10 text-brand-light ring-1 ring-brand/30">
                      <Icon aria-hidden className="size-[1.15rem]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div>
                <ButtonLink href={websitesSection.cta.href} size="lg">
                  {websitesSection.cta.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            </div>

            <SiteMockups disclaimer={websitesSection.disclaimer} />
          </div>
        </div>
      </Container>
    </section>
  );
}

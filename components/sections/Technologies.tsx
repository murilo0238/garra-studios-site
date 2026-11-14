import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/icons/TechIcons";
import { technologiesSection } from "@/content/site";

export function Technologies() {
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="tecnologias-title"
          eyebrow="Stack"
          title={technologiesSection.title}
          subtitle={technologiesSection.subtitle}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.8fr_1fr]">
          {technologiesSection.groups.map((group) => (
            <div key={group.name} className="reveal surface rounded-[var(--radius-card)] p-5">
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">{group.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech.id}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2.5 text-sm text-fg-soft transition-colors hover:border-brand/40 hover:text-fg"
                  >
                    <TechIcon
                      id={tech.id}
                      className="size-[1.1rem] shrink-0 text-muted transition-colors group-hover:text-brand-light"
                    />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

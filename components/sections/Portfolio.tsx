import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioProjects, portfolioSection, type PortfolioProject } from "@/content/site";

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="portfolio-title"
          eyebrow={portfolioSection.eyebrow}
          title={portfolioSection.title}
          subtitle={portfolioSection.subtitle}
        />
        <ul className="mt-14 flex flex-col gap-8">
          {portfolioProjects.map((project) => (
            <li key={project.slug} className="reveal">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const host = project.url.replace(/^https?:\/\//, "");

  return (
    <article className="card-glow surface group grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.25fr_1fr]">
      {/* Prévia: navegador + celular */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(37_99_255/0.22),transparent_65%)] px-5 pb-10 pt-8 sm:px-10 sm:pt-10">
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-50" aria-hidden />
        <div className="overflow-hidden rounded-xl border border-line-strong bg-bg-elevated shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <span className="flex gap-1" aria-hidden>
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="truncate font-mono text-[11px] text-muted">{host}</span>
          </div>
          <Image
            src={project.images.desktop}
            alt={project.images.alt}
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 640px, 92vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
        <div className="absolute bottom-4 right-4 w-[26%] max-w-[150px] overflow-hidden rounded-[1.1rem] border-[3px] border-[#1a2233] bg-bg-elevated shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 sm:bottom-6 sm:right-8">
          <Image
            src={project.images.mobile}
            alt=""
            width={360}
            height={613}
            sizes="150px"
            className="aspect-[9/16] w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-6 border-t border-line p-6 sm:p-10 lg:border-l lg:border-t-0">
        <div className="flex flex-wrap items-center gap-2">
          {project.kind === "conceito" && (
            <span className="rounded-full border border-brand-2/40 bg-brand-2/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-2">
              Projeto conceito
            </span>
          )}
          <span className="text-xs text-muted">{project.segment}</span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold sm:text-3xl">{project.name}</h3>
          <p className="text-sm leading-relaxed text-fg-soft sm:text-base">{project.description}</p>
        </div>

        <ul className="flex flex-col gap-2.5">
          {project.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-fg-soft">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-2" />
              {item}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-brand px-6 text-[0.95rem] font-medium text-fg shadow-[0_8px_24px_-10px_rgb(37_99_255/0.8)] transition-colors hover:bg-brand-strong"
          >
            Ver site ao vivo
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          {project.kind === "conceito" && (
            <p className="text-xs leading-relaxed text-muted">
              Marca fictícia criada pela Garra Studios para demonstrar design e desenvolvimento. Não é um projeto de
              cliente.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

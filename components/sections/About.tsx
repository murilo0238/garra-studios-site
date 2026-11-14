import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/brand/Logo";
import { GitHubIcon } from "@/components/icons/TechIcons";
import { aboutSection, founder } from "@/content/site";
import { siteConfig } from "@/lib/config";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <figure className="reveal relative mx-auto w-full max-w-sm pb-8 lg:order-last">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_20%,rgb(37_99_255/0.3),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(6_182_212/0.18),transparent_55%)] blur-2xl"
          />
          <div className="surface rounded-[2rem] p-2">
            <Image
              src={founder.photo}
              alt={founder.alt}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="aspect-square w-full rounded-[1.6rem] object-cover"
            />
          </div>
          <figcaption className="surface absolute inset-x-5 bottom-0 flex items-center gap-3 rounded-2xl bg-bg-elevated/95 px-4 py-3 backdrop-blur">
            <LogoMark className="size-8 shrink-0" />
            <span className="flex flex-col">
              <span className="font-display text-sm font-semibold">{founder.name}</span>
              <span className="text-xs text-muted">{founder.role}</span>
            </span>
          </figcaption>
        </figure>

        <div className="flex flex-col gap-6">
          <div className="reveal flex flex-col items-start gap-4">
            <Eyebrow>Sobre a Garra Studios</Eyebrow>
            <h2 id="sobre-title" className="text-3xl font-bold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
              {aboutSection.title}
            </h2>
          </div>
          {aboutSection.paragraphs.map((paragraph) => (
            <p key={paragraph} className="reveal text-base leading-relaxed text-fg-soft sm:text-lg">
              {paragraph}
            </p>
          ))}
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {aboutSection.principles.map((item) => (
              <li key={item.title} className="reveal border-t border-line-strong pt-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-fg-soft transition-colors hover:border-brand hover:text-fg"
          >
            <GitHubIcon className="size-4 text-brand-2" />
            {aboutSection.githubCta}
            <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

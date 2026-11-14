import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { GitHubIcon } from "@/components/icons/TechIcons";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Container } from "@/components/ui/Container";
import { footerServiceLinks, navItems } from "@/content/site";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, formatBrazilianPhone, quickMessages } from "@/lib/whatsapp";

export function Footer() {
  const whatsapp = siteConfig.whatsappNumber;

  return (
    <footer className="relative border-t border-line bg-bg-elevated/60">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted">{siteConfig.shortDescription}</p>
        </div>

        <FooterColumn title="Navegação">
          {navItems.map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Serviços">
          {footerServiceLinks.map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato">
          {whatsapp ? (
            <li>
              <a
                href={buildWhatsAppLink(whatsapp, quickMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-fg-soft transition-colors hover:text-fg"
              >
                <MessageCircle aria-hidden className="size-4 text-brand-2" />
                WhatsApp {formatBrazilianPhone(whatsapp)}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ) : null}
          <li>
            <FooterLink href="/#contato">Formulário de orçamento</FooterLink>
          </li>
          <li>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-fg-soft transition-colors hover:text-fg"
            >
              <GitHubIcon className="size-4 text-brand-2" />
              GitHub
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a
              href={siteConfig.url}
              className="inline-flex items-center gap-1 text-sm text-fg-soft transition-colors hover:text-fg"
            >
              {siteConfig.domain}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.name}. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="transition-colors hover:text-fg">
            Política de privacidade
          </Link>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-sm font-semibold text-fg">{title}</h2>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm text-fg-soft transition-colors hover:text-fg">
      {children}
    </Link>
  );
}

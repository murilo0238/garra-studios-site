import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { contactHref, navItems } from "@/content/site";

export function Header() {
  return (
    <header className="header-scroll fixed inset-x-0 top-0 z-50 border-b">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/#inicio" aria-label="Garra Studios — página inicial" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-fg-soft transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={contactHref()} size="md">
              Solicitar orçamento
            </ButtonLink>
          </div>
          <MobileMenu items={navItems} />
        </div>
      </Container>
    </header>
  );
}

import type { Metadata } from "next";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contactHref } from "@/content/site";

// O Next.js já injeta <meta name="robots" content="noindex"> nas respostas 404.
export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nao-encontrada" className="relative flex min-h-[80dvh] items-center pt-28 pb-20">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <Container className="flex flex-col items-start gap-6">
        <span className="font-mono text-sm text-brand-light">Erro 404</span>
        <h1 id="nao-encontrada" className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Esta página não existe ou foi movida.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Confira o endereço digitado ou volte para a página inicial para conhecer os serviços da Garra Studios.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <ArrowLeft aria-hidden className="size-4" />
            Voltar para o início
          </ButtonLink>
          <ButtonLink href={contactHref()} size="lg" variant="secondary">
            <MessageCircle aria-hidden className="size-4 text-brand-2" />
            Falar com a Garra Studios
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

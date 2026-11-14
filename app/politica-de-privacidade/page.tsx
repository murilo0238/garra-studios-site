import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, formatBrazilianPhone } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como o site da Garra Studios trata dados pessoais: sem cookies, sem analytics e sem armazenamento dos dados do formulário.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: "/politica-de-privacidade",
    title: "Política de privacidade | Garra Studios",
    description: "Como o site da Garra Studios trata dados pessoais.",
  },
};

const UPDATED_AT = "10 de novembro de 2026";

export default function PrivacyPolicyPage() {
  const phone = siteConfig.whatsappNumber;
  const contact = phone ? (
    <a
      href={buildWhatsAppLink(phone, "Olá! Tenho uma solicitação sobre meus dados pessoais.")}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-light underline underline-offset-4 hover:text-fg"
    >
      WhatsApp {formatBrazilianPhone(phone)}
    </a>
  ) : (
    <Link href="/#contato" className="font-medium text-brand-light underline underline-offset-4 hover:text-fg">
      canal de contato do site
    </Link>
  );

  return (
    <article className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <header className="flex flex-col gap-4 border-b border-line pb-10">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-brand-light">Privacidade</span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Política de privacidade</h1>
          <p className="text-sm text-muted">Última atualização: {UPDATED_AT}</p>
        </header>

        <div className="mt-10 flex flex-col gap-10 text-[0.98rem] leading-relaxed text-fg-soft">
          <Block title="1. Quem somos">
            <p>
              Este site ({siteConfig.domain}) pertence à {siteConfig.name}, marca de desenvolvimento de software liderada
              por {siteConfig.owner}, responsável pelo tratamento dos dados pessoais descritos nesta política, nos termos
              da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </Block>

          <Block title="2. Formulário de contato">
            <p>
              O formulário deste site <strong className="text-fg">não envia nem armazena seus dados em nossos servidores</strong>.
              As informações preenchidas (nome, e-mail, WhatsApp opcional, tipo de serviço e descrição) são usadas apenas
              no seu navegador para montar uma mensagem, que é aberta no WhatsApp. A mensagem só é enviada se você
              confirmar o envio dentro do WhatsApp.
            </p>
            <p>
              A partir desse momento, a conversa acontece no WhatsApp e está sujeita também à política de privacidade do
              WhatsApp/Meta. Usamos os dados recebidos na conversa exclusivamente para responder à sua solicitação,
              elaborar propostas e prestar os serviços contratados (bases legais: procedimentos preliminares a contrato e
              execução de contrato, art. 7º, V, da LGPD).
            </p>
          </Block>

          <Block title="3. Cookies e ferramentas de análise">
            <p>
              Este site <strong className="text-fg">não utiliza cookies</strong>, pixels de rastreamento nem ferramentas de
              analytics. Se isso mudar, esta política será atualizada antes da alteração entrar em vigor.
            </p>
          </Block>

          <Block title="4. Registros técnicos do servidor">
            <p>
              Como qualquer site, o servidor que hospeda esta página registra automaticamente dados técnicos de acesso —
              como endereço IP, data e hora, página solicitada e navegador utilizado — para garantir a segurança, prevenir
              abusos e diagnosticar falhas (legítimo interesse, art. 7º, IX, da LGPD). Esses registros não são usados para
              identificar visitantes nem compartilhados com terceiros, exceto quando exigido por lei.
            </p>
          </Block>

          <Block title="5. Compartilhamento">
            <p>
              Não vendemos nem compartilhamos dados pessoais com terceiros para fins comerciais. Fornecedores de
              infraestrutura (hospedagem e DNS) podem processar dados técnicos de conexão apenas para entregar o site.
            </p>
          </Block>

          <Block title="6. Seus direitos">
            <p>
              Você pode solicitar, a qualquer momento, confirmação da existência de tratamento, acesso, correção,
              anonimização, portabilidade ou eliminação dos seus dados, além de informações sobre compartilhamento e a
              revogação de consentimento (art. 18 da LGPD). Para isso, entre em contato pelo {contact}.
            </p>
          </Block>

          <Block title="7. Alterações">
            <p>
              Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última
              atualização fica sempre indicada no topo desta página.
            </p>
          </Block>
        </div>
      </Container>
    </article>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-fg">{title}</h2>
      {children}
    </section>
  );
}

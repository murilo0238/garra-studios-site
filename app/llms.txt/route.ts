import {
  contactHref,
  faqSection,
  portfolioProjects,
  services,
  supportSection,
  technologiesSection,
} from "@/content/site";
import { siteConfig } from "@/lib/config";
import { formatBrazilianPhone } from "@/lib/whatsapp";

export const dynamic = "force-static";

/**
 * llms.txt (convenção proposta em llmstxt.org): resumo em Markdown para ferramentas de IA.
 * Gerado a partir de content/site.ts para não divergir do site. Não é fator de ranqueamento.
 */
export function GET() {
  const url = siteConfig.url;
  const phone = siteConfig.whatsappNumber;
  const techs = technologiesSection.groups
    .map((group) => `- ${group.name}: ${group.items.map((item) => item.name).join(", ")}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.name} é uma marca brasileira de desenvolvimento de software liderada por ${siteConfig.owner}, desenvolvedor Full Stack. Cria sites profissionais, landing pages, lojas virtuais, sistemas web, automações e integrações, e presta suporte técnico, manutenção e serviços de infraestrutura. Atende empresas, profissionais autônomos e agências (inclusive em modelo white-label).

Os valores e prazos são definidos por orçamento personalizado, após análise do escopo de cada projeto; o site não publica preços fixos.

## Serviços

${services.map((service) => `- [${service.title}](${url}${contactHref(service.slug)}): ${service.description}`).join("\n")}

## Portfólio

${portfolioProjects
  .map(
    (project) =>
      `- [${project.name}](${project.url}) (${project.segment}${project.kind === "conceito" ? ", projeto conceito com marca fictícia" : ""}): ${project.description}`,
  )
  .join("\n")}

## Exemplos de suporte técnico

${supportSection.issues.map((issue) => `- ${issue}`).join("\n")}

## Tecnologias

${techs}

## Como contratar

1. Descreva o projeto no formulário em ${url}/#contato; ao enviar, o WhatsApp abre com a mensagem pronta.
2. A demanda é analisada e são definidos escopo, solução, prazo e investimento.
3. Desenvolvimento, testes e entrega conforme o escopo acordado.
${phone ? `\nWhatsApp: ${formatBrazilianPhone(phone)} (https://wa.me/${phone})\n` : ""}
## Perguntas frequentes

${faqSection.items.map((item) => `- **${item.question}** ${item.answer}`).join("\n")}

## Links

- [Página inicial](${url}/)
- [Contato e orçamento](${url}/#contato)
- [Política de privacidade](${url}/politica-de-privacidade)
- [Sitemap](${url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

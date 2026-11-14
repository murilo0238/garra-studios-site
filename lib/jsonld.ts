import { founder, services, technologiesSection } from "@/content/site";
import { siteConfig } from "@/lib/config";

/**
 * Dados estruturados Schema.org — apenas informações reais e confirmadas.
 * Sem endereço, avaliações ou perfis sociais (não existem dados confirmados para isso).
 */
export function buildJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const phone = siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : undefined;
  const mainServices = services.filter((service) =>
    ["site", "landing-page", "sistema-web", "automacao", "correcao-bugs", "parceria-agencia"].includes(service.slug),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/garra-symbol-dark.svg`,
        description: siteConfig.description,
        founder: {
          "@type": "Person",
          name: siteConfig.owner,
          jobTitle: "Desenvolvedor Full Stack",
          image: `${siteConfig.url}${founder.photo}`,
        },
        areaServed: { "@type": "Country", name: "Brasil" },
        knowsAbout: technologiesSection.groups.flatMap((group) => group.items.map((item) => item.name)),
        ...(phone && {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: phone,
            contactType: "sales",
            availableLanguage: ["pt-BR"],
            areaServed: "BR",
          },
        }),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: siteConfig.language,
        publisher: { "@id": orgId },
      },
      ...mainServices.map((service) => ({
        "@type": "Service",
        "@id": `${siteConfig.url}/#servico-${service.slug}`,
        name: service.title,
        description: service.description,
        provider: { "@id": orgId },
        areaServed: { "@type": "Country", name: "Brasil" },
      })),
    ],
  };
}

/** Serializa para <script type="application/ld+json"> escapando "<" (evita fechar a tag). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

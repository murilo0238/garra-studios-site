import { normalizeWhatsAppNumber } from "./whatsapp";

/**
 * Configuração central do site. Dados comerciais aqui devem ser reais e confirmados.
 * O número de WhatsApp vem de variável de ambiente (pública, embutida no build).
 */
export const siteConfig = {
  name: "Garra Studios",
  url: "https://garrastudios.online",
  domain: "garrastudios.online",
  owner: "Murilo",
  locale: "pt_BR",
  language: "pt-BR",
  title: "Garra Studios — Criação de sites, sistemas e soluções digitais",
  description:
    "Criação de sites profissionais, landing pages, lojas virtuais, sistemas web, automações, correção de bugs e infraestrutura. Desenvolvimento sob medida e parcerias white-label para agências.",
  shortDescription:
    "Marca de desenvolvimento liderada por Murilo: sites, sistemas, integrações e suporte técnico sob medida.",
  /** Data da última alteração relevante de conteúdo (usada no sitemap). Atualize ao mudar textos. */
  contentUpdatedAt: "2026-11-11",
  whatsappNumber: normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
  },
} as const;

export const isWhatsAppConfigured = siteConfig.whatsappNumber !== null;

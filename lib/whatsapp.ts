/**
 * Utilitários puros para o fluxo de contato via WhatsApp (wa.me).
 * Sem dependências de React/Next para poderem ser testados isoladamente.
 */

/** Mantém só dígitos (formato wa.me: DDI + DDD + número). Retorna null se ausente ou com tamanho implausível. */
export function normalizeWhatsAppNumber(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

/** Formata um número brasileiro (com DDI 55) para exibição: (61) 99226-2196. */
export function formatBrazilianPhone(digits: string): string {
  const local = digits.startsWith("55") && digits.length >= 12 ? digits.slice(2) : digits;
  const ddd = local.slice(0, 2);
  const rest = local.slice(2);
  if (rest.length === 9) return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  if (rest.length === 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `+${digits}`;
}

export function buildWhatsAppLink(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string;
  serviceLabel: string;
  description: string;
  isPartnership?: boolean;
};

export function buildContactMessage(input: ContactMessageInput): string {
  const heading = input.isPartnership
    ? "Olá, Garra Studios! Gostaria de propor uma parceria."
    : "Olá, Garra Studios! Gostaria de solicitar um orçamento.";

  const lines = [
    heading,
    "",
    `*Nome:* ${input.name.trim()}`,
    `*E-mail:* ${input.email.trim()}`,
  ];
  if (input.phone && input.phone.trim()) lines.push(`*WhatsApp:* ${input.phone.trim()}`);
  lines.push(`*Serviço:* ${input.serviceLabel}`, "", "*Descrição:*", input.description.trim());
  return lines.join("\n");
}

export const quickMessages = {
  general: "Olá, Garra Studios! Vim pelo site e gostaria de conversar sobre um projeto.",
} as const;

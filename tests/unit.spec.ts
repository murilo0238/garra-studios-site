import { expect, test } from "@playwright/test";
import { serviceSlugs } from "../content/site";
import { isValidBrazilianPhone, validateContactForm } from "../lib/validation";
import {
  buildContactMessage,
  buildWhatsAppLink,
  formatBrazilianPhone,
  normalizeWhatsAppNumber,
} from "../lib/whatsapp";
import { isMobile } from "./helpers";

test.beforeEach(({}, testInfo) => test.skip(isMobile(testInfo), "Funções puras: basta um projeto."));

test.describe("lib/whatsapp", () => {
  test("normaliza o número e rejeita valores ausentes ou inválidos", () => {
    expect(normalizeWhatsAppNumber("+55 (61) 99226-2196")).toBe("5561992262196");
    expect(normalizeWhatsAppNumber("")).toBeNull();
    expect(normalizeWhatsAppNumber(undefined)).toBeNull();
    expect(normalizeWhatsAppNumber("desativado")).toBeNull();
    expect(normalizeWhatsAppNumber("123")).toBeNull();
  });

  test("formata telefone brasileiro para exibição", () => {
    expect(formatBrazilianPhone("5561992262196")).toBe("(61) 99226-2196");
    expect(formatBrazilianPhone("556132261234")).toBe("(61) 3226-1234");
  });

  test("monta link wa.me com mensagem codificada", () => {
    const link = buildWhatsAppLink("5561992262196", "Olá & tchau");
    expect(link).toBe("https://wa.me/5561992262196?text=Ol%C3%A1%20%26%20tchau");
    expect(buildWhatsAppLink("5561992262196")).toBe("https://wa.me/5561992262196");
  });

  test("mensagem de orçamento e de parceria", () => {
    const base = {
      name: " Ana ",
      email: "ana@empresa.com",
      phone: "",
      serviceLabel: "Landing page",
      description: "Preciso de uma landing page para campanha.",
    };
    const quote = buildContactMessage(base);
    expect(quote).toContain("solicitar um orçamento");
    expect(quote).toContain("*Nome:* Ana");
    expect(quote).not.toContain("*WhatsApp:*");
    const partnership = buildContactMessage({ ...base, phone: "(11) 91234-5678", isPartnership: true });
    expect(partnership).toContain("propor uma parceria");
    expect(partnership).toContain("*WhatsApp:* (11) 91234-5678");
  });
});

test.describe("lib/validation", () => {
  const valid = {
    name: "Ana Souza",
    email: "ana@empresa.com",
    phone: "",
    service: "site",
    description: "Quero um site institucional com cinco páginas.",
  };

  test("aceita um formulário válido", () => {
    expect(validateContactForm(valid, serviceSlugs)).toEqual({});
  });

  test("aponta campos obrigatórios e formatos inválidos", () => {
    const errors = validateContactForm(
      { name: "", email: "ana@", phone: "123", service: "inexistente", description: "curto" },
      serviceSlugs,
    );
    expect(Object.keys(errors).sort()).toEqual(["description", "email", "name", "phone", "service"]);
  });

  test("telefone opcional aceita máscara, DDD e +55", () => {
    expect(isValidBrazilianPhone("(61) 99226-2196")).toBe(true);
    expect(isValidBrazilianPhone("+55 61 99226-2196")).toBe(true);
    expect(isValidBrazilianPhone("6132261234")).toBe(true);
    expect(isValidBrazilianPhone("99226-2196")).toBe(false);
  });
});

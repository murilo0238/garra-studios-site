/** Validação do formulário de contato (funções puras, sem dependências). */

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
};

export type ContactField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactField, string>>;

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 1500;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Telefone opcional: aceita máscara e +55; exige DDD + 8 ou 9 dígitos. */
export function isValidBrazilianPhone(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  return digits.length === 10 || digits.length === 11;
}

export function validateField(
  field: ContactField,
  values: ContactFormValues,
  allowedServices: readonly string[],
): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case "name":
      if (!value) return "Informe seu nome.";
      if (value.length < 2) return "O nome precisa ter pelo menos 2 caracteres.";
      if (value.length > 100) return "O nome pode ter no máximo 100 caracteres.";
      return undefined;
    case "email":
      if (!value) return "Informe seu e-mail.";
      if (!EMAIL_PATTERN.test(value) || value.length > 254) return "Informe um e-mail válido, como nome@empresa.com.";
      return undefined;
    case "phone":
      if (!value) return undefined;
      if (!isValidBrazilianPhone(value)) return "Informe o WhatsApp com DDD, como (11) 91234-5678, ou deixe em branco.";
      return undefined;
    case "service":
      if (!value) return "Selecione o tipo de serviço.";
      if (!allowedServices.includes(value)) return "Selecione uma opção da lista.";
      return undefined;
    case "description":
      if (!value) return "Descreva brevemente o que você precisa.";
      if (value.length < DESCRIPTION_MIN)
        return `Conte um pouco mais (mínimo de ${DESCRIPTION_MIN} caracteres).`;
      if (value.length > DESCRIPTION_MAX) return `A descrição pode ter no máximo ${DESCRIPTION_MAX} caracteres.`;
      return undefined;
  }
}

export const CONTACT_FIELDS: readonly ContactField[] = ["name", "email", "phone", "service", "description"];

export function validateContactForm(
  values: ContactFormValues,
  allowedServices: readonly string[],
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values, allowedServices);
    if (error) errors[field] = error;
  }
  return errors;
}

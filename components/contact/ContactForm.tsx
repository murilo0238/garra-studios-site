"use client";

import { Suspense, useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CircleAlert, CircleCheck, Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { contactSection, isServiceSlug, serviceLabel, serviceOptions, serviceSlugs } from "@/content/site";
import {
  CONTACT_FIELDS,
  DESCRIPTION_MAX,
  validateContactForm,
  validateField,
  type ContactField,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/validation";
import { buildContactMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const EMPTY: ContactFormValues = { name: "", email: "", phone: "", service: "", description: "" };

/** Lê ?servico= da URL e pré-seleciona o tipo de serviço. Isolado para manter o resto da página estático. */
function ServiceFromUrl({ onService }: { onService: (slug: string) => void }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("servico");
  useEffect(() => {
    if (isServiceSlug(slug)) onService(slug);
  }, [slug, onService]);
  return null;
}

export function ContactForm({ whatsappNumber }: { whatsappNumber: string }) {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [sentLink, setSentLink] = useState<string | null>(null);
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({});

  const applyService = useCallback((slug: string) => {
    setValues((current) => ({ ...current, service: slug }));
    setErrors((current) => ({ ...current, service: undefined }));
  }, []);

  const isPartnership = values.service === "parceria-agencia";
  const ids = (field: ContactField) => ({ input: `${formId}-${field}`, error: `${formId}-${field}-erro` });

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setSentLink(null);
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, next, serviceSlugs) }));
  };

  const blur = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values, serviceSlugs) }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values, serviceSlugs);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(CONTACT_FIELDS.map((field) => [field, true])));

    const firstInvalid = CONTACT_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const message = buildContactMessage({
      name: values.name,
      email: values.email,
      phone: values.phone,
      serviceLabel: serviceLabel(values.service),
      description: values.description,
      isPartnership,
    });
    const link = buildWhatsAppLink(whatsappNumber, message);
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={submit} aria-describedby={`${formId}-ajuda`} className="flex flex-col gap-5">
      <Suspense fallback={null}>
        <ServiceFromUrl onService={applyService} />
      </Suspense>

      <p id={`${formId}-ajuda`} className="text-xs text-muted">
        Campos marcados com <span className="text-brand-2">*</span> são obrigatórios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" required error={errors.name} ids={ids("name")}>
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            id={ids("name").input}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? ids("name").error : undefined}
            aria-required
            className={inputClass(!!errors.name)}
            placeholder="Seu nome"
          />
        </Field>

        <Field label="E-mail" required error={errors.email} ids={ids("email")}>
          <input
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            id={ids("email").input}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? ids("email").error : undefined}
            aria-required
            className={inputClass(!!errors.email)}
            placeholder="nome@empresa.com"
          />
        </Field>

        <Field label="WhatsApp" hint="opcional" error={errors.phone} ids={ids("phone")}>
          <input
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            id={ids("phone").input}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? ids("phone").error : undefined}
            className={inputClass(!!errors.phone)}
            placeholder="(11) 91234-5678"
          />
        </Field>

        <Field label="Tipo de serviço" required error={errors.service} ids={ids("service")}>
          <select
            ref={(el) => {
              fieldRefs.current.service = el;
            }}
            id={ids("service").input}
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            onBlur={() => blur("service")}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? ids("service").error : undefined}
            aria-required
            className={`${inputClass(!!errors.service)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%2394A3B8'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${values.service ? "" : "text-muted"}`}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {serviceOptions.map((option) => (
              <option key={option.slug} value={option.slug} className="bg-bg-elevated text-fg">
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label={isPartnership ? "Sobre a parceria" : "Descrição do projeto"}
        required
        error={errors.description}
        ids={ids("description")}
        counter={`${values.description.length}/${DESCRIPTION_MAX}`}
      >
        <textarea
          ref={(el) => {
            fieldRefs.current.description = el;
          }}
          id={ids("description").input}
          name="description"
          rows={5}
          maxLength={DESCRIPTION_MAX}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          onBlur={() => blur("description")}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? ids("description").error : undefined}
          aria-required
          className={`${inputClass(!!errors.description)} min-h-36 resize-y py-3 leading-relaxed`}
          placeholder={isPartnership ? contactSection.placeholders.partnership : contactSection.placeholders.default}
        />
      </Field>

      <div aria-live="polite" className="empty:hidden">
        {errorCount > 0 && (
          <p className="flex items-center gap-2 text-sm text-[#fda4af]">
            <CircleAlert aria-hidden className="size-4 shrink-0" />
            {errorCount === 1 ? "Corrija o campo destacado para continuar." : `Corrija os ${errorCount} campos destacados para continuar.`}
          </p>
        )}
        {sentLink && errorCount === 0 && (
          <div className="flex items-start gap-3 rounded-xl border border-brand-2/30 bg-brand-2/10 p-4 text-sm text-fg-soft">
            <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-2" />
            <p>
              Abrimos o WhatsApp com sua mensagem pronta. Basta enviá-la por lá. Se a janela não abriu,{" "}
              <a href={sentLink} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-2 underline underline-offset-4">
                clique aqui para abrir o WhatsApp
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          <Send aria-hidden className="size-4" />
          {isPartnership ? "Enviar proposta pelo WhatsApp" : "Enviar pelo WhatsApp"}
          <ArrowUpRight aria-hidden className="size-4 opacity-70" />
        </button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-[16rem] sm:text-right">
          Seus dados não são armazenados neste site: a mensagem é montada no seu navegador e enviada por você no WhatsApp.
        </p>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `block h-12 w-full rounded-xl border bg-bg/60 px-4 text-[0.95rem] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] outline-none focus-visible:outline-none focus:border-brand-light focus:ring-4 focus:ring-brand/20 ${
    invalid ? "border-rose-400 bg-rose-500/[0.04]" : "border-line-strong hover:border-white/25"
  }`;
}

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  counter?: string;
  error?: string;
  ids: { input: string; error: string };
  children: ReactNode;
};

function Field({ label, required, hint, counter, error, ids, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={ids.input} className="text-sm font-medium text-fg-soft">
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-brand-2">
              *
            </span>
          )}
          {hint && <span className="ml-1.5 text-xs font-normal text-muted">({hint})</span>}
        </label>
        {counter && (
          <span aria-hidden className="font-mono text-[11px] text-muted">
            {counter}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p id={ids.error} className="flex items-center gap-1.5 text-[0.8rem] text-[#fda4af]">
          <CircleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

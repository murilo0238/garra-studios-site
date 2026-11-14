import { expect, test } from "@playwright/test";
import { captureWindowOpen, EXPECTED_WHATSAPP, openedUrls } from "./helpers";

test.beforeEach(async ({ page }) => {
  await captureWindowOpen(page);
});

test("mostra erros claros e foca o primeiro campo inválido", async ({ page }) => {
  await page.goto("/#contato");
  await page.getByRole("button", { name: /Enviar pelo WhatsApp/ }).click();

  const name = page.getByLabel("Nome");
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Informe seu e-mail.")).toBeVisible();
  await expect(page.getByText("Selecione o tipo de serviço.")).toBeVisible();
  await expect(page.getByText("Descreva brevemente o que você precisa.")).toBeVisible();
  await expect(page.getByText(/Corrija os 4 campos/)).toBeVisible();
  expect(await openedUrls(page)).toEqual([]);
});

test("valida formato de e-mail e WhatsApp", async ({ page }) => {
  await page.goto("/#contato");
  await page.getByLabel("E-mail").fill("ana@");
  await page.getByLabel("E-mail").blur();
  await expect(page.getByText(/Informe um e-mail válido/)).toBeVisible();

  await page.getByLabel("WhatsApp").fill("1234");
  await page.getByLabel("WhatsApp").blur();
  await expect(page.getByText(/Informe o WhatsApp com DDD/)).toBeVisible();

  await page.getByLabel("WhatsApp").fill("(11) 91234-5678");
  await expect(page.getByText(/Informe o WhatsApp com DDD/)).toBeHidden();
});

test("?servico= pré-seleciona o serviço e adapta o formulário de parceria", async ({ page }) => {
  await page.goto("/?servico=parceria-agencia#contato");
  await expect(page.getByLabel("Tipo de serviço")).toHaveValue("parceria-agencia");
  await expect(page.getByLabel("Sobre a parceria")).toBeVisible();
  await expect(page.getByRole("button", { name: /Enviar proposta pelo WhatsApp/ })).toBeVisible();
});

test("slug inválido é ignorado", async ({ page }) => {
  await page.goto("/?servico=qualquer-coisa#contato");
  await expect(page.getByLabel("Tipo de serviço")).toHaveValue("");
});

test("CTA da seção de agências pré-seleciona parceria via navegação interna", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Propor uma parceria" }).click();
  await expect(page).toHaveURL(/servico=parceria-agencia#contato$/);
  await expect(page.getByLabel("Tipo de serviço")).toHaveValue("parceria-agencia");
});

test("envio válido abre o WhatsApp com a mensagem formatada", async ({ page }) => {
  await page.goto("/?servico=landing-page#contato");
  await page.getByLabel("Nome").fill("Ana Souza");
  await page.getByLabel("E-mail").fill("ana@empresa.com");
  await page.getByLabel("WhatsApp").fill("(11) 91234-5678");
  await page.getByLabel("Descrição do projeto").fill("Preciso de uma landing page para uma campanha de lançamento.");
  await page.getByRole("button", { name: /Enviar pelo WhatsApp/ }).click();

  const urls = await openedUrls(page);
  expect(urls).toHaveLength(1);
  const url = new URL(urls[0]);
  expect(url.origin + url.pathname).toBe(`https://wa.me/${EXPECTED_WHATSAPP}`);
  const text = url.searchParams.get("text") ?? "";
  expect(text).toContain("solicitar um orçamento");
  expect(text).toContain("*Nome:* Ana Souza");
  expect(text).toContain("*E-mail:* ana@empresa.com");
  expect(text).toContain("*WhatsApp:* (11) 91234-5678");
  expect(text).toContain("*Serviço:* Landing page");
  expect(text).toContain("campanha de lançamento");

  const fallback = page.getByRole("link", { name: "clique aqui para abrir o WhatsApp" });
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveAttribute("href", urls[0]);
});

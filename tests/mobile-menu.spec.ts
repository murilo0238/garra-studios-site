import { expect, test } from "@playwright/test";
import { isMobile } from "./helpers";

test.beforeEach(({}, testInfo) => test.skip(!isMobile(testInfo), "Menu mobile só aparece em telas pequenas."));

test("abre, fecha com Esc e devolve o foco", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("botão fechar funciona", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("button", { name: "Fechar menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
});

test("link do menu navega e fecha o menu", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await dialog.getByRole("link", { name: "Tecnologias" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#tecnologias$/);
  await expect(page.locator("#tecnologias")).toBeInViewport();
});

test("CTA de orçamento do menu leva ao contato", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Solicitar orçamento" }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(page.locator("#contato")).toBeInViewport();
});

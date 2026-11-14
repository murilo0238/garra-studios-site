import { expect, test } from "@playwright/test";

// Build separado (porta 3101) gerado sem número de WhatsApp válido.
test.use({ baseURL: "http://localhost:3101" });

test("sem WhatsApp configurado: estado informativo e nenhum botão quebrado", async ({ page }) => {
  await page.goto("/#contato");
  await expect(page.getByRole("heading", { name: "Canal de contato em configuração" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Enviar/ })).toHaveCount(0);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);

  // CTAs continuam levando ao contato.
  await expect(page.getByRole("link", { name: "Quero criar meu site" })).toHaveAttribute("href", "/?servico=site#contato");
});

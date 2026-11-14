import { expect, test } from "@playwright/test";
import { faqSection } from "../content/site";

test("FAQ abre e fecha por clique e teclado, um item por vez", async ({ page }) => {
  await page.goto("/#faq");
  const items = page.locator("#faq details");
  await expect(items).toHaveCount(faqSection.items.length);

  // O primeiro vem aberto.
  await expect(items.nth(0)).toHaveAttribute("open", "");
  await expect(page.getByText(faqSection.items[0].answer)).toBeVisible();

  // Clique no segundo: abre e fecha o primeiro (accordion exclusivo).
  await items.nth(1).locator("summary").click();
  await expect(items.nth(1)).toHaveAttribute("open", "");
  await expect(items.nth(0)).not.toHaveAttribute("open", "");
  await expect(page.getByText(faqSection.items[1].answer)).toBeVisible();

  // Teclado: Enter no summary alterna.
  const summary = items.nth(1).locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(items.nth(1)).not.toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(items.nth(1)).toHaveAttribute("open", "");
});

test("perguntas expostas como controles expansíveis", async ({ page }) => {
  await page.goto("/#faq");
  const first = page.locator("#faq summary").first();
  await expect(first).toContainText(faqSection.items[0].question);
  const expanded = await first.evaluate((el) => (el.parentElement as HTMLDetailsElement).open);
  expect(expanded).toBe(true);
});

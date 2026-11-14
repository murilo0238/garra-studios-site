import type { Page, TestInfo } from "@playwright/test";

/** Número com que o build de teste foi gerado (.env.local ou variável de ambiente). */
export const EXPECTED_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5561992262196";

export const isMobile = (testInfo: TestInfo) => testInfo.project.name === "mobile";

/** Substitui window.open para registrar a URL sem abrir o WhatsApp de verdade. */
export async function captureWindowOpen(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __opened: string[] }).__opened = [];
    window.open = ((url?: string | URL) => {
      (window as unknown as { __opened: string[] }).__opened.push(String(url));
      return null;
    }) as typeof window.open;
  });
}

export async function openedUrls(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
}

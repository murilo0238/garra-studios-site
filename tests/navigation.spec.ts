import { expect, test } from "@playwright/test";
import { navItems } from "../content/site";
import { isMobile } from "./helpers";

test("menu principal leva a cada seção (desktop)", async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), "No mobile o menu é testado em mobile-menu.spec.ts");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });

  for (const item of navItems) {
    await nav.getByRole("link", { name: item.label, exact: true }).click();
    const id = item.href.split("#")[1];
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("não há links vazios nem âncoras quebradas", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));

  expect(hrefs.filter((href) => href === "#" || href === "" || href.startsWith("javascript:"))).toEqual([]);

  const anchors = [...new Set(hrefs.filter((href) => href.includes("#")).map((href) => href.split("#")[1]))];
  for (const id of anchors) {
    await expect(page.locator(`[id="${id}"]`), `âncora #${id}`).toHaveCount(1);
  }
});

test("todos os links internos respondem 200", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
  const paths = [
    ...new Set(
      hrefs
        .filter((href) => href.startsWith("/"))
        .map((href) => href.split("#")[0] || "/"),
    ),
  ];
  expect(paths.length).toBeGreaterThan(1);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

test("links externos abrem em nova aba com rel seguro", async ({ page }) => {
  await page.goto("/");
  const external = page.locator('a[target="_blank"]');
  const count = await external.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(external.nth(i)).toHaveAttribute("rel", /noopener/);
    await expect(external.nth(i)).toHaveAttribute("href", /^https:\/\/(wa\.me\/\d+|[a-z0-9-]+\.garrastudios\.online|github\.com\/murilo0238$)/);
  }
});

test("portfólio mostra o ATELIER como projeto conceito com link ao vivo", async ({ page }) => {
  await page.goto("/#portfolio");
  const section = page.locator("#portfolio");
  await expect(section.getByRole("heading", { name: "ATELIER" })).toBeVisible();
  await expect(section.getByText("Projeto conceito")).toBeVisible();
  await expect(section.getByRole("link", { name: /Ver site ao vivo/ })).toHaveAttribute(
    "href",
    "https://atelier.garrastudios.online",
  );
  const preview = section.getByRole("img", { name: /Página inicial do site ATELIER/ });
  await preview.scrollIntoViewIfNeeded();
  await expect.poll(() => preview.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1200);
});

test("CTAs de serviço apontam para o formulário com o serviço certo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Quero criar meu site" })).toHaveAttribute("href", "/?servico=site#contato");
  await expect(page.getByRole("link", { name: "Preciso de suporte técnico" })).toHaveAttribute(
    "href",
    "/?servico=correcao-bugs#contato",
  );
  await expect(page.getByRole("link", { name: "Propor uma parceria" })).toHaveAttribute(
    "href",
    "/?servico=parceria-agencia#contato",
  );
  await expect(page.getByRole("link", { name: /Solicitar orçamento.*Lojas Virtuais/ })).toHaveAttribute(
    "href",
    "/?servico=loja-virtual#contato",
  );
});

test("página tem um único h1 e landmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("foto do fundador carrega na seção Sobre e no contato", async ({ page }) => {
  await page.goto("/#sobre");
  const photo = page.getByRole("img", { name: /Foto de Murilo/ });
  await expect(photo).toBeVisible();
  // Imagens com loading="lazy": espera o carregamento terminar antes de medir.
  await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(800);

  await page.goto("/#contato");
  const avatar = page.locator('#contato img[src*="murilo-avatar"]');
  await expect(avatar).toBeVisible();
  await expect.poll(() => avatar.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(128);
});

test("sem rolagem horizontal", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

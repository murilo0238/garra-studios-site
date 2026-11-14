import { expect, test } from "@playwright/test";
import { isMobile } from "./helpers";

const SITE = "https://garrastudios.online";

test.beforeEach(({}, testInfo) => test.skip(isMobile(testInfo), "Endpoints e metadados independem do viewport."));

const endpoints: [string, RegExp][] = [
  ["/robots.txt", /text\/plain/],
  ["/sitemap.xml", /xml/],
  ["/manifest.webmanifest", /manifest\+json|application\/json/],
  ["/llms.txt", /text\/plain/],
  ["/icon.svg", /image\/svg\+xml/],
  ["/apple-icon", /image\/png/],
  ["/opengraph-image", /image\/png/],
  ["/brand/garra-symbol-dark.svg", /image\/svg\+xml/],
];

for (const [path, type] of endpoints) {
  test(`endpoint ${path} responde 200 com content-type correto`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(type);
  });
}

test("robots.txt libera rastreamento e aponta o sitemap", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toMatch(/User-Agent: \*/i);
  expect(body).toMatch(/Allow: \//);
  expect(body).not.toMatch(/Disallow: \/\s*$/m);
  expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("sitemap contém só URLs canônicas existentes", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  const locs = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toEqual([`${SITE}/`, `${SITE}/politica-de-privacidade`]);
  for (const loc of locs) {
    const path = loc.replace(SITE, "");
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("llms.txt descreve a marca com links reais", async ({ request }) => {
  const body = await (await request.get("/llms.txt")).text();
  expect(body.startsWith("# Garra Studios")).toBe(true);
  expect(body).toContain("Murilo");
  expect(body).toContain(`${SITE}/#contato`);
});

test("home: title, description, canonical, Open Graph e Twitter", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Garra Studios/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /sites profissionais/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}`);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Garra Studios/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "pt_BR");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`^${SITE}/opengraph-image`));
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", new RegExp(`^${SITE}/opengraph-image`));
  await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
});

test("política de privacidade tem metadata própria", async ({ page }) => {
  await page.goto("/politica-de-privacidade");
  await expect(page).toHaveTitle("Política de privacidade | Garra Studios");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/politica-de-privacidade`);
  await expect(page.locator("h1")).toHaveText("Política de privacidade");
});

test("JSON-LD é válido e não inventa dados", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(raw ?? "{}");
  expect(data["@context"]).toBe("https://schema.org");
  const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
  expect(types).toContain("Organization");
  expect(types).toContain("WebSite");
  expect(types.filter((t: string) => t === "Service").length).toBeGreaterThan(0);
  const serialized = JSON.stringify(data);
  for (const forbidden of ["address", "aggregateRating", "review", "foundingDate", "numberOfEmployees"]) {
    expect(serialized, forbidden).not.toContain(`"${forbidden}"`);
  }
  // Único perfil externo confirmado: o GitHub do fundador.
  const org = data["@graph"].find((node: { "@type": string }) => node["@type"] === "Organization");
  expect(org.sameAs).toBeUndefined();
  expect(org.founder.sameAs).toEqual(["https://github.com/murilo0238"]);
});

test("rota inexistente retorna 404 com noindex", async ({ page }) => {
  const response = await page.goto("/pagina-que-nao-existe");
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("não existe");
});

// Capturas de tela de revisão visual (não faz parte dos testes).
// Uso: com o servidor rodando (npm run start), `node scripts/screenshots.mjs [baseURL] [pastaSaida]`.
import { chromium, devices } from "@playwright/test";

const baseURL = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "test-results/screenshots";

const browser = await chromium.launch();
const shots = [
  { name: "desktop", context: { viewport: { width: 1440, height: 900 } } },
  { name: "mobile", context: { ...devices["Pixel 7"] } },
];

for (const { name, context } of shots) {
  const page = await (await browser.newContext({ ...context, reducedMotion: "reduce" })).newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${name}-home.png`, fullPage: true });
  if (name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.screenshot({ path: `${outDir}/${name}-menu.png` });
    await page.keyboard.press("Escape");
  }
  await page.goto(`${baseURL}/?servico=parceria-agencia#contato`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Enviar/ }).click();
  await page.screenshot({ path: `${outDir}/${name}-contato-erros.png` });
  await page.goto(`${baseURL}/pagina-inexistente`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${name}-404.png` });
}

await browser.close();
console.log(`Capturas salvas em ${outDir}`);

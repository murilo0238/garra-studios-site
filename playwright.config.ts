import { defineConfig, devices } from "@playwright/test";

/**
 * Testes ponta a ponta contra a exportação estática (o mesmo que vai para o Nginx).
 * `npm test` gera os dois builds antes:
 * - :3100 → out/               (build normal, com WhatsApp configurado)
 * - :3101 → out-sem-whatsapp/  (sem WhatsApp, para validar o estado informativo)
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  retries: 0,
  use: {
    baseURL: "http://localhost:3100",
    trace: "off",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "node scripts/serve-static.mjs out 3100",
      url: "http://localhost:3100",
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: "node scripts/serve-static.mjs out-sem-whatsapp 3101",
      url: "http://localhost:3101",
      reuseExistingServer: false,
      timeout: 30_000,
    },
  ],
});

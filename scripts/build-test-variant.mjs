// Gera a variante "sem WhatsApp" em out-sem-whatsapp/ e, em seguida, o build normal em out/.
// Usado por `npm test`, para validar o estado informativo do formulário.
import { execSync } from "node:child_process";
import { renameSync, rmSync } from "node:fs";

const run = (command, env = {}) =>
  execSync(command, { stdio: "inherit", env: { ...process.env, ...env } });

rmSync("out-sem-whatsapp", { recursive: true, force: true });
run("npx next build", { NEXT_PUBLIC_WHATSAPP_NUMBER: "desativado" });
renameSync("out", "out-sem-whatsapp");
run("npx next build");

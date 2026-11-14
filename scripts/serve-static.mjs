// Servidor estático mínimo para testes locais da pasta exportada (sem dependências).
// Imita a configuração do Nginx de produção:
//   try_files $uri $uri.html $uri/index.html =404  +  error_page 404 /404.html
// Uso: node scripts/serve-static.mjs <pasta> <porta>
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};
// Imagens geradas sem extensão (mesmo tratamento do Nginx).
const extensionless = { "/apple-icon": "image/png", "/opengraph-image": "image/png" };

function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [safe, `${safe}.html`, join(safe, "index.html")]) {
    const file = join(root, candidate);
    if (file.startsWith(root) && existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = resolveFile(pathname);
  const status = file ? 200 : 404;
  const target = file ?? join(root, "404.html");
  const type = extensionless[pathname] ?? types[extname(target)] ?? "application/octet-stream";
  res.writeHead(status, { "Content-Type": type });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Servindo ${root} em http://localhost:${port}`));

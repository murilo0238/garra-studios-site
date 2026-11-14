import type { NextConfig } from "next";

/**
 * Exportação estática: `next build` gera a pasta `out/` com HTML, CSS, JS e arquivos de SEO.
 * O Nginx serve esses arquivos diretamente — sem Node.js, banco ou processo extra no servidor.
 * Os headers de segurança ficam na configuração do Nginx (deploy/nginx/garrastudios.online.conf).
 */
const nextConfig: NextConfig = {
  output: "export",
  // Sem servidor de otimização: as imagens já são publicadas otimizadas (WebP no tamanho de uso).
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

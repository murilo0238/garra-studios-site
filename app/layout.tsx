import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/config";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // Sem `robots` global: indexar é o padrão, e uma diretiva aqui seria herdada pela 404
  // (que já recebe `noindex` do Next.js), gerando metas conflitantes.
  verification: {
    google: siteConfig.verification.google,
    other: siteConfig.verification.bing ? { "msvalidate.01": siteConfig.verification.bing } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F1A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-fg"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}

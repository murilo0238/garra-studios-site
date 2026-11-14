import { ImageResponse } from "next/og";
import { LOGO_BAR_PATH, LOGO_G_PATH } from "@/components/brand/Logo";

export const dynamic = "force-static";

export const alt = "Garra Studios — Criação de sites, sistemas e soluções digitais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 0%, rgba(37,99,255,0.45), transparent 55%), radial-gradient(circle at 0% 100%, rgba(6,182,212,0.2), transparent 50%), #0B0F1A",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
            <path d={LOGO_G_PATH} stroke="#5B8BFF" strokeWidth="3.2" strokeLinecap="square" />
            <path d={LOGO_BAR_PATH} stroke="#06B6D4" strokeWidth="3.2" strokeLinecap="square" />
          </svg>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>
            Garra<span style={{ marginLeft: 12, fontWeight: 400, opacity: 0.8 }}>Studios</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, maxWidth: 980 }}>
            Criamos sites, sistemas e soluções digitais para o seu negócio.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#94A3B8" }}>
            Desenvolvimento web • Sistemas • Automações • Suporte técnico
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#CBD5E1" }}>
          <span>garrastudios.online</span>
          <span style={{ color: "#06B6D4" }}>Orçamento personalizado</span>
        </div>
      </div>
    ),
    size,
  );
}

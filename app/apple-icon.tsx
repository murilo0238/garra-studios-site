import { ImageResponse } from "next/og";
import { LOGO_BAR_PATH, LOGO_G_PATH } from "@/components/brand/Logo";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple Touch Icon (180×180) gerado no build a partir do mesmo símbolo do favicon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#2563FF" }}>
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path d={LOGO_G_PATH} stroke="#F8FAFC" strokeWidth="3.4" strokeLinecap="square" />
          <path d={LOGO_BAR_PATH} stroke="#F8FAFC" strokeWidth="3.4" strokeLinecap="square" />
        </svg>
      </div>
    ),
    size,
  );
}

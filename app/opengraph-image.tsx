import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt = "Muhidin Misbah — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card a link unfurls into on LinkedIn, Slack and X: the hero, flattened.
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
          background: "radial-gradient(circle at 78% 30%, #1f30ff55 0%, #121212 55%)",
          backgroundColor: "#121212",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa" }}>
          {"<"}
          <span style={{ color: "#a5b4ff" }}>Muhidin</span>
          {" />"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Muhidin Misbah</div>
          <div style={{ fontSize: 44, fontWeight: 600, color: "#a5b4ff", marginTop: 12 }}>Senior Software Engineer</div>
          <div style={{ fontSize: 26, color: "#a1a1aa", marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#d4d4d8" }}>
          <span>ETB 210M+ disbursed</span>
          <span>4,500+ borrowers</span>
          <span>150K+ AI tool users</span>
        </div>
      </div>
    ),
    size
  );
}

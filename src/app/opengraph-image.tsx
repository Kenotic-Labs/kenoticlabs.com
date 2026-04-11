import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Kenotic Labs. The continuity layer for AI systems. arXiv:2604.06710 (ATANT).";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Absolute URL so the edge runtime can fetch the logo at render time.
const LOGO_URL = "https://kenoticlabs.com/Main-Logo-Upscalled.png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#0E0E0C",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(179, 155, 92, 0.10) 0%, transparent 55%), radial-gradient(circle at 82% 88%, rgba(45, 106, 79, 0.10) 0%, transparent 55%)",
          color: "#F5F2EA",
          padding: "64px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* LEFT: logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            width={360}
            height={360}
            alt="Kenotic Labs"
            style={{
              width: "360px",
              height: "360px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* RIGHT: stacked brand block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingLeft: "32px",
            justifyContent: "space-between",
          }}
        >
          {/* Top: eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              letterSpacing: "3.6px",
              textTransform: "uppercase",
              color: "#B39B5C",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "9999px",
                backgroundColor: "#B39B5C",
              }}
            />
            New &middot; April 8, 2026
          </div>

          {/* Middle: wordmark + tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "82px",
                lineHeight: 1.0,
                letterSpacing: "-2px",
                fontWeight: 700,
                color: "#F5F2EA",
                display: "flex",
              }}
            >
              Kenotic Labs
            </div>
            <div
              style={{
                fontSize: "30px",
                lineHeight: 1.3,
                color: "#C9C4B7",
                marginTop: "16px",
                maxWidth: "640px",
                display: "flex",
              }}
            >
              The continuity layer for AI systems.
            </div>
          </div>

          {/* Bottom: paper attribution + benchmark */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid rgba(245, 242, 234, 0.18)",
              paddingTop: "20px",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  fontSize: "14px",
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  color: "#B39B5C",
                  fontWeight: 600,
                }}
              >
                Paper &middot; arXiv cs.AI
              </div>
              <div style={{ fontSize: "20px", color: "#F5F2EA", fontWeight: 500 }}>
                ATANT: An Evaluation Framework for AI Continuity
              </div>
              <div style={{ fontSize: "16px", color: "#9C9685" }}>
                arxiv.org/abs/2604.06710
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "2px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  color: "#2D6A4F",
                  fontWeight: 600,
                }}
              >
                ATANT &middot; 250 cumulative
              </div>
              <div
                style={{
                  fontSize: "44px",
                  color: "#F5F2EA",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                96%
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

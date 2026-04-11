import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Kenotic Labs. The Continuity Layer for AI Systems. arXiv:2604.06710 (ATANT).";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0E0E0C",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(179, 155, 92, 0.10) 0%, transparent 55%), radial-gradient(circle at 82% 88%, rgba(45, 106, 79, 0.10) 0%, transparent 55%)",
          color: "#F5F2EA",
          padding: "72px 88px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top: tiny eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#B39B5C",
            fontWeight: 600,
            fontFamily: "sans-serif",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              backgroundColor: "#B39B5C",
            }}
          />
          New &middot; April 8, 2026
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Brand wordmark */}
        <div
          style={{
            fontSize: "108px",
            lineHeight: 1.0,
            letterSpacing: "-3px",
            fontWeight: 700,
            color: "#F5F2EA",
            display: "flex",
          }}
        >
          Kenotic Labs
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "44px",
            lineHeight: 1.25,
            color: "#C9C4B7",
            marginTop: "20px",
            maxWidth: "920px",
            display: "flex",
          }}
        >
          The continuity layer for AI systems.
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Bottom row: paper + benchmark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(245, 242, 234, 0.18)",
            paddingTop: "24px",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#B39B5C",
                fontWeight: 600,
              }}
            >
              Paper &middot; arXiv cs.AI
            </div>
            <div
              style={{
                fontSize: "26px",
                color: "#F5F2EA",
                fontWeight: 500,
              }}
            >
              ATANT: An Evaluation Framework for AI Continuity
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#9C9685",
              }}
            >
              arxiv.org/abs/2604.06710
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#2D6A4F",
                fontWeight: 600,
              }}
            >
              ATANT &middot; 250 cumulative
            </div>
            <div
              style={{
                fontSize: "56px",
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
    ),
    {
      ...size,
    }
  );
}

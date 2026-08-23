import { ImageResponse } from "next/og";

export const alt = "Flowstate — we rebuild the site you have.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 0% 0%, rgba(122,31,36,0.48), transparent 55%), radial-gradient(ellipse 70% 60% at 100% 100%, rgba(196,92,38,0.22), transparent 50%)",
          padding: 72,
          color: "#f3eee6",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8ee0c8",
          }}
        >
          Flowstate · Montreal
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: "Georgia, serif",
            marginTop: 18,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          We rebuild the site you have.
        </div>
        <div style={{ fontSize: 24, marginTop: 22, color: "#b4aea3" }}>
          flowstate-webdesign.com
        </div>
      </div>
    ),
    { ...size },
  );
}

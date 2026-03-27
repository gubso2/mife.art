import { ImageResponse } from "next/og";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          color: "#1a237e",
          fontSize: "200px",
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          lineHeight: 1,
          paddingTop: "20px",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}

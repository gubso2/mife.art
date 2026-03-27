import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  const logoData = readFileSync(
    join(process.cwd(), "public/favicon new black.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

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
        }}
      >
        <img src={logoBase64} width={240} height={240} />
      </div>
    ),
    { ...size }
  );
}

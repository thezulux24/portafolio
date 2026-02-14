import { ImageResponse } from "next/og";

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = "image/png";

// Image generation
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
                    background: "linear-gradient(to bottom right, #000000, #1a1a1a)",
                    borderRadius: "50%", // Circle shape
                    border: "16px solid #333",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 280,
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                        fontFamily: "sans-serif",
                        position: "relative",
                    }}
                >
                    <span style={{ marginRight: -10 }}>B</span>
                    <span style={{ color: "#aaa" }}>Z</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

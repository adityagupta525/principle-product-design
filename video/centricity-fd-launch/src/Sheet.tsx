import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

/**
 * A contact sheet. The bundled ffmpeg has its `tile` filter stripped, so the
 * teardown grids are rendered here instead — which is better anyway, because
 * every cell can carry its own timecode.
 */
export const Sheet: React.FC<{
  dir?: string;
  start?: number;
  count?: number;
  cols?: number;
  step?: number;
  label?: string;
}> = ({ dir = "a", start = 0, count = 30, cols = 6, step = 0.2, label = "" }) => {
  const rows = Math.ceil(count / cols);
  const cw = 1920 / cols;
  const chh = (cw * 9) / 16;
  return (
    <AbsoluteFill style={{ background: "#111", fontFamily: "monospace" }}>
      <div style={{ position: "absolute", top: 6, left: 12, color: "#8FE", fontSize: 22 }}>
        {label} · {(start * step).toFixed(1)}s → {((start + count - 1) * step).toFixed(1)}s
      </div>
      <div style={{ position: "absolute", top: 40, left: 0, width: 1920 }}>
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} style={{ display: "flex" }}>
            {Array.from({ length: cols }, (_, c) => {
              const i = start + r * cols + c;
              if (r * cols + c >= count) return <div key={c} style={{ width: cw, height: chh }} />;
              return (
                <div key={c} style={{ width: cw, height: chh, position: "relative" }}>
                  <Img
                    src={staticFile(`tear/${dir}/${String(i).padStart(4, "0")}.jpg`)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute", left: 3, bottom: 2, color: "#FF0", fontSize: 17,
                      textShadow: "0 0 4px #000, 0 0 8px #000", fontWeight: 700,
                    }}
                  >
                    {(i * step).toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COPY } from "../copy";
import { at, EASE } from "../lib/motion";
import { Ground, AccentCaption, Panel, Stage, CAPTION_BAND } from "../lib/atoms";
import { ShareCard, ChatScreen, DownloadScreen } from "../screens/AppScreens";

/**
 * Beat 3 — 10s. The card assembles inside the app's Image preview, then
 * travels: it lifts out of the left phone, crosses the gap, and settles into
 * the client's chat as a sent attachment. The reel's card-slide, doing the one
 * thing this feature is actually for.
 */
export const Share: React.FC = () => {
  const frame = useCurrentFrame();
  const LEAVE = 108; // card lifts out of the preview slot
  const LAND = 156;  // card arrives in the thread

  const travel = at(frame, [LEAVE, LAND], [0, 1], EASE.outQuint);
  const x = -252 + travel * 504;
  const lift = Math.sin(travel * Math.PI) * -54; // arcs up over the gap
  const scale = 1 - travel * 0.34;
  const tilt = Math.sin(travel * Math.PI) * -7;
  // Hand off to the chat's own attachment exactly as it lands.
  const fade = at(frame, [LAND - 6, LAND + 2], [1, 0], EASE.outQuart);

  return (
    <AbsoluteFill>
      <Ground />

      <Stage caption={<AccentCaption caption={COPY.share.caption} delay={176} exitAt={272} />}>
        <div style={{ display: "flex", gap: 130 }}>
          <Panel scale={0.86} delay={4} height={812}>
            <DownloadScreen delay={18} cardLeavesAt={LEAVE} />
          </Panel>
          <Panel scale={0.86} delay={14} height={812}>
            <ChatScreen delay={0} landAt={LAND} />
          </Panel>
        </div>
      </Stage>

      {/* The card in transit, riding above both panels. */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: CAPTION_BAND,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `translate(${x}px, ${lift}px) scale(${scale}) rotate(${tilt}deg)`,
            opacity: fade,
          }}
        >
          <ShareCard delay={26} width={252} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

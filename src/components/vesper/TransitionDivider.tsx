import React from "react";

const TransitionDivider = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "160px",
        width: "100%",
        overflow: "hidden",
        zIndex: 10,
        background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 50%, #0a0a0a 100%)",
      }}
    >
      {/* ── Central Radial Warm Glow Bloom ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(180, 140, 60, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* ── Horizontal "Horizon" Line ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "20%",
          width: "60%",
          height: "1px",
          zIndex: 2,
          background: "linear-gradient(to right, transparent 0%, rgba(180, 140, 60, 0.6) 20%, rgba(180, 140, 60, 0.6) 80%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default TransitionDivider;

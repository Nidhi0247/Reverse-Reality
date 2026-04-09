"use client";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #06060e; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
        @keyframes scan {
          0% { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes cornerGlow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 0px #7c3aed; }
          50% { opacity: 1; box-shadow: 0 0 12px #7c3aed, 0 0 24px rgba(124,58,237,0.3); }
        }
        @keyframes badgePulse {
          0%, 100% { border-color: rgba(124,58,237,0.4); box-shadow: none; }
          50% { border-color: rgba(124,58,237,0.9); box-shadow: 0 0 12px rgba(124,58,237,0.3), inset 0 0 8px rgba(124,58,237,0.1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; box-shadow: 0 0 8px #7c3aed; }
        }

        .rr-pulse {
          position: absolute;
          left: 50%; top: 50%;
          width: 360px; height: 360px;
          border-radius: 50%;
          border: 1px solid rgba(124,58,237,0.22);
          animation: pulse-ring 4s ease-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        .rr-corner {
          position: absolute;
          width: 44px; height: 44px;
          border-color: #7c3aed;
          border-style: solid;
          animation: cornerGlow 3s ease-in-out infinite;
          z-index: 2;
        }

        .rr-line-dot {
          display: inline-block;
          width: 4px; height: 4px;
          background: #7c3aed;
          border-radius: 50%;
          animation: dotBlink 2s ease-in-out infinite;
        }

        .rr-div-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.35), transparent);
        }

        .rr-div-diamond {
          width: 6px; height: 6px;
          background: #7c3aed;
          transform: rotate(45deg);
          opacity: 0.7;
          animation: dotBlink 2.5s ease-in-out infinite;
        }

        #rr-badge {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: #a78bfa;
          border: 1px solid rgba(124,58,237,0.4);
          padding: 6px 18px;
          border-radius: 2px;
          margin-bottom: 2.2rem;
          animation: badgePulse 3s ease-in-out infinite, flicker 8s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        #rr-badge::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.08), transparent);
          background-size: 400px 100%;
          animation: shimmer 3s linear infinite;
        }

        #rr-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.2rem, 9vw, 4.2rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 8px;
          text-align: center;
          line-height: 1.1;
          margin-bottom: 0.6rem;
          animation: float 4.5s ease-in-out infinite;
          text-shadow: 0 0 60px rgba(124,58,237,0.2);
        }

        #rr-accent {
          color: transparent;
          background: linear-gradient(135deg, #a78bfa, #7c3aed, #c4b5fd);
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          filter: drop-shadow(0 0 20px rgba(124,58,237,0.5));
        }

        #rr-sub {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: #4b5563;
          margin-bottom: 3rem;
          text-align: center;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        #rr-btn {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #fff;
          background: transparent;
          border: 1.5px solid rgba(124,58,237,0.7);
          border-radius: 3px;
          padding: 1rem 3.2rem;
          cursor: pointer;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          z-index: 0;
        }
        #rr-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #7c3aed;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: -1;
        }
        #rr-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          background-size: 400px 100%;
          animation: shimmer 2.5s linear infinite;
          pointer-events: none;
        }
        #rr-btn:hover::before { transform: scaleX(1); }
        #rr-btn:hover {
          border-color: #7c3aed;
          box-shadow: 0 0 20px rgba(124,58,237,0.35), 0 0 40px rgba(124,58,237,0.15);
          transform: translateY(-2px);
        }
        #rr-btn:active { transform: scale(0.97); }

        #rr-btn-icon {
          display: inline-block;
          margin-right: 10px;
          opacity: 0.85;
          font-size: 10px;
          vertical-align: middle;
        }

        #rr-scan {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(167,139,250,0.6), rgba(124,58,237,0.4), transparent);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        #rr-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1.5rem;
          animation: fadeUp 0.9s ease both;
        }

        #rr-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 2rem 0 0;
          width: 280px;
        }

        #rr-org {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: #374151;
          margin-top: 1.2rem;
        }

        #rr-org-name {
          color: #6d28d9;
          letter-spacing: 3px;
        }
      `}</style>

      {/* Root */}
      <div style={styles.page}>

        {/* SVG Grid Background */}
        <svg
          style={styles.bg}
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(124,58,237,0.18)"/>
              <stop offset="100%" stopColor="rgba(6,6,14,0)"/>
            </radialGradient>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.12)"/>
              <stop offset="100%" stopColor="rgba(139,92,246,0)"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          <rect width="100%" height="100%" fill="url(#centerGlow)"/>
          <circle cx="400" cy="300" r="260" fill="url(#orbGlow)" opacity="0.7"/>
          <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(139,92,246,0.18)" strokeWidth="0.5" strokeDasharray="4 8"/>
          <line x1="0" y1="400" x2="800" y2="400" stroke="rgba(139,92,246,0.18)" strokeWidth="0.5" strokeDasharray="4 8"/>
          <line x1="160" y1="0" x2="160" y2="600" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" strokeDasharray="4 12"/>
          <line x1="640" y1="0" x2="640" y2="600" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" strokeDasharray="4 12"/>
        </svg>

        {/* Scanline */}
        <div id="rr-scan" />

        {/* Pulse Rings */}
        <div className="rr-pulse" />
        <div className="rr-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="rr-pulse" style={{ animationDelay: "2.4s" }} />

        {/* Corner Brackets */}
        <div className="rr-corner" style={{ top: 20, left: 20, borderWidth: "2px 0 0 2px" }} />
        <div className="rr-corner" style={{ top: 20, right: 20, borderWidth: "2px 2px 0 0" }} />
        <div className="rr-corner" style={{ bottom: 20, left: 20, borderWidth: "0 0 2px 2px" }} />
        <div className="rr-corner" style={{ bottom: 20, right: 20, borderWidth: "0 2px 2px 0" }} />

        {/* Main Content */}
        <div id="rr-content">
          <div id="rr-badge">DICE HUB PRESENTS</div>

          <h1 id="rr-title">
            REVERSE <span id="rr-accent">REALITY</span>
          </h1>

          <p id="rr-sub">
            <span className="rr-line-dot" />
            THINK BACKWARDS · WIN FORWARDS
            <span className="rr-line-dot" />
          </p>

          <button id="rr-btn" onClick={() => window.location.href = "/login"}>
            <span id="rr-btn-icon">▶</span>
            ENTER THE ARENA
          </button>

          <div id="rr-divider">
            <div className="rr-div-line" />
            <div className="rr-div-diamond" />
            <div className="rr-div-line" />
          </div>

          <p id="rr-org">
            ORGANIZED BY <span id="rr-org-name">DICE HUB</span>
          </p>
        </div>

      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#06060e",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "3rem 1rem",
  },
  bg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
};

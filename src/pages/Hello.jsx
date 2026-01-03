import { useEffect } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  useEffect(() => {
    const text = document.querySelector(".explode-text");
    const container = document.querySelector(".pieces");

    text.addEventListener("click", () => {
      if (container.children.length) return;

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.setProperty("--x", `${(Math.random() - 0.5) * 600}px`);
        span.style.setProperty("--y", `${(Math.random() - 0.5) * 600}px`);
        span.style.setProperty("--r", `${(Math.random() - 0.5) * 720}deg`);
        span.style.animationDelay = `${i * 20}ms`;
        container.appendChild(span);
      });
    });
  }, []);

  return (
    <div className="page">
      <div className="logo" />

      <div className="center">
        <h1 className="explode-text">HELLO 👋</h1>
        <div className="pieces"></div>
        <p className="hint">CLICK TO DETONATE 💥</p>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
        }

        .page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #020617, black);
          overflow: hidden;
          position: relative;
          font-family: system-ui;
        }

        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 380px;
          opacity: 0.05;
          animation: slowSpin 20s linear infinite;
        }

        @keyframes slowSpin {
          to { transform: rotate(360deg) scale(1.1); }
        }

        .center {
          position: relative;
          text-align: center;
          z-index: 2;
        }

        .explode-text {
          font-size: 96px;
          font-weight: 900;
          cursor: pointer;
          color: #22d3ee;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.2s infinite;
          user-select: none;
        }

        @keyframes pulse {
          50% { transform: scale(1.08); }
        }

        .pieces {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .pieces span {
          position: absolute;
          font-size: 96px;
          font-weight: 900;
          color: #22d3ee;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8;
          animation: explode 1.2s ease-out forwards;
        }

        @keyframes explode {
          to {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.2);
            opacity: 0;
            filter: blur(2px);
          }
        }

        .hint {
          margin-top: 20px;
          font-size: 14px;
          letter-spacing: 3px;
          color: #94a3b8;
          animation: blink 1.4s infinite;
        }

        @keyframes blink {
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

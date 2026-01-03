import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);

  useEffect(() => {
    const text = document.querySelector(".explode-text");
    const container = document.querySelector(".pieces");

    const explode = () => {
      if (exploded.current) return;
      exploded.current = true;

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;

        const x = (Math.random() - 0.5) * 900;
        const y = (Math.random() - 0.5) * 600;
        const r = (Math.random() - 0.5) * 1080;

        span.style.setProperty("--x", `${x}px`);
        span.style.setProperty("--y", `${y}px`);
        span.style.setProperty("--r", `${r}deg`);
        span.style.animationDelay = `${i * 25}ms`;

        container.appendChild(span);
      });

      // 🧬 REASSEMBLE AFTER CHAOS
      setTimeout(() => {
        container.classList.add("reassemble");
      }, 1800);

      // FINAL SNAP BACK
      setTimeout(() => {
        container.innerHTML = "";
        text.style.visibility = "visible";
        exploded.current = false;
      }, 3200);
    };

    text.addEventListener("click", explode);
    return () => text.removeEventListener("click", explode);
  }, []);

  return (
    <div className="screen">
      <div className="logo" />

      <div className="center">
        <h1 className="explode-text">HELLO 👋</h1>
        <div className="pieces"></div>
        <p className="hint">CLICK → DESTROY → REFORM 🧬</p>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
        }

        .screen {
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #020617, black);
          font-family: system-ui;
          position: relative;
        }

        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 380px;
          opacity: 0.05;
          animation: spin 18s linear infinite;
        }

        @keyframes spin {
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
          color: #22d3ee;
          cursor: pointer;
          user-select: none;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.2s infinite;
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
          animation: explode 0.9s ease-out forwards;
        }

        @keyframes explode {
          to {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.6);
            opacity: 1;
            filter: blur(1px);
          }
        }

        /* 🧬 UNHOLY REASSEMBLE */
        .reassemble span {
          animation: reassemble 1.2s ease-in forwards;
        }

        @keyframes reassemble {
          from {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.3);
            opacity: 0.4;
            filter: blur(3px);
          }
          to {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        .hint {
          margin-top: 18px;
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

import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);

  useEffect(() => {
    const text = document.querySelector(".explode-text");
    const container = document.querySelector(".pieces");
    const screen = document.querySelector(".screen");

    text.addEventListener("click", () => {
      if (exploded.current) return;
      exploded.current = true;

      // SCREEN FLASH + FREEZE
      screen.classList.add("flash", "shake", "slow");

      setTimeout(() => {
        screen.classList.remove("flash");
      }, 120);

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;

        span.style.setProperty("--x", `${(Math.random() - 0.5) * 900}px`);
        span.style.setProperty("--y", `${(Math.random() - 0.5) * 600}px`);
        span.style.setProperty("--r", `${(Math.random() - 0.5) * 1080}deg`);
        span.style.animationDelay = `${i * 25}ms`;

        container.appendChild(span);
      });

      setTimeout(() => {
        screen.classList.remove("slow");
      }, 900);
    });
  }, []);

  return (
    <div className="screen">
      <div className="crack" />
      <div className="logo" />

      <div className="center">
        <h1 className="explode-text">HELLO 👋</h1>
        <div className="pieces"></div>
        <p className="hint">CLICK TO BREAK REALITY 💥</p>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
        }

        .screen {
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at top, #020617, black);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: system-ui;
        }

        /* FREEZE FRAME */
        .slow * {
          animation-duration: 2.5s !important;
        }

        /* FLASH */
        .flash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0.8;
          animation: flash 0.15s ease-out forwards;
          z-index: 99;
        }

        @keyframes flash {
          to { opacity: 0; }
        }

        /* CAMERA SHAKE */
        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          10% { transform: translate(-6px, 4px); }
          20% { transform: translate(6px, -4px); }
          30% { transform: translate(-4px, -6px); }
          40% { transform: translate(4px, 6px); }
        }

        /* BACKGROUND LOGO */
        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 380px;
          opacity: 0.05;
          animation: spin 18s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg) scale(1.15); }
        }

        /* CRACK OVERLAY */
        .crack {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.05) 62px
            );
          opacity: 0;
          pointer-events: none;
        }

        .shake .crack {
          opacity: 1;
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
          50% { transform: scale(1.1); }
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
          animation:
            explode 0.8s ease-out forwards,
            fall 1.2s ease-in forwards;
        }

        @keyframes explode {
          to {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r));
            opacity: 1;
          }
        }

        /* GRAVITY DROP */
        @keyframes fall {
          to {
            transform:
              translate(var(--x), 800px)
              rotate(var(--r))
              scale(0.4);
            opacity: 0;
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
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

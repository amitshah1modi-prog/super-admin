import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);

  useEffect(() => {
    const text = document.querySelector(".main-text");
    const pieces = document.querySelector(".pieces");
    const screen = document.querySelector(".screen");

    const explode = () => {
      if (exploded.current) return;
      exploded.current = true;

      screen.classList.add("shake", "flash");

      setTimeout(() => screen.classList.remove("flash"), 120);

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

        pieces.appendChild(span);
      });

      // 🧬 REASSEMBLE
      setTimeout(() => {
        pieces.classList.add("reassemble");
      }, 1600);

      // 🔁 RESET
      setTimeout(() => {
        pieces.innerHTML = "";
        pieces.classList.remove("reassemble");
        text.style.visibility = "visible";
        exploded.current = false;
      }, 3200);
    };

    text.addEventListener("click", explode);
    return () => text.removeEventListener("click", explode);
  }, []);

  return (
    <div className="screen">
      <div className="noise" />
      <div className="vignette" />
      <div className="logo" />

      <div className="center">
        <h1 className="main-text">HELLO 👋</h1>
        <div className="pieces" />
        <p className="hint">CLICK → DESTROY → REFORM</p>
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

        /* FILM GRAIN */
        .noise {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.03),
            rgba(255,255,255,0.03) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: noise 0.2s infinite;
          pointer-events: none;
        }

        @keyframes noise {
          50% { transform: translate(-1px, 1px); }
        }

        /* VIGNETTE */
        .vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 200px black;
          pointer-events: none;
        }

        .center {
          position: relative;
          text-align: center;
          z-index: 2;
        }

        /* MAIN TEXT */
        .main-text {
          font-size: 96px;
          font-weight: 900;
          cursor: pointer;
          user-select: none;
          color: #22d3ee;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          50% { transform: scale(1.08); }
        }

        /* SHAKE */
        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          10% { transform: translate(-6px, 4px); }
          20% { transform: translate(6px, -4px); }
          30% { transform: translate(-4px, -6px); }
          40% { transform: translate(4px, 6px); }
        }

        /* FLASH */
        .flash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0.9;
          animation: flash 0.15s forwards;
          z-index: 10;
        }

        @keyframes flash {
          to { opacity: 0; }
        }

        /* PIECES */
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
            filter: blur(1px);
          }
        }

        /* REASSEMBLE */
        .reassemble span {
          animation: reassemble 1.2s ease-in forwards;
        }

        @keyframes reassemble {
          from {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.3);
            filter: blur(3px);
          }
          to {
            transform: translate(0, 0) rotate(0deg) scale(1);
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


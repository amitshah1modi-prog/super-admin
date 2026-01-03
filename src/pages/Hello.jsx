import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    const text = document.querySelector(".main-text");
    const pieces = document.querySelector(".pieces");
    const screen = document.querySelector(".screen");

    const explode = () => {
      if (exploded.current) return;
      exploded.current = true;

      screen.classList.add("shake", "flash", "corrupt");
      setTimeout(() => screen.classList.remove("flash", "corrupt"), 160);

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;

        const x = (Math.random() - 0.5) * 1000;
        const y = (Math.random() - 0.5) * 700;
        const r = (Math.random() - 0.5) * 1440;

        span.style.setProperty("--x", `${x}px`);
        span.style.setProperty("--y", `${y}px`);
        span.style.setProperty("--r", `${r}deg`);
        span.style.animationDelay = `${i * 25}ms`;

        pieces.appendChild(span);
      });

      setTimeout(() => pieces.classList.add("reassemble"), 1800);

      setTimeout(() => {
        pieces.innerHTML = "";
        pieces.classList.remove("reassemble");
        text.style.visibility = "visible";
        exploded.current = false;
      }, 3600);
    };

    const resetIdle = () => {
      screen.classList.remove("idle");
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        screen.classList.add("idle");
      }, 2500);
    };

    const keyChaos = (e) => {
      if (e.key === "Escape") explode();
      if (e.key === "r") screen.classList.toggle("red-alert");
      if (e.key === "g") screen.classList.toggle("glitch-world");
    };

    text.addEventListener("click", explode);
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", keyChaos);

    resetIdle();

    return () => {
      text.removeEventListener("click", explode);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", keyChaos);
    };
  }, []);

  return (
    <div className="screen idle">
      <div className="noise" />
      <div className="vignette" />
      <div className="logo" />

      <div className="center">
        <h1 className="main-text">HELLO 👋</h1>
        <div className="pieces" />
        <p className="hint">
          CLICK / ESC → EXPLODE · R → RED · G → GLITCH
        </p>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
          overflow: hidden;
        }

        .screen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #020617, black);
          font-family: system-ui;
          position: relative;
          transition: transform 0.3s;
        }

        /* IDLE BREATHING */
        .idle {
          animation: breathe 3s infinite;
        }

        @keyframes breathe {
          50% { transform: scale(1.02); }
        }

        /* GLITCH WORLD */
        .glitch-world {
          animation: worldGlitch 0.4s infinite;
        }

        @keyframes worldGlitch {
          25% { transform: skewX(2deg); }
          50% { transform: skewY(-2deg); }
        }

        /* RED ALERT */
        .red-alert::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,0,0,0.12);
          animation: redPulse 0.8s infinite;
          z-index: 5;
        }

        @keyframes redPulse {
          50% { opacity: 0.35; }
        }

        /* CORRUPTION FLASH */
        .corrupt::after {
          content: "";
          position: absolute;
          inset: 0;
          background: red;
          opacity: 0.6;
          animation: flash 0.15s forwards;
          z-index: 10;
        }

        @keyframes flash {
          to { opacity: 0; }
        }

        /* BACKGROUND LOGO */
        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 380px;
          opacity: 0.04;
          animation: spin 20s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg) scale(1.2); }
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
          animation: noise 0.18s infinite;
          pointer-events: none;
        }

        @keyframes noise {
          50% { transform: translate(-1px, 1px); }
        }

        .vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 220px black;
          pointer-events: none;
        }

        .center {
          position: relative;
          text-align: center;
          z-index: 6;
        }

        .main-text {
          font-size: 96px;
          font-weight: 900;
          cursor: pointer;
          color: #22d3ee;
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

        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          10% { transform: translate(-6px, 4px); }
          20% { transform: translate(6px, -4px); }
          30% { transform: translate(-4px, -6px); }
          40% { transform: translate(4px, 6px); }
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

        .reassemble span {
          animation: reassemble 1.3s ease-in forwards;
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
            transform: translate(0,0) rotate(0) scale(1);
            filter: blur(0);
          }
        }

        .hint {
          margin-top: 18px;
          font-size: 12px;
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

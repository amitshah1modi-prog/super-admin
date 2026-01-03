import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);
  const panicTimer = useRef(null);

  useEffect(() => {
    const text = document.querySelector(".main-text");
    const pieces = document.querySelector(".pieces");
    const screen = document.querySelector(".screen");

    /* 💥 EXPLOSION CORE */
    const explode = () => {
      if (exploded.current) return;
      exploded.current = true;

      screen.classList.add("shake", "flash", "melt", "desync");

      setTimeout(() => screen.classList.remove("flash"), 140);
      setTimeout(() => screen.classList.remove("melt"), 600);

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;

        const x = (Math.random() - 0.5) * 1200;
        const y = (Math.random() - 0.5) * 900;
        const r = (Math.random() - 0.5) * 1800;

        span.style.setProperty("--x", `${x}px`);
        span.style.setProperty("--y", `${y}px`);
        span.style.setProperty("--r", `${r}deg`);
        span.style.animationDelay = `${i * 20}ms`;

        pieces.appendChild(span);
      });

      setTimeout(() => pieces.classList.add("reassemble"), 2000);

      setTimeout(() => {
        pieces.innerHTML = "";
        pieces.classList.remove("reassemble");
        text.style.visibility = "visible";
        exploded.current = false;
        screen.classList.remove("desync");
      }, 4200);
    };

    /* 👁️ RANDOM POSSESSION */
    const randomPanic = () => {
      screen.classList.add("panic");
      setTimeout(() => screen.classList.remove("panic"), 300);
      panicTimer.current = setTimeout(randomPanic, 3500 + Math.random() * 4000);
    };

    panicTimer.current = setTimeout(randomPanic, 3000);

    text.addEventListener("click", explode);
    window.addEventListener("keydown", (e) => e.key === "Escape" && explode());

    return () => clearTimeout(panicTimer.current);
  }, []);

  return (
    <div className="screen">
      <div className="blink" />
      <div className="noise" />
      <div className="vignette" />
      <div className="logo" />
      <div className="panic-text">SYSTEM FAILURE</div>

      <div className="center">
        <h1 className="main-text">HELLO 👋</h1>
        <div className="pieces" />
        <p className="hint">CLICK / ESC — DO NOT TRUST THIS PAGE</p>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
          cursor: none;
        }

        /* POSSESSED CURSOR */
        body::after {
          content: "";
          position: fixed;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22d3ee;
          pointer-events: none;
          mix-blend-mode: screen;
          animation: cursorJitter 0.2s infinite;
        }

        @keyframes cursorJitter {
          50% { transform: translate(2px, -2px); }
        }

        .screen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #020617, black);
          font-family: system-ui;
          position: relative;
          overflow: hidden;
        }

        /* DESYNC */
        .desync {
          filter: hue-rotate(40deg);
        }

        /* MELT */
        .melt {
          animation: melt 0.6s ease-in-out;
        }

        @keyframes melt {
          50% { transform: scaleY(0.96) skewX(2deg); }
        }

        /* PANIC */
        .panic {
          animation: panic 0.3s;
        }

        @keyframes panic {
          25% { transform: rotate(0.4deg); }
          50% { transform: rotate(-0.4deg); }
        }

        /* BLINK */
        .blink {
          position: absolute;
          inset: 0;
          background: black;
          opacity: 0;
          animation: blink 8s infinite;
          pointer-events: none;
          z-index: 8;
        }

        @keyframes blink {
          95% { opacity: 0; }
          96% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* LOGO */
        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 360px;
          opacity: 0.04;
          animation: spin 22s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg) scale(1.25); }
        }

        .noise {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.025),
            rgba(255,255,255,0.025) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: noise 0.15s infinite;
        }

        @keyframes noise {
          50% { transform: translate(-1px,1px); }
        }

        .vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 260px black;
        }

        .center {
          position: relative;
          text-align: center;
          z-index: 10;
        }

        .main-text {
          font-size: 96px;
          font-weight: 900;
          color: #22d3ee;
          cursor: pointer;
          user-select: none;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.1s infinite;
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
          animation: explode 0.9s ease-out forwards;
        }

        @keyframes explode {
          to {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.5);
            filter: blur(1px);
          }
        }

        .reassemble span {
          animation: reassemble 1.4s ease-in forwards;
        }

        @keyframes reassemble {
          from {
            transform:
              translate(var(--x), var(--y))
              rotate(var(--r))
              scale(0.3);
            filter: blur(4px);
          }
          to {
            transform: translate(0,0) rotate(0) scale(1);
            filter: blur(0);
          }
        }

        .panic-text {
          position: absolute;
          top: 40px;
          font-size: 12px;
          letter-spacing: 4px;
          color: red;
          opacity: 0;
          animation: panicText 6s infinite;
          z-index: 9;
        }

        @keyframes panicText {
          85% { opacity: 0; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        .hint {
          margin-top: 16px;
          font-size: 11px;
          letter-spacing: 3px;
          color: #94a3b8;
          animation: blinkHint 1.5s infinite;
        }

        @keyframes blinkHint {
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

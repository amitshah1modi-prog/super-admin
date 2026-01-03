import { useEffect, useRef } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  const exploded = useRef(false);
  const piecesRef = useRef(null);
  const screenRef = useRef(null);
  const keyBuffer = useRef([]);
  const audioCtx = useRef(null);

  /* 🔊 SIMPLE SYNTH SOUND (NO FILES) */
  const beep = (freq = 180, dur = 0.08) => {
    if (!audioCtx.current)
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "square";
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  };

  useEffect(() => {
    const text = document.querySelector(".main-text");
    const pieces = piecesRef.current;
    const screen = screenRef.current;

    /* 💥 EXPLODE */
    const explode = () => {
      if (exploded.current) return;
      exploded.current = true;

      beep(90);
      screen.classList.add("shake", "flash", "desync");

      setTimeout(() => screen.classList.remove("flash"), 120);

      const chars = text.innerText.split("");
      text.style.visibility = "hidden";

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;

        span.style.setProperty("--x", `${(Math.random() - 0.5) * 1200}px`);
        span.style.setProperty("--y", `${(Math.random() - 0.5) * 900}px`);
        span.style.setProperty("--r", `${(Math.random() - 0.5) * 1800}deg`);
        span.style.animationDelay = `${i * 20}ms`;

        pieces.appendChild(span);
      });

      setTimeout(() => {
        pieces.classList.add("reassemble");
        beep(240);
      }, 2000);

      setTimeout(() => {
        pieces.innerHTML = "";
        pieces.classList.remove("reassemble");
        text.style.visibility = "visible";
        exploded.current = false;
        screen.classList.remove("desync");
        beep(120);
      }, 4200);
    };

    /* ⏪ TIME REWIND (HOLD T) */
    const rewind = (on) => {
      screen.style.filter = on ? "invert(1) hue-rotate(180deg)" : "";
      screen.style.animationDirection = on ? "reverse" : "normal";
    };

    /* 🧠 SECRET KEYS */
    const onKey = (e) => {
      beep(60);
      keyBuffer.current.push(e.key);
      keyBuffer.current = keyBuffer.current.slice(-10);

      // KONAMI → GOD MODE
      if (keyBuffer.current.join("").includes("ArrowUpArrowUpArrowDownArrowDown")) {
        screen.classList.toggle("godmode");
        beep(440);
      }

      if (e.key === "Escape") explode();
      if (e.key === "b") screen.classList.toggle("bsod");
      if (e.key === "t") rewind(true);
    };

    const onKeyUp = (e) => {
      if (e.key === "t") rewind(false);
    };

    text.addEventListener("click", explode);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="screen" ref={screenRef}>
      <div className="logo" />
      <div className="noise" />
      <div className="vignette" />

      <div className="center">
        <h1 className="main-text">HELLO 👋</h1>
        <div className="pieces" ref={piecesRef} />
        <p className="hint">
          CLICK / ESC → EXPLODE · T → TIME · ↑↑↓↓ → GOD · B → BSOD
        </p>
      </div>

      <div className="bsod">
        <h2>:(</h2>
        <p>YOUR UI RAN INTO A PROBLEM AND NEEDS TO RESTART.</p>
        <small>ERROR_CODE: REALITY_OVERFLOW</small>
      </div>

      <style>{`
        body {
          margin: 0;
          background: black;
          overflow: hidden;
          cursor: crosshair;
        }

        .screen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #020617, black);
          font-family: system-ui;
          position: relative;
          transition: filter 0.2s;
        }

        /* GOD MODE */
        .godmode {
          animation: god 0.4s infinite;
        }

        @keyframes god {
          50% { filter: hue-rotate(90deg) saturate(2); }
        }

        /* BSOD */
        .bsod {
          position: absolute;
          inset: 0;
          background: #0050ef;
          color: white;
          padding: 80px;
          display: none;
          z-index: 99;
          font-family: monospace;
        }

        .bsod h2 {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .bsod p {
          font-size: 20px;
        }

        .bsod small {
          opacity: 0.7;
        }

        .bsod ~ * {
          pointer-events: none;
        }

        .screen.bsod .bsod {
          display: block;
        }

        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 360px;
          opacity: 0.04;
          animation: spin 20s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg) scale(1.2); }
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

        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          10% { transform: translate(-6px, 4px); }
          20% { transform: translate(6px, -4px); }
          30% { transform: translate(-4px, -6px); }
          40% { transform: translate(4px, 6px); }
        }

        .flash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0.9;
          animation: flash 0.15s forwards;
          z-index: 20;
        }

        @keyframes flash {
          to { opacity: 0; }
        }

        .desync {
          filter: hue-rotate(40deg);
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

        .hint {
          margin-top: 14px;
          font-size: 11px;
          letter-spacing: 3px;
          color: #94a3b8;
          animation: blink 1.4s infinite;
        }

        @keyframes blink {
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

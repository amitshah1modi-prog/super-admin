import { useEffect } from "react";
import bgImage from "../assets/report-bg.png";

function Hello() {
  useEffect(() => {
    const aura = document.getElementById("aura");

    const move = (e) => {
      aura.style.left = e.clientX + "px";
      aura.style.top = e.clientY + "px";
    };

    const click = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div className="hell">
      <div className="noise" />
      <div className="vignette" />
      <div className="logo" />
      <div id="aura" />

      <h1 className="hello glitch">
        HELLO 👋
        <span>HELLO 👋</span>
        <span>HELLO 👋</span>
      </h1>

      <p className="subtitle">SYSTEM OVERLOAD ⚠️</p>

      <style>{`
        body {
          margin: 0;
          background: black;
          cursor: crosshair;
        }

        .hell {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #020617, #1e1b4b, #020617);
          background-size: 300% 300%;
          animation: bg 6s infinite alternate;
          position: relative;
        }

        @keyframes bg {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
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
          pointer-events: none;
          animation: noise 0.15s infinite;
        }

        @keyframes noise {
          0% { transform: translate(0,0); }
          50% { transform: translate(-1px,1px); }
          100% { transform: translate(1px,-1px); }
        }

        /* VIGNETTE */
        .vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 200px black;
          pointer-events: none;
        }

        /* FLOATING LOGO */
        .logo {
          position: absolute;
          inset: 0;
          background: url(${bgImage}) center no-repeat;
          background-size: 380px;
          opacity: 0.05;
          animation: logoSpin 14s linear infinite;
        }

        @keyframes logoSpin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.15); }
        }

        /* MOUSE AURA */
        #aura {
          position: fixed;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, #22d3ee, transparent 70%);
          filter: blur(40px);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9;
          mix-blend-mode: screen;
        }

        /* CLICK RIPPLE */
        .ripple {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #22d3ee;
          transform: translate(-50%, -50%);
          animation: ripple 0.6s ease-out forwards;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }

        /* GLITCH TEXT */
        .hello {
          font-size: 96px;
          font-weight: 900;
          color: white;
          position: relative;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.2s infinite;
          z-index: 2;
        }

        .hello span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        .hello span:nth-child(1) {
          color: red;
          clip-path: inset(0 0 60% 0);
          animation: glitch1 0.8s infinite;
        }

        .hello span:nth-child(2) {
          color: cyan;
          clip-path: inset(60% 0 0 0);
          animation: glitch2 1s infinite;
        }

        @keyframes glitch1 {
          50% { transform: translate(-4px, -4px); }
        }

        @keyframes glitch2 {
          50% { transform: translate(4px, 4px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }

        .subtitle {
          margin-top: 12px;
          font-size: 18px;
          letter-spacing: 4px;
          color: #e879f9;
          animation: flicker 1.1s infinite;
          z-index: 2;
        }

        @keyframes flicker {
          0%,100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

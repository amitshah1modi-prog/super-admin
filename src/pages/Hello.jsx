import bgImage from "../assets/report-bg.png";

function Hello() {
  return (
    <div className="hell-page">
      <div className="noise" />
      <div className="logo" />

      <div className="text-wrap">
        <h1 className="hello glitch">
          HELLO 👋
          <span aria-hidden>HELLO 👋</span>
          <span aria-hidden>HELLO 👋</span>
        </h1>

        <p className="subtitle">
          THIS PAGE IS NOT STABLE ⚠️
        </p>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .hell-page {
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(
            120deg,
            #020617,
            #1e1b4b,
            #020617
          );
          background-size: 400% 400%;
          animation: bg 8s infinite alternate;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @keyframes bg {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* SCREEN NOISE */
        .noise {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.03),
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          mix-blend-mode: overlay;
          animation: noiseMove 0.2s infinite;
          pointer-events: none;
        }

        @keyframes noiseMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(-2px,2px); }
          100% { transform: translate(2px,-2px); }
        }

        /* FLOATING LOGO */
        .logo {
          position: absolute;
          inset: 0;
          background-image: url(${bgImage});
          background-repeat: no-repeat;
          background-position: center;
          background-size: 380px;
          opacity: 0.06;
          animation: logoWave 12s ease-in-out infinite;
        }

        @keyframes logoWave {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.12) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .text-wrap {
          z-index: 2;
          text-align: center;
          animation: screenShake 4s infinite;
        }

        @keyframes screenShake {
          0%, 100% { transform: translate(0); }
          92% { transform: translate(0); }
          93% { transform: translate(-6px, 4px); }
          94% { transform: translate(6px, -4px); }
          95% { transform: translate(-4px, 6px); }
          96% { transform: translate(4px, -6px); }
        }

        /* GLITCH TEXT */
        .hello {
          font-size: 96px;
          font-weight: 900;
          color: #22d3ee;
          position: relative;
          text-shadow:
            0 0 15px #22d3ee,
            0 0 40px #818cf8,
            0 0 80px #f472b6;
          animation: pulse 1.5s infinite;
        }

        .hello span {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
        }

        .hello span:nth-child(1) {
          color: #f43f5e;
          clip-path: inset(0 0 60% 0);
          animation: glitchTop 1s infinite;
        }

        .hello span:nth-child(2) {
          color: #22d3ee;
          clip-path: inset(60% 0 0 0);
          animation: glitchBottom 1.2s infinite;
        }

        @keyframes glitchTop {
          0% { transform: translate(0); }
          50% { transform: translate(-4px, -4px); }
          100% { transform: translate(0); }
        }

        @keyframes glitchBottom {
          0% { transform: translate(0); }
          50% { transform: translate(4px, 4px); }
          100% { transform: translate(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .subtitle {
          margin-top: 14px;
          font-size: 18px;
          letter-spacing: 4px;
          color: #e879f9;
          animation: flicker 1.3s infinite;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

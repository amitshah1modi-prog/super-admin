import bgImage from "../assets/report-bg.png";

function Hello() {
  return (
    <div className="crazy-page">
      <div className="bg-logo" />

      <h1 className="crazy-text">
        HELLO 👋
      </h1>

      <p className="crazy-sub">
        WHAT THE F*CK IS THIS PAGE 😈
      </p>

      <style>{`
        .crazy-page {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            270deg,
            #020617,
            #0f172a,
            #020617
          );
          background-size: 600% 600%;
          animation: bgMove 10s ease infinite;
          position: relative;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-logo {
          position: absolute;
          inset: 0;
          background-image: url(${bgImage});
          background-repeat: no-repeat;
          background-position: center;
          background-size: 420px;
          opacity: 0.08;
          animation: spinFloat 20s linear infinite;
        }

        @keyframes spinFloat {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .crazy-text {
          font-size: 96px;
          font-weight: 900;
          color: #22d3ee;
          text-shadow:
            0 0 10px #22d3ee,
            0 0 30px #818cf8,
            0 0 60px #f472b6;
          animation: shake 1.2s infinite alternate,
                     pulse 2s infinite;
          z-index: 1;
        }

        @keyframes shake {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-4px) rotate(-2deg); }
          50% { transform: translateX(4px) rotate(2deg); }
          75% { transform: translateX(-4px) rotate(-1deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .crazy-sub {
          margin-top: 12px;
          font-size: 18px;
          color: #94a3b8;
          letter-spacing: 3px;
          text-transform: uppercase;
          animation: blink 1.5s infinite;
          z-index: 1;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default Hello;

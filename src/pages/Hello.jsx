import bgImage from "../assets/report-bg.png";
import { useEffect, useState } from "react";

function Hello() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      {/* BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* FLOATING ORBS */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.orb3} />

      {/* CONTENT */}
      <div style={styles.centerWrap}>
        <div
          style={{
            ...styles.helloText,
            ...(glitch ? styles.glitch : {}),
          }}
        >
          HELLO 👋
        </div>

        <div style={styles.subText}>
          welcome to chaos ⚡
        </div>

        <button style={styles.button}>
          ENTER 🚀
        </button>
      </div>
    </div>
  );
}

const glow = "0 0 40px rgba(99,102,241,0.8)";

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background:
      "radial-gradient(circle at top, #020617, #000000 70%)",
    fontFamily: "'Inter', system-ui",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "420px",
    opacity: 0.08,
    filter: "blur(1px)",
    zIndex: 0,
  },

  centerWrap: {
    position: "relative",
    zIndex: 2,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  helloText: {
    fontSize: "84px",
    fontWeight: "900",
    letterSpacing: "4px",
    background:
      "linear-gradient(90deg, #22d3ee, #818cf8, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: glow,
    animation: "pulse 2s infinite",
    transition: "transform 0.2s",
  },

  glitch: {
    transform: "skewX(-8deg) translateX(6px)",
    textShadow:
      "2px 0 red, -2px 0 cyan, 0 0 30px rgba(255,255,255,0.8)",
  },

  subText: {
    marginTop: "14px",
    fontSize: "18px",
    color: "#94a3b8",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },

  button: {
    marginTop: "40px",
    padding: "16px 44px",
    fontSize: "18px",
    fontWeight: "700",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    color: "#020617",
    background:
      "linear-gradient(90deg, #22d3ee, #818cf8)",
    boxShadow: "0 0 30px rgba(129,140,248,0.8)",
    transition: "all 0.25s ease",
  },

  orb1: {
    position: "absolute",
    width: "260px",
    height: "260px",
    background: "radial-gradient(circle, #22d3ee, transparent 70%)",
    top: "10%",
    left: "5%",
    filter: "blur(40px)",
    animation: "float 6s ease-in-out infinite",
  },

  orb2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background: "radial-gradient(circle, #818cf8, transparent 70%)",
    bottom: "15%",
    right: "10%",
    filter: "blur(60px)",
    animation: "float 8s ease-in-out infinite reverse",
  },

  orb3: {
    position: "absolute",
    width: "180px",
    height: "180px",
    background: "radial-gradient(circle, #f472b6, transparent 70%)",
    top: "50%",
    right: "30%",
    filter: "blur(50px)",
    animation: "float 7s ease-in-out infinite",
  },
};

export default Hello;

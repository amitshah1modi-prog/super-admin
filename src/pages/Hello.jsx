import reportBg from "../assets/report-bg.png";

function Hello() {
  return (
    <div style={styles.page}>
      {/* 🔹 BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* 🔹 CONTENT */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h1 style={styles.text}>HELLO 👋</h1>
          <p style={styles.subText}>Welcome to the Super Admin Panel</p>
        </div>
      </div>
    </div>
  );
}

export default Hello;

/* ================= STYLES ================= */

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "#f8fafc",
    overflow: "hidden",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  /* 🔹 Background image like other pages */
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${reportBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "420px", // 👈 controlled size
    opacity: 0.08, // 👈 visible but subtle
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    background: "rgba(255,255,255,0.85)",
    padding: "60px 80px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  text: {
    fontSize: "64px",
    fontWeight: "900",
    margin: 0,
    color: "#0f172a",
  },

  subText: {
    marginTop: "12px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#64748b",
  },
};

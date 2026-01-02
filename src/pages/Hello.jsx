import bgImage from "../assets/report-bg.png";

function Hello() {
  return (
    <div style={styles.page}>
      {/* BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* CONTENT */}
      <div style={styles.content}>
        HELLO 👋
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "#f8fafc",
    overflow: "hidden",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "420px", // 👈 controlled size (not full cover)
    opacity: 0.12,           // 👈 visible but very subtle
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    fontSize: "64px",
    fontWeight: "800",
    textAlign: "center",
    marginTop: "100px",
    color: "#0f172a",
  },
};

export default Hello;

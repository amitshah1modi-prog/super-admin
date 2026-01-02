import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function AgentHistoryPage() {
  const { adminId, agentId } = useParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (adminId && agentId && selectedDate) {
      fetchHistoryByDate();
    }
  }, [adminId, agentId, selectedDate]);

  async function fetchHistoryByDate() {
    setLoading(true);

    const { data, error } = await supabase
      .from("agent_details")
      .select("*")
      .eq("admin_id", adminId)
      .eq("agent_id", agentId)
      .eq("date", selectedDate)
      .order("login_time", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      setRows([]);
    } else {
      setRows(data || []);
    }

    setLoading(false);
  }

  const cardStyle = (bg) => ({
    background: bg,
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  });

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const valueStyle = {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
  };

  return (
    <div style={styles.page}>
      {/* BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* CONTENT */}
      <div style={styles.content}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>

        {/* HEADER */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={styles.title}>
            Agent <span style={{ color: "#2563eb" }}>{agentId}</span>
          </h2>
          <p style={styles.subtitle}>Admin ID: {adminId}</p>
        </div>

        {/* STATES */}
        {loading && <p>Loading agent data...</p>}
        {!loading && selectedDate && rows.length === 0 && (
          <p>No records found for selected date</p>
        )}

        {/* DATA CARDS */}
        {!loading && rows.length > 0 && (
          <div style={styles.grid}>
            <div style={cardStyle("#e0f2fe")}>
              <div style={labelStyle}>Login Time</div>
              <div style={valueStyle}>{rows[0].login_time || "—"}</div>
            </div>

            <div style={cardStyle("#ede9fe")}>
              <div style={labelStyle}>Logout Time</div>
              <div style={valueStyle}>{rows[0].logout_time || "—"}</div>
            </div>

            <div style={cardStyle("#dcfce7")}>
              <div style={labelStyle}>Call Time</div>
              <div style={valueStyle}>{rows[0].call_time || 0}</div>
            </div>

            <div style={cardStyle("#fff7ed")}>
              <div style={labelStyle}>Break Time</div>
              <div style={valueStyle}>{rows[0].break_time || 0}</div>
            </div>

            <div style={cardStyle("#f0fdf4")}>
              <div style={labelStyle}>Normal Orders</div>
              <div style={valueStyle}>{rows[0].normal_order || 0}</div>
            </div>

            <div style={cardStyle("#faf5ff")}>
              <div style={labelStyle}>Scheduled Orders</div>
              <div style={valueStyle}>{rows[0].schedule_order || 0}</div>
            </div>

            <div style={cardStyle("#eef2ff")}>
              <div style={labelStyle}>Assigned Orders</div>
              <div style={valueStyle}>{rows[0].assign_orderr || 0}</div>
            </div>

            <div style={cardStyle("#ffe4e6")}>
              <div style={labelStyle}>App Intent</div>
              <div style={valueStyle}>{rows[0].app_intent || 0}</div>
            </div>

            <div style={cardStyle("#f1f5f9")}>
              <div style={labelStyle}>Employee Cancel</div>
              <div style={valueStyle}>{rows[0].employee_cancel || 0}</div>
            </div>

            <div style={cardStyle("#fee2e2")}>
              <div style={labelStyle}>Customer Cancel</div>
              <div style={valueStyle}>{rows[0].customer_cancel || 0}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentHistoryPage;

/* ================= STYLES ================= */

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
    backgroundImage: "url('/assets/report-bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "600px",
    opacity: 0.08,
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "32px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },

  backBtn: {
    background: "#e2e8f0",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  dateInput: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800",
    color: "#020617",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
    fontWeight: "500",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
};

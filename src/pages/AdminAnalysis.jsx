import { useState } from "react";
import { supabase } from "../lib/supabase";
import bgImage from "../assets/report-bg.png";

function AdminAnalysis() {
  const [adminId, setAdminId] = useState("");
  const [date, setDate] = useState("");
  const [adminResult, setAdminResult] = useState(null);
  const [agentTotals, setAgentTotals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!adminId || !date) {
      alert("Admin ID and Date both required");
      return;
    }

    setLoading(true);
    setError("");
    setAdminResult(null);
    setAgentTotals(null);

    /* 🔹 ADMIN DETAILS */
    const { data: adminData, error: adminError } = await supabase
      .from("admin_details")
      .select("login_time, logout_time")
      .eq("admin_id", adminId)
      .eq("date", date)
      .order("login_time", { ascending: false })
      .limit(1);

    if (adminError || !adminData?.length) {
      setError("No admin record found");
      setLoading(false);
      return;
    }

    setAdminResult(adminData[0]);

    /* 🔹 AGENT TOTALS */
    const { data: agentData, error: agentError } = await supabase
      .from("agent_details")
      .select(`
        normal_order,
        schedule_order,
        assign_orderr,
        app_intent,
        employee_cancel,
        customer_cancel
      `)
      .eq("admin_id", adminId)
      .eq("date", date);

    if (agentError) {
      setError("Error fetching agent data");
      setLoading(false);
      return;
    }

    const totals = {
      normal_order: 0,
      schedule_order: 0,
      assign_orderr: 0,
      app_intent: 0,
      employee_cancel: 0,
      customer_cancel: 0,
    };

    agentData.forEach((r) => {
      totals.normal_order += r.normal_order || 0;
      totals.schedule_order += r.schedule_order || 0;
      totals.assign_orderr += r.assign_orderr || 0;
      totals.app_intent += r.app_intent || 0;
      totals.employee_cancel += r.employee_cancel || 0;
      totals.customer_cancel += r.customer_cancel || 0;
    });

    setAgentTotals(totals);
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      {/* 🔹 BACKGROUND IMAGE */}
      <div style={styles.bgLayer} />

      {/* 🔹 CONTENT */}
      <div style={styles.content}>
        <h1 style={styles.title}>Admin Analysis</h1>

        {/* SEARCH BAR */}
        <div style={styles.searchBar}>
          <input
            placeholder="Enter Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleSearch} style={styles.searchBtn}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* RESULT CARDS */}
        {(adminResult || agentTotals) && (
          <div style={styles.grid}>
            {adminResult && (
              <>
                <Card label="Login Time" value={adminResult.login_time} color="#DBEAFE" />
                <Card label="Logout Time" value={adminResult.logout_time} color="#EDE9FE" />
              </>
            )}

            {agentTotals && (
              <>
                <Card label="Normal Orders" value={agentTotals.normal_order} color="#DCFCE7" />
                <Card label="Scheduled Orders" value={agentTotals.schedule_order} color="#FAE8FF" />
                <Card label="Assigned Orders" value={agentTotals.assign_orderr} color="#E0E7FF" />
                <Card label="App Intent" value={agentTotals.app_intent} color="#FFE4E6" />
                <Card label="Employee Cancel" value={agentTotals.employee_cancel} color="#F1F5F9" />
                <Card label="Customer Cancel" value={agentTotals.customer_cancel} color="#FEE2E2" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔹 CARD */
function Card({ label, value, color }) {
  return (
    <div style={{ ...styles.card, background: color }}>
      <span style={styles.cardLabel}>{label}</span>
      <span style={styles.cardValue}>{value ?? "—"}</span>
    </div>
  );
}

/* 🔹 STYLES */
const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "#f8fafc",
    overflow: "hidden",
  },

  bgLayer: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "600px", // 🔥 image center + bigger
    opacity: 0.08, // 🔥 slightly more visible
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "30px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "24px",
    color: "#0f172a",
  },

  searchBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    background: "#ffffff",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    alignItems: "center",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    minWidth: "200px",
  },

  searchBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    color: "#dc2626",
    marginBottom: "20px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  cardLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
  },
};

export default AdminAnalysis;

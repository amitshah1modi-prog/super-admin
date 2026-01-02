import { useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
import reportBg from "../assets/report-bg.png";

function AdminReport() {
  const [adminId, setAdminId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!adminId || !fromDate || !toDate) {
      alert("Admin ID and date range required");
      return;
    }

    setLoading(true);
    setError("");
    setRows([]);

    const { data: adminData, error: adminError } = await supabase
      .from("admin_details")
      .select("date, login_time, logout_time")
      .eq("admin_id", adminId)
      .gte("date", fromDate)
      .lte("date", toDate)
      .order("date", { ascending: true });

    if (adminError) {
      setError("Error fetching admin details");
      setLoading(false);
      return;
    }

    const { data: agentData } = await supabase
      .from("agent_details")
      .select(`
        date,
        normal_order,
        schedule_order,
        assign_orderr,
        app_intent,
        employee_cancel,
        customer_cancel
      `)
      .eq("admin_id", adminId)
      .gte("date", fromDate)
      .lte("date", toDate);

    const merged = adminData.map((adminRow) => {
      const sameDateAgents = agentData.filter(
        (a) => a.date === adminRow.date
      );

      const sum = (key) =>
        sameDateAgents.reduce((t, r) => t + (r[key] || 0), 0);

      return {
        Date: adminRow.date,
        "Login Time": adminRow.login_time,
        "Logout Time": adminRow.logout_time,
        "Normal Orders": sum("normal_order"),
        "Scheduled Orders": sum("schedule_order"),
        "Assigned Orders": sum("assign_orderr"),
        "App Intent": sum("app_intent"),
        "Employee Cancel": sum("employee_cancel"),
        "Customer Cancel": sum("customer_cancel"),
      };
    });

    setRows(merged);
    setLoading(false);
  }

  function downloadExcel() {
    if (!rows.length) return;

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admin Report");

    XLSX.writeFile(
      wb,
      `admin_report_${adminId}_${fromDate}_to_${toDate}.xlsx`
    );
  }

  return (
    <div style={styles.page}>
      {/* 🔥 BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* CONTENT */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Admin Report</h1>

        <div style={styles.filterCard}>
          <input
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleSearch} style={styles.primaryBtn}>
            {loading ? "Searching..." : "Search"}
          </button>

          {rows.length > 0 && (
            <button onClick={downloadExcel} style={styles.secondaryBtn}>
              ⬇ Download Excel
            </button>
          )}
        </div>

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background: "#f8fafc",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${reportBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "600px", // 👈 controlled size
    opacity: 0.12, // 👈 visible but subtle
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "30px",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#0f172a",
  },

  filterCard: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },

  input: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
  },

  primaryBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "#16a34a",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    marginTop: "16px",
    color: "#b91c1c",
    background: "#fee2e2",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
  },
};

export default AdminReport;

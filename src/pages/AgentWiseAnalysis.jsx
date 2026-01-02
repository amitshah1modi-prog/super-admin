import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import reportBg from "../assets/report-bg.png"; // ✅ IMPORT IMAGE

function AgentWiseAnalysis() {
  const [admins, setAdmins] = useState([]);
  const [agents, setAgents] = useState([]);

  const [adminId, setAdminId] = useState("");
  const [agentId, setAgentId] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 1️⃣ Load admins */
  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    const { data } = await supabase.from("admins").select("admin_id");
    setAdmins(data || []);
  }

  /* 2️⃣ Load agents when admin changes */
  useEffect(() => {
    if (adminId) fetchAgents();
    else setAgents([]);
  }, [adminId]);

  async function fetchAgents() {
    const { data } = await supabase
      .from("agents")
      .select("agent_id")
      .eq("admin_id", adminId);

    setAgents(data || []);
  }

  /* 3️⃣ Search */
  async function handleSearch() {
    if (!adminId || !agentId || !fromDate || !toDate) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    setRows([]);

    const { data, error } = await supabase
      .from("agent_details")
      .select(`
        date,
        login_time,
        logout_time,
        call_time,
        break_time,
        normal_order,
        schedule_order,
        assign_orderr,
        app_intent,
        employee_cancel,
        customer_cancel
      `)
      .eq("admin_id", adminId)
      .eq("agent_id", agentId)
      .gte("date", fromDate)
      .lte("date", toDate)
      .order("date", { ascending: true });

    if (error) {
      setError("Failed to fetch data");
    } else {
      setRows(data || []);
    }

    setLoading(false);
  }

  /* 4️⃣ Download Excel */
  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Analysis");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      file,
      `agent_analysis_${adminId}_${agentId}_${fromDate}_to_${toDate}.xlsx`
    );
  }

  return (
    <div style={styles.page}>
      {/* 🔥 BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* 🔹 CONTENT */}
      <div style={styles.content}>
        <h1 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "20px" }}>
          Agent Wise Analysis
        </h1>

        {/* FILTER CARD */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "25px",
          }}
        >
          <select value={adminId} onChange={(e) => setAdminId(e.target.value)} style={inputStyle}>
            <option value="">Select Admin</option>
            {admins.map((a) => (
              <option key={a.admin_id} value={a.admin_id}>
                {a.admin_id}
              </option>
            ))}
          </select>

          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            disabled={!adminId}
            style={{
              ...inputStyle,
              backgroundColor: adminId ? "#fff" : "#f1f5f9",
            }}
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a.agent_id} value={a.agent_id}>
                {a.agent_id}
              </option>
            ))}
          </select>

          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={inputStyle} />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={inputStyle} />

          <button onClick={handleSearch} style={styles.primaryBtn}>
            {loading ? "Searching..." : "Search"}
          </button>

          {rows.length > 0 && (
            <button onClick={downloadExcel} style={styles.secondaryBtn}>
              Download Excel
            </button>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* TABLE */}
        {rows.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead style={{ background: "#0f172a", color: "white" }}>
                <tr>
                  {[
                    "Date","Login","Logout","Call","Break",
                    "Normal","Schedule","Assign","App Intent","Emp Cancel","Cust Cancel"
                  ].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={cell}>{r.date}</td>
                    <td style={cell}>{r.login_time}</td>
                    <td style={cell}>{r.logout_time}</td>
                    <td style={cell}>{r.call_time}</td>
                    <td style={cell}>{r.break_time}</td>
                    <td style={cell}>{r.normal_order}</td>
                    <td style={cell}>{r.schedule_order}</td>
                    <td style={cell}>{r.assign_orderr}</td>
                    <td style={cell}>{r.app_intent}</td>
                    <td style={cell}>{r.employee_cancel}</td>
                    <td style={cell}>{r.customer_cancel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && rows.length === 0 && <p>No data found</p>}
      </div>
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
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${reportBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "55%",   // ✅ CENTERED & FIT
    opacity: 0.12,           // ✅ VISIBLE BUT SOFT
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: "30px",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    height: "44px",
  },
  secondaryBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    height: "44px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },
  th: {
    padding: "12px",
    fontSize: "13px",
    textAlign: "left",
  },
};

const inputStyle = {
  height: "44px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  padding: "0 12px",
  fontSize: "14px",
};

const cell = {
  padding: "10px 12px",
  fontSize: "13px",
};

export default AgentWiseAnalysis;

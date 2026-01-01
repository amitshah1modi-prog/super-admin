import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
    <div style={{ padding: "30px", maxWidth: "1400px" }}>
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
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select value={adminId} onChange={(e) => setAdminId(e.target.value)}>
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
        >
          <option value="">Select Agent</option>
          {agents.map((a) => (
            <option key={a.agent_id} value={a.agent_id}>
              {a.agent_id}
            </option>
          ))}
        </select>

        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <button
          onClick={handleSearch}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {rows.length > 0 && (
          <button
            onClick={downloadExcel}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Download Excel
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {/* TABLE */}
      {rows.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                {[
                  "Date",
                  "Login",
                  "Logout",
                  "Call",
                  "Break",
                  "Normal",
                  "Schedule",
                  "Assign",
                  "App Intent",
                  "Emp Cancel",
                  "Cust Cancel",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "700",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    background: i % 2 === 0 ? "#ffffff" : "#f9fafb",
                  }}
                >
                  <td style={{ padding: "10px" }}>{r.date}</td>
                  <td style={{ padding: "10px" }}>{r.login_time}</td>
                  <td style={{ padding: "10px" }}>{r.logout_time}</td>
                  <td style={{ padding: "10px" }}>{r.call_time}</td>
                  <td style={{ padding: "10px" }}>{r.break_time}</td>
                  <td style={{ padding: "10px" }}>{r.normal_order}</td>
                  <td style={{ padding: "10px" }}>{r.schedule_order}</td>
                  <td style={{ padding: "10px" }}>{r.assign_orderr}</td>
                  <td style={{ padding: "10px" }}>{r.app_intent}</td>
                  <td style={{ padding: "10px" }}>{r.employee_cancel}</td>
                  <td style={{ padding: "10px" }}>{r.customer_cancel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && rows.length === 0 && (
        <p style={{ marginTop: "20px", color: "#64748b" }}>
          No data found
        </p>
      )}
    </div>
  );
}

export default AgentWiseAnalysis;

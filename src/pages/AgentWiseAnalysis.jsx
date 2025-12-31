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

  /* 4️⃣ DOWNLOAD EXCEL */
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
    <div style={{ padding: "30px" }}>
      <h1>Agent Wise Analysis</h1>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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

        <button onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>

        {/* DOWNLOAD BUTTON */}
        {rows.length > 0 && (
          <button
            onClick={downloadExcel}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            Download Excel
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      {rows.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{ marginTop: "20px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
              <th>Call</th>
              <th>Break</th>
              <th>Normal</th>
              <th>Schedule</th>
              <th>Assign</th>
              <th>App Intent</th>
              <th>Emp Cancel</th>
              <th>Cust Cancel</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.login_time}</td>
                <td>{r.logout_time}</td>
                <td>{r.call_time}</td>
                <td>{r.break_time}</td>
                <td>{r.normal_order}</td>
                <td>{r.schedule_order}</td>
                <td>{r.assign_orderr}</td>
                <td>{r.app_intent}</td>
                <td>{r.employee_cancel}</td>
                <td>{r.customer_cancel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && rows.length === 0 && <p>No data found</p>}
    </div>
  );
}

export default AgentWiseAnalysis;

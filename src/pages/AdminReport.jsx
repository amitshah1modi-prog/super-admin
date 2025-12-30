import { useState } from "react";
import { supabase } from "../lib/supabase";

function AdminReport() {
  const [adminId, setAdminId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!adminId || !fromDate || !toDate) {
      alert("Admin ID and Date Range required");
      return;
    }

    setLoading(true);
    setError("");
    setRows([]);

    try {
      /* 1️⃣ Fetch admin login/logout data */
      const { data: adminData, error: adminError } = await supabase
        .from("admin_details")
        .select("date, login_time, logout_time")
        .eq("admin_id", adminId)
        .gte("date", fromDate)
        .lte("date", toDate)
        .order("date");

      if (adminError) throw adminError;

      if (!adminData || adminData.length === 0) {
        setError("No records found");
        setLoading(false);
        return;
      }

      /* 2️⃣ For each date → fetch agent totals */
      const finalRows = [];

      for (const row of adminData) {
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
          .eq("date", row.date);

        if (agentError) throw agentError;

        const totals = {
          normal_order: 0,
          schedule_order: 0,
          assign_orderr: 0,
          app_intent: 0,
          employee_cancel: 0,
          customer_cancel: 0,
        };

        agentData.forEach((a) => {
          totals.normal_order += a.normal_order || 0;
          totals.schedule_order += a.schedule_order || 0;
          totals.assign_orderr += a.assign_orderr || 0;
          totals.app_intent += a.app_intent || 0;
          totals.employee_cancel += a.employee_cancel || 0;
          totals.customer_cancel += a.customer_cancel || 0;
        });

        finalRows.push({
          date: row.date,
          login_time: row.login_time,
          logout_time: row.logout_time,
          ...totals,
        });
      }

      setRows(finalRows);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Report</h1>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: "6px 14px",
            background: loading ? "#94a3b8" : "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LOADING ANIMATION */}
      {loading && (
        <div style={{ marginTop: "20px", fontWeight: "600" }}>
          🔄 Fetching report data...
        </div>
      )}

      {/* TABLE */}
      {!loading && rows.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <thead style={{ background: "#e2e8f0" }}>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
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
    </div>
  );
}

export default AdminReport;

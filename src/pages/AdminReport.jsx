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
      alert("Admin ID and date range required");
      return;
    }

    setLoading(true);
    setError("");
    setRows([]);

    /* 1️⃣ ADMIN DETAILS (date wise) */
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

    /* 2️⃣ AGENT DETAILS (group by date & SUM) */
    const { data: agentData, error: agentError } = await supabase
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

    if (agentError) {
      setError("Error fetching agent details");
      setLoading(false);
      return;
    }

    /* 3️⃣ MERGE BOTH DATA BY DATE */
    const merged = adminData.map((adminRow) => {
      const sameDateAgents = agentData.filter(
        (a) => a.date === adminRow.date
      );

      const sum = (key) =>
        sameDateAgents.reduce((t, r) => t + (r[key] || 0), 0);

      return {
        date: adminRow.date,
        login_time: adminRow.login_time,
        logout_time: adminRow.logout_time,
        normal_order: sum("normal_order"),
        schedule_order: sum("schedule_order"),
        assign_orderr: sum("assign_orderr"),
        app_intent: sum("app_intent"),
        employee_cancel: sum("employee_cancel"),
        customer_cancel: sum("customer_cancel"),
      };
    });

    setRows(merged);
    setLoading(false);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Report</h1>

      {/* FILTER BAR */}
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

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      {rows.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
              <th>Normal</th>
              <th>Scheduled</th>
              <th>Assigned</th>
              <th>App Intent</th>
              <th>Emp Cancel</th>
              <th>Cust Cancel</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.date}>
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

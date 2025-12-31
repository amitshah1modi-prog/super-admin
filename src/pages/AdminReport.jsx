import { useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";

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

    /* 1️⃣ ADMIN DETAILS */
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

    /* 2️⃣ AGENT DETAILS */
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

    /* 3️⃣ MERGE DATA DATE-WISE */
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

  /* ⬇️ XLSX DOWNLOAD */
  function downloadExcel() {
    if (!rows.length) return;

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Report");

    XLSX.writeFile(
      workbook,
      `admin_report_${adminId}_${fromDate}_to_${toDate}.xlsx`
    );
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

        <button onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>

        {rows.length > 0 && (
          <button
            onClick={downloadExcel}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Download Excel
          </button>
        )}
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
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.Date}</td>
                <td>{r["Login Time"]}</td>
                <td>{r["Logout Time"]}</td>
                <td>{r["Normal Orders"]}</td>
                <td>{r["Scheduled Orders"]}</td>
                <td>{r["Assigned Orders"]}</td>
                <td>{r["App Intent"]}</td>
                <td>{r["Employee Cancel"]}</td>
                <td>{r["Customer Cancel"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminReport;

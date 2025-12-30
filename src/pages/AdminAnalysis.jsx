import { useState } from "react";
import { supabase } from "../lib/supabase";

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

    /* 🔹 1. ADMIN DETAILS */
    const { data: adminData, error: adminError } = await supabase
      .from("admin_details")
      .select("login_time, logout_time")
      .eq("admin_id", adminId)
      .eq("date", date)
      .order("login_time", { ascending: false })
      .limit(1);

    if (adminError) {
      setError("Error fetching admin details");
      setLoading(false);
      return;
    }

    if (!adminData || adminData.length === 0) {
      setError("No admin record found");
      setLoading(false);
      return;
    }

    setAdminResult(adminData[0]);

    /* 🔹 2. AGENT TOTALS */
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

    // ✅ TOTAL CALCULATION
    const totals = {
      normal_order: 0,
      schedule_order: 0,
      assign_orderr: 0,
      app_intent: 0,
      employee_cancel: 0,
      customer_cancel: 0,
    };

    agentData.forEach((row) => {
      totals.normal_order += row.normal_order || 0;
      totals.schedule_order += row.schedule_order || 0;
      totals.assign_orderr += row.assign_orderr || 0;
      totals.app_intent += row.app_intent || 0;
      totals.employee_cancel += row.employee_cancel || 0;
      totals.customer_cancel += row.customer_cancel || 0;
    });

    setAgentTotals(totals);
    setLoading(false);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Analysis</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔹 ADMIN DETAILS */}
      {adminResult && (
        <div style={boxStyle}>
          <h3>Admin Session</h3>
          <p><b>Login:</b> {adminResult.login_time}</p>
          <p><b>Logout:</b> {adminResult.logout_time}</p>
        </div>
      )}

      {/* 🔹 AGENT TOTALS */}
      {agentTotals && (
        <div style={{ ...boxStyle, marginTop: "20px" }}>
          <h3>Agent Totals</h3>
          <p>Normal Orders: {agentTotals.normal_order}</p>
          <p>Scheduled Orders: {agentTotals.schedule_order}</p>
          <p>Assigned Orders: {agentTotals.assign_orderr}</p>
          <p>App Intent: {agentTotals.app_intent}</p>
          <p>Employee Cancel: {agentTotals.employee_cancel}</p>
          <p>Customer Cancel: {agentTotals.customer_cancel}</p>
        </div>
      )}
    </div>
  );
}

const boxStyle = {
  background: "#f1f5f9",
  padding: "20px",
  borderRadius: "8px",
  width: "350px",
};

export default AdminAnalysis;

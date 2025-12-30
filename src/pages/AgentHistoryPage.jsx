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
      .order("login_time", { ascending: false });

    if (error) {
      console.error("Agent history error:", error);
      setRows([]);
    } else {
      setRows(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>Agent: {agentId}</h2>
      <p>Admin: {adminId}</p>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {!loading && selectedDate && rows.length === 0 && (
        <p>No records found</p>
      )}

      {!loading && rows.length > 0 && (
        <pre>{JSON.stringify(rows[0], null, 2)}</pre>
      )}
    </div>
  );
}

export default AgentHistoryPage;

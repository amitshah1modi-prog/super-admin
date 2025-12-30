import { useState } from "react";
import { supabase } from "../lib/supabase";

function AdminAnalysis() {
  const [adminId, setAdminId] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!adminId || !date) {
      alert("Admin ID and Date both required");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const { data, error } = await supabase
      .from("admin_details")
      .select("login_time, logout_time")
      .eq("admin_id", adminId)
      .eq("date", date)
      .order("login_time", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      setError("Error fetching data");
    } else if (data.length === 0) {
      setError("No record found");
    } else {
      setResult(data[0]);
    }

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

      {result && (
        <div
          style={{
            background: "#f1f5f9",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
          }}
        >
          <p><b>Login Time:</b> {result.login_time}</p>
          <p><b>Logout Time:</b> {result.logout_time}</p>
        </div>
      )}
    </div>
  );
}

export default AdminAnalysis;

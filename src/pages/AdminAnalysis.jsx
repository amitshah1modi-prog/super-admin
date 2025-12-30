import { useState } from "react";
import { supabase } from "../lib/supabase";

function AdminAnalysis() {
  const [adminId, setAdminId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSearch() {
    if (!adminId || !date) {
      alert("Please enter Admin ID and Date");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    const { data, error } = await supabase
      .from("admin_details")
      .select("login_time, logout_time")
      .eq("admin_id", adminId)
      .eq("date", date)
      .limit(1);

    if (error) {
      console.error(error);
      setErrorMsg("Error fetching data");
    } else if (data.length === 0) {
      setErrorMsg("No record found for this Admin & Date");
    } else {
      setResult(data[0]);
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <h2>Admin Analysis</h2>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Admin ID"
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

      {/* RESULTS */}
      {loading && <p>Loading...</p>}

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {result && (
        <div className="result-box">
          <p><b>Login Time:</b> {result.login_time}</p>
          <p><b>Logout Time:</b> {result.logout_time}</p>
        </div>
      )}
    </div>
  );
}

export default AdminAnalysis;

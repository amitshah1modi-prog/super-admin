import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminList from "../components/AdminList";
import Loader from "../components/Loader";

function SuperAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    setLoading(true);

    const { data, error } = await supabase
      .from("admins")
      .select("admin_id, state");

    if (error) {
      console.error("Error fetching admins:", error);
    } else {
      setAdmins(data || []);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: "32px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Super Admin Dashboard
          </h1>
          <p
            style={{
              marginTop: "6px",
              color: "#64748b",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            View and manage all available admins and their current status
          </p>
        </div>

        <div
          style={{
            background: "#e0f2fe",
            color: "#0369a1",
            padding: "10px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Total Admins: {admins.length}
        </div>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        {/* TABLE HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Admin List
          </h2>

          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              background: "#f1f5f9",
              padding: "6px 12px",
              borderRadius: "8px",
            }}
          >
            Live Status
          </span>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div
            style={{
              padding: "40px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        ) : admins.length === 0 ? (
          <div
            style={{
              padding: "60px 0",
              textAlign: "center",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            No admins found in the system
          </div>
        ) : (
          <AdminList admins={admins} />
        )}
      </div>
    </div>
  );
}

export default SuperAdmin;

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminList from "../components/AdminList";
import Loader from "../components/Loader";
import bgImage from "../assets/report-bg.png"; // ✅ IMPORT IMAGE

function SuperAdmin() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();
    setFilteredAdmins(
      admins.filter((a) =>
        a.admin_id.toString().toLowerCase().includes(value)
      )
    );
  }, [search, admins]);

  async function fetchAdmins() {
    setLoading(true);

    const { data, error } = await supabase
      .from("admins")
      .select("admin_id, state");

    if (!error) {
      setAdmins(data || []);
      setFilteredAdmins(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>
      {/* 🔥 BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* 🔹 CONTENT */}
      <div style={styles.content}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Super Admin Dashboard</h1>
            <p style={styles.subtitle}>
              View and manage all available admins and their current status
            </p>
          </div>

          <div style={styles.countBadge}>
            Total Admins: {admins.length}
          </div>
        </div>

        {/* MAIN CARD */}
        <div style={styles.card}>
          {/* TOP BAR */}
          <div style={styles.topBar}>
            <h2 style={styles.cardTitle}>Admin List</h2>

            <input
              placeholder="Search Admin ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* CONTENT */}
          {loading ? (
            <div style={styles.loaderWrap}>
              <Loader />
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div style={styles.empty}>
              No admins match your search
            </div>
          ) : (
            <AdminList admins={filteredAdmins} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;

/* ================= STYLES ================= */

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "#f8fafc",
    overflow: "hidden",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "520px",   // ✅ controls size
    opacity: 0.08,             // ✅ visible but subtle
    zIndex: 0,
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "32px",
  },

  header: {
    marginBottom: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "6px",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  },

  countBadge: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "10px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
  },

  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "16px",
    flexWrap: "wrap",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
  },

  searchInput: {
    width: "260px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "14px",
    background: "#f8fafc",
  },

  loaderWrap: {
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
  },

  empty: {
    padding: "60px 0",
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px",
  },
};

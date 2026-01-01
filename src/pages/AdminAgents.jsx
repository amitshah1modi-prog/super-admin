import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";

function AdminAgents() {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("agents")
      .select("agent_id")
      .eq("admin_id", adminId);

    if (!error) setAgents(data || []);
    setLoading(false);
  }

  /* 🔍 FILTER AGENTS */
  const filteredAgents = agents.filter((a) =>
    a.agent_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* BACKGROUND IMAGE */}
      <div style={styles.bgImage} />

      {/* CONTENT */}
      <div style={styles.content}>
        {/* HEADER */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div>
            <h1 style={styles.title}>Admin Agents</h1>
            <p style={styles.subtitle}>Admin ID: {adminId}</p>
          </div>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search Agent ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        {/* BODY */}
        {loading ? (
          <Loader />
        ) : filteredAgents.length === 0 ? (
          <div style={styles.emptyBox}>No matching agents found</div>
        ) : (
          <div style={styles.cardGrid}>
            {filteredAgents.map((agent) => (
              <div
                key={agent.agent_id}
                style={styles.agentCard}
                onClick={() =>
                  navigate(`/admin/${adminId}/agent/${agent.agent_id}`)
                }
              >
                <div>
                  <p style={styles.agentLabel}>Agent ID</p>
                  <h3 style={styles.agentId}>{agent.agent_id}</h3>
                </div>

                <div style={styles.arrow}>→</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAgents;

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
    backgroundImage:
      "url('https://images.unsplash.com/photo-1556761175-129418cb2dfe')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.04,
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "30px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
  },

  backBtn: {
    background: "#e2e8f0",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  },

  /* 🔍 SEARCH */
  searchBox: {
    position: "relative",
    maxWidth: "360px",
    marginBottom: "30px",
  },

  searchInput: {
    width: "100%",
    padding: "12px 44px 12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  searchIcon: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "#64748b",
  },

  emptyBox: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    color: "#64748b",
    fontWeight: "600",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  agentCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
  },

  agentLabel: {
    margin: 0,
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#64748b",
    letterSpacing: "0.5px",
  },

  agentId: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
  },

  arrow: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#38bdf8",
  },
};

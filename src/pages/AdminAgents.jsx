import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";

function AdminAgents() {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
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

    if (error) {
      console.error("Error fetching agents:", error);
    } else {
      setAgents(data || []);
    }

    setLoading(false);
  }

  function goToAgentHistory(agentId) {
    navigate(`/admin/${adminId}/agent/${agentId}/history`);
  }

  return (
    <div className="container">
      <h2>Agents for Admin ID: {adminId}</h2>

      {loading ? (
        <Loader />
      ) : agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {agents.map((agent) => (
            <li
              key={agent.agent_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                marginBottom: "10px",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span style={{ fontWeight: "600" }}>
                Agent ID: {agent.agent_id}
              </span>

              {/* 👉 ARROW BUTTON */}
              <button
                onClick={() => goToAgentHistory(agent.agent_id)}
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  border: "none",
                  background: "transparent",
                }}
                title="View Agent History"
              >
                →
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAgents;

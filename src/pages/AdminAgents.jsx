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
      console.error(error);
    } else {
      setAgents(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h2>Agents for Admin: {adminId}</h2>

      {loading ? (
        <Loader />
      ) : agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li
              key={agent.agent_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/admin/${adminId}/agent/${agent.agent_id}`)
              }
            >
              <span>{agent.agent_id}</span>
              <span>➡️</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAgents;

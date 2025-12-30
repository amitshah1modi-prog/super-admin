import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";

function AdminAgents() {
  const { adminId } = useParams();
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
      setAgents(data);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h2>Agents for Admin ID: {adminId}</h2>

      {loading ? (
        <Loader />
      ) : agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent.agent_id}>{agent.agent_id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAgents;

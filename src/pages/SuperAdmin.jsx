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
      setAdmins(data);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Super Admin Panel</h1>

      {loading ? <Loader /> : <AdminList admins={admins} />}
    </div>
  );
}

export default SuperAdmin;

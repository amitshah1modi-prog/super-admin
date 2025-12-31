import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div
      style={{
        height: "60px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      <span>Super Admin Panel</span>

      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          border: "none",
          color: "white",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TopBar;

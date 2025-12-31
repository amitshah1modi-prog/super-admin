import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header
      style={{
        height: "64px",
        background: "linear-gradient(90deg, #020617, #020617)",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #0f172a",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "#38bdf8",
            color: "#020617",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          SA
        </div>

        <div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#f8fafc" }}>
            Super Admin Panel
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>
            Analytics & Monitoring
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        style={{
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          border: "none",
          color: "white",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "14px",
          boxShadow: "0 6px 14px rgba(239,68,68,0.35)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) =>
          (e.target.style.transform = "translateY(-1px)")
        }
        onMouseOut={(e) =>
          (e.target.style.transform = "translateY(0)")
        }
      >
        Logout
      </button>
    </header>
  );
}

export default TopBar;

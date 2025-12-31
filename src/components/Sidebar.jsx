import { NavLink } from "react-router-dom";

const linkBase = {
  padding: "12px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "all 0.2s ease",
};

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#020617",
        color: "#e5e7eb",
        padding: "20px 16px",
        height: "100vh",
        borderRight: "1px solid #0f172a",
        boxShadow: "4px 0 14px rgba(0,0,0,0.35)",
      }}
    >
      {/* BRAND */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "800",
            color: "#f8fafc",
            marginBottom: "4px",
          }}
        >
          Dashboard
        </div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>
          Admin Controls
        </div>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#0f172a" : "transparent",
            color: isActive ? "#38bdf8" : "#e5e7eb",
          })}
        >
          📊 Super Admin
        </NavLink>

        <NavLink
          to="/agent-analysis"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#0f172a" : "transparent",
            color: isActive ? "#38bdf8" : "#e5e7eb",
          })}
        >
          👤 Agent Wise Analysis
        </NavLink>

        <NavLink
          to="/analysis"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#0f172a" : "transparent",
            color: isActive ? "#38bdf8" : "#e5e7eb",
          })}
        >
          📈 Admin Analysis
        </NavLink>

        <NavLink
          to="/admin-report"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#0f172a" : "transparent",
            color: isActive ? "#38bdf8" : "#e5e7eb",
          })}
        >
          📄 Admin Report
        </NavLink>

        <NavLink
          to="/hello"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#0f172a" : "transparent",
            color: isActive ? "#38bdf8" : "#e5e7eb",
          })}
        >
          👋 Hello Page
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;

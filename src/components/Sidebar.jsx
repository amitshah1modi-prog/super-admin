import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    padding: "12px 16px",
    display: "block",
    textDecoration: "none",
    color: isActive ? "white" : "#cbd5e1",
    backgroundColor: isActive ? "#1e293b" : "transparent",
    fontWeight: "600"
  });

  return (
    <div style={{
      width: "220px",
      backgroundColor: "#020617",
      minHeight: "calc(100vh - 60px)"
    }}>
      <NavLink to="/" style={linkStyle}>
        Super Admin
      </NavLink>

      <NavLink to="/hello" style={linkStyle}>
        Hello Page
      </NavLink>
    </div>
  );
}

export default Sidebar;

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        color: "white",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Menu</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Super Admin
        </NavLink>

        <NavLink
          to="/hello"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Hello Page
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        color: "white",
        padding: "20px",
        height: "100vh",
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
  to="/agent-analysis"
  style={({ isActive }) => ({
    color: isActive ? "#38bdf8" : "white",
    textDecoration: "none",
  })}
>
  Agent Wise Analysis
</NavLink>


        

        <NavLink
          to="/analysis"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Admin Analysis
        </NavLink>

        <NavLink
  to="/admin-report"
  style={({ isActive }) => ({
    color: isActive ? "#38bdf8" : "white",
    textDecoration: "none",
  })}
>
  Admin Report
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

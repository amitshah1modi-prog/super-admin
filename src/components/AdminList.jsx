import { useNavigate } from "react-router-dom";

function AdminList({ admins }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        overflowX: "auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Admins Overview
        </h2>

        <span
          style={{
            fontSize: "14px",
            color: "#64748b",
            fontWeight: "500",
          }}
        >
          Total Admins: {admins.length}
        </span>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Admin ID</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => {
            const isActive = admin.state === "active";

            return (
              <tr
                key={admin.admin_id}
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                }}
              >
                {/* ADMIN ID */}
                <td style={tdStyle}>
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    {admin.admin_id}
                  </span>
                </td>

                {/* STATUS */}
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "700",
                      background: isActive ? "#dcfce7" : "#fee2e2",
                      color: isActive ? "#166534" : "#991b1b",
                    }}
                  >
                    {admin.state.toUpperCase()}
                  </span>
                </td>

                {/* ACTION */}
                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      navigate(`/admin/${admin.admin_id}`)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#0f172a",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#1e293b")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#0f172a")
                    }
                  >
                    View Agents →
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {admins.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          No admins found
        </div>
      )}
    </div>
  );
}

/* 🔹 SHARED STYLES */
const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontSize: "13px",
  fontWeight: "700",
  color: "#475569",
  textTransform: "uppercase",
};

const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
};

export default AdminList;

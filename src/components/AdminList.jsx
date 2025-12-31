import { useNavigate } from "react-router-dom";

function AdminList({ admins }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* TABLE HEADER */}
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: "18px",
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
        Admin Overview
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8fafc",
              textAlign: "left",
              fontSize: "13px",
              color: "#475569",
            }}
          >
            <th style={{ padding: "14px 22px" }}>ADMIN ID</th>
            <th style={{ padding: "14px 22px" }}>STATUS</th>
            <th style={{ padding: "14px 22px", textAlign: "center" }}>
              ACTION
            </th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => {
            const isActive = admin.state === "active";

            return (
              <tr
                key={admin.admin_id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* ADMIN ID */}
                <td
                  style={{
                    padding: "16px 22px",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  {admin.admin_id}
                </td>

                {/* STATUS */}
                <td style={{ padding: "16px 22px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: isActive ? "#065f46" : "#7f1d1d",
                      background: isActive ? "#dcfce7" : "#fee2e2",
                      textTransform: "uppercase",
                    }}
                  >
                    {admin.state}
                  </span>
                </td>

                {/* ACTION */}
                <td
                  style={{
                    padding: "16px 22px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => navigate(`/admin/${admin.admin_id}`)}
                    style={{
                      background: "#0ea5e9",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = "#0284c7")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background = "#0ea5e9")
                    }
                  >
                    View →
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
            padding: "40px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No admins found
        </div>
      )}
    </div>
  );
}

export default AdminList;

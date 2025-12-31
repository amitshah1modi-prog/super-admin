import { useNavigate } from "react-router-dom";

function AdminList({ admins }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        padding: "24px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Admin Overview
        </h2>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>
          List of all available admins and their current status
        </p>
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {admins.map((admin) => {
          const isActive = admin.state === "active";

          return (
            <div
              key={admin.admin_id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                background: "#f8fafc",
                transition: "all 0.2s ease",
              }}
            >
              {/* LEFT */}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#020617",
                  }}
                >
                  Admin ID: {admin.admin_id}
                </div>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: isActive ? "#065f46" : "#7f1d1d",
                    backgroundColor: isActive ? "#dcfce7" : "#fee2e2",
                  }}
                >
                  {isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => navigate(`/admin/${admin.admin_id}`)}
                style={{
                  background: "#0f172a",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1e293b")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#0f172a")
                }
              >
                →
              </button>
            </div>
          );
        })}

        {admins.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No admins found
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminList;

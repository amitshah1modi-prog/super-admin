import { useNavigate } from "react-router-dom";

function AdminList({ admins }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Admin ID</th>
          <th>Status</th>
          <th>View Agents</th>
        </tr>
      </thead>

      <tbody>
        {admins.map((admin) => (
          <tr key={admin.admin_id}>
            <td>{admin.admin_id}</td>
            <td>{admin.state}</td>
            <td>
              <button
                onClick={() => navigate(`/admin/${admin.admin_id}`)}
                style={{ cursor: "pointer" }}
              >
                ➡
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminList;

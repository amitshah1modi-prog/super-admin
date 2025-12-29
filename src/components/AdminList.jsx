function AdminList({ admins }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Admin ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <tr key={admin.admin_id}>
            <td>{admin.admin_id}</td>
            <td>
              <span
                className={
                  admin.state === "active" ? "status active" : "status inactive"
                }
              >
                {admin.state}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminList;

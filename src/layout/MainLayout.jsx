import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <TopBar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f1f5f9",
          minHeight: "calc(100vh - 60px)"
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

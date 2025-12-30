import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SuperAdmin from "./pages/SuperAdmin";
import Hello from "./pages/Hello";
import AdminAgents from "./pages/AdminAgents";
import AgentHistoryPage from "./pages/AgentHistoryPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SuperAdmin />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/admin/:adminId" element={<AdminAgents />} />
        <Route
          path="/admin/:adminId/agent/:agentId"
          element={<AgentHistoryPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;

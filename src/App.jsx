import { Routes, Route } from "react-router-dom";
import SuperAdmin from "./pages/SuperAdmin";
import AdminAgents from "./pages/AdminAgents";
import AgentHistoryPage from "./pages/AgentHistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdmin />} />
      <Route path="/admin/:adminId" element={<AdminAgents />} />
      <Route
        path="/admin/:adminId/agent/:agentId"
        element={<AgentHistoryPage />}
      />
    </Routes>
  );
}

export default App;

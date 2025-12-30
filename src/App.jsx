import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SuperAdmin from "./pages/SuperAdmin";
import Hello from "./pages/Hello";
import AdminAgents from "./pages/AdminAgents";
import AgentHistoryPage from "./pages/AgentHistoryPage";
import AdminAnalysis from "./pages/AdminAnalysis";
import AdminReport from "./pages/AdminReport";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SuperAdmin />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/analysis" element={<AdminAnalysis />} />
        <Route path="/admin-report" element={<AdminReport />} />

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


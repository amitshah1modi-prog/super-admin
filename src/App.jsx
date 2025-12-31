import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import SuperAdmin from "./pages/SuperAdmin";
import Hello from "./pages/Hello";
import AdminAgents from "./pages/AdminAgents";
import AgentHistoryPage from "./pages/AgentHistoryPage";
import AdminAnalysis from "./pages/AdminAnalysis";
import AdminReport from "./pages/AdminReport";
import AgentWiseAnalysis from "./pages/AgentWiseAnalysis";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* MAIN PAGES */}
        <Route path="/" element={<SuperAdmin />} />
        <Route path="/hello" element={<Hello />} />

        {/* ADMIN ANALYSIS */}
        <Route path="/analysis" element={<AdminAnalysis />} />
        <Route path="/admin-report" element={<AdminReport />} />

        {/* AGENT WISE ANALYSIS */}
        <Route path="/agent-analysis" element={<AgentWiseAnalysis />} />

        {/* ADMIN → AGENTS FLOW */}
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

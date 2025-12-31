import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED APP */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<SuperAdmin />} />
        <Route path="/hello" element={<Hello />} />

        <Route path="/analysis" element={<AdminAnalysis />} />
        <Route path="/admin-report" element={<AdminReport />} />
        <Route path="/agent-analysis" element={<AgentWiseAnalysis />} />

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

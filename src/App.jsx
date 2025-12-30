import { Routes, Route } from "react-router-dom";
import SuperAdmin from "./pages/SuperAdmin";
import AdminAgents from "./pages/AdminAgents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdmin />} />
      <Route path="/admin/:adminId" element={<AdminAgents />} />
    </Routes>
  );
}

export default App;

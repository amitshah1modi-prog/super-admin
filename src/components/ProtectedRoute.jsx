import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setChecking(false);
    });
  }, []);

  if (checking) return <p>Checking auth...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;

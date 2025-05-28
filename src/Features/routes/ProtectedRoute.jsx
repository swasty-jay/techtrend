// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../../supabase";
import Spinner from "../../UI/Spinner";



const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthenticated(!!data.user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div><Spinner/></div>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

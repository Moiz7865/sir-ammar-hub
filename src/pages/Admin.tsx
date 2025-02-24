
import { useState, useEffect } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import AdminAuth from "@/components/AdminAuth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (success: boolean) => {
    setIsAuthenticated(success);
  };

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <AdminDashboard />
      ) : (
        <AdminAuth onAuth={handleAuth} />
      )}
    </div>
  );
};

export default Admin;

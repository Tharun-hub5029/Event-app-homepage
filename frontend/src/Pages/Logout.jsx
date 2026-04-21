import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
const Logout = () => {
  const navigate = useNavigate();
const handleLogout = async () => {

     await api.post("/api/auth/logout");
    localStorage.removeItem("user_data");
    localStorage.removeItem("_key_");

    // Redirect to login page after logout
    navigate("/login");
  };
useEffect(() => {
    handleLogout();
  }
  , []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

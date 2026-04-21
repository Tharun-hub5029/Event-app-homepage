import { useEffect ,useState} from "react";
import { useNavigate ,Outlet} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({allowedRoles }) => {
  const token = localStorage.getItem("_key_");
    const decode = jwtDecode(token);
    const role = decode?.role || null
   const navigate = useNavigate();
   
   

    useEffect(()=>{
        if (!allowedRoles.includes(role)) {
            navigate("/login")
        }
    })
  
    return <Outlet/>;
  };
  
  export default ProtectedRoute;
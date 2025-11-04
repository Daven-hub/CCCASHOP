// src/components/Routes/ProtectedRoute.jsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Unauthorized from "../pages/Error/Unauthorized";

export default function LinkProtected({ allowedRoles }) {
  const { userConnected } = useAuth();

   return(<>
          {allowedRoles && !allowedRoles.includes(userConnected?.role) ? (
            <Unauthorized />
          ) : (
            <Outlet />
          )}
    </>)
}

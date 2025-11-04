// src/components/Routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LoaderUltra from "../components/ui/LoaderUltra";

export default function ProtectedRoute({ allowedRoles }) {
  const { userConnected,isLoading,duration } = useAuth();

   return(<>
      {isLoading && <LoaderUltra loading={isLoading} duration={duration} />}

      {!isLoading && (
        <>
          {!userConnected ? (
            <Navigate to="/mon-compte/connexion" replace />
          ) : allowedRoles && !allowedRoles.includes(userConnected?.role) ? (
            <Navigate to="/" replace />
          ) : (
            <Outlet />
          )}
        </>
      )}
    </>)
}

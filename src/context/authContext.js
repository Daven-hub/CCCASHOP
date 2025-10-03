// AuthContext.js
import { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/slices/user.slice";
import { logout } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { usershop } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const detail = useMemo(() => {
      return usershop ;
    }, [usershop]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userConnected = useMemo(() => {
    if (!users || !detail) return null;
    return users
      .map(({ password, ...rest }) => rest)
      .find((u) => u?.idUsershop === detail.id);
  }, [users, detail]);
 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ userConnected, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// AuthContext.js
import { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/slices/user.slice";
import { logout } from "../store/slices/auth.slice";
import { getAllVendor } from "../store/slices/vendeur.slice";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { usershop } = useSelector((state) => state.auth);
  const { vendeurs } = useSelector((state) => state.vendeur);
  // const navigate = useNavigate()

  const detail = useMemo(() => {
      return usershop ;
    }, [usershop]);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllVendor());
  }, [dispatch]);

  const userConnected = useMemo(() => {
    if (!users || !vendeurs || !detail) return null;
    const oneUser= users.find((x)=>x?.idUsershop===detail?.id)
    if(oneUser?.role==='fournisseur'){
      return vendeurs
      .map((u) =>({ ...u,
        username:u?.shopname,
        profile:oneUser?.profile,
        email:oneUser?.email,
        role:oneUser?.role,
       }))
      .find((u) => u?.userId === oneUser?.idUsershop);
    }else{
      return users
      .map(({ password, ...rest }) => rest)
      .find((u) => u?.idUsershop === detail.id);
    }
  }, [users, vendeurs, detail]);
 

  const handleLogout = () => {
    dispatch(logout());
    // navigate("/")
    // window.location.href = "/";
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider value={{ userConnected, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// AuthContext.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/slices/user.slice";
import { logout} from "../store/slices/auth.slice";
import { getAllVendor } from "../store/slices/vendeur.slice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { usershop } = useSelector((state) => state.auth);
  const { vendeurs } = useSelector((state) => state.vendeur);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  const detail = useMemo(() => {
      return usershop ;
    }, [usershop]);

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();

      await Promise.all([dispatch(getAllUsers()), dispatch(getAllVendor())]);

      const end = performance.now();
      const elapsed = end - start;
      setDuration(elapsed);

      const delay = Math.max(500, elapsed);
      setTimeout(() => setIsLoading(false), delay);
    };

    fetchData();
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
 
  const refreshUser = async () => {
  await Promise.all([
    dispatch(getAllUsers()),
    dispatch(getAllVendor())
  ]);
};

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.replace("/");
  };

  const monaie='$'

  return (
    <AuthContext.Provider value={{ userConnected, handleLogout,isLoading, duration,refreshUser,monaie }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

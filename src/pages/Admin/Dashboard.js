import { Navigate } from "react-router-dom";
import DashAdmin from "../../components/Admin/Dahboard/DashAdmin";
import DashCustomer from "../../components/Admin/Dahboard/DashCustomer";
// import DashCustomer from "../../components/Admin/Dahboard/DashCustomer";
import DashSuppliers from "../../components/Admin/Dahboard/DashSuppliers";
import { useAuth } from "../../context/authContext";


export default function Dashboard() {

  const {userConnected}=useAuth()

  if(userConnected?.role==="admin"){
    return <DashAdmin />
  }else if(userConnected?.role==="fournisseur"){
    return <DashSuppliers />
  }else if(userConnected?.role==="acheteur"){
    return <DashCustomer />
  }
}

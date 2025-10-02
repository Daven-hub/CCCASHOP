import DashAdmin from "../../components/Admin/Dahboard/DashAdmin";
import DashCustomer from "../../components/Admin/Dahboard/DashCustomer";
// import DashCustomer from "../../components/Admin/Dahboard/DashCustomer";
import DashSuppliers from "../../components/Admin/Dahboard/DashSuppliers";


export default function Dashboard() {

  const userFromStorage= localStorage.getItem("user")
  const detail=JSON.parse(userFromStorage)

  if(detail?.role==="admin"){
    return <DashAdmin />
  }else if(detail?.role==="fournisseur"){
    return <DashSuppliers />
  }
    
  return <DashCustomer />
}

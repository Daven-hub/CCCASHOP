import { NavLink, Outlet } from "react-router-dom";
import { Settings as SettingsIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { BaseUrl } from "../../../config";
import { useAuth } from "../../../context/authContext";

const Settings = () => {
  const { userConnected } = useAuth();

  const menus = [
    { label: "Général", slug: "/generale" },
    { label: "Profil", slug: "/profile" },
    { label: "Mot de passe", slug: "/mot-de-passe" },
    { label: "Notifications Email", slug: "/email" },
    { label: "Paramètres boutique", slug: "/shop" },
    { label: "Politique de confidentialité", slug: "/politique" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <div className="flex gap-6 w-full">
        {/* Section gauche */}
        <div className="w-[28%] flex flex-col gap-4">
          {/* Profil + bannière */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="bg-gradient-to-r from-primary/80 to-primary/60 h-[120px] relative w-full">
              <div className="absolute w-[90px] h-[90px] rounded-full -bottom-1/3 left-1/2 -translate-x-1/2 overflow-hidden border-4 border-white shadow-lg">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={BaseUrl + (userConnected?.profile ?? "")}
                    alt={userConnected?.nom ?? "Profil utilisateur"}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="flex items-center justify-center w-full h-full text-gray-700 font-bold bg-gray-100">
                    {userConnected?.nom?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="mt-12 px-4 flex flex-col items-center gap-1 pb-2">
              <h2 className="text-lg font-semibold">{userConnected?.prenom} {userConnected?.nom}</h2>
              <span className="text-sm text-gray-500 capitalize">{userConnected?.role}</span>
            </div>
          </div>

          {/* Menu vertical */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <span className="block px-4 pt-3 text-sm font-semibold text-gray-500">Menu</span>
            <ul className="flex flex-col divide-y divide-gray-100">
              {menus.map((menu, idx) => (
                <li key={idx}>
                  <NavLink
                    to={"/admin/parametres" + menu.slug}
                    className={({ isActive }) =>
                      `block px-5 py-3 text-[.95rem] text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium ${
                        isActive ? "bg-primary/10 text-primary-light" : ""
                      }`
                    }
                  >
                    {menu.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section droite */}
        <div className="w-[72%] bg-white rounded-lg shadow-sm p-6 min-h-[500px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;

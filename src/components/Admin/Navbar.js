import React, { useEffect, useRef, useState } from 'react';
import { Menu01Icon } from 'hugeicons-react';
import { BaseUrl } from '../../config';
import * as Avatar from "@radix-ui/react-avatar";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../context/authContext';
import { FaUserAlt } from 'react-icons/fa';

export const getFlag = (lang) => {
  switch (lang) {
    case "fr":
      return <FlagIcon code="FR" size={17} />;
    case "de":
      return <FlagIcon code="DE" size={17} />;
    case "es":
      return <FlagIcon code="ES" size={17} />;
    case "dk":
      return <FlagIcon code="DK" size={17} />;
    case "nl":
      return <FlagIcon code="NL" size={17} />;
    default:
      return <FlagIcon code="GB" size={17} />;
  }
};

function Navbar({ toggleSidebar }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLngsa") || i18n.language
  );

  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const { userConnected,handleLogout } = useAuth();

  return (
    <nav className="w-full sticky top-0 bg-white shadow-md z-[1] shadow-slate-100 flex items-center justify-between px-6 max-md:px-[4%] py-3 max-md:py-2.5 border-b">
      <div className='flex items-center gap-3 w-[55%]'>
        <div className='cursor-pointer flex-shrink-0 btn-menu'>
          <Menu01Icon size={30} />
        </div>
        <input id='recherche'
          className="bg-gray-100 border text-[.85rem] rounded-full max-md:hidden px-5 w-[65%] py-2.5 focus:outline-none"
          type="text"
          placeholder="Rechercher ..."
        />
      </div>
      <div className='flex gap-3 items-center'>
        <div className='flex w-[35px] h-[35px] justify-center rounded-full border items-center font-bold text-gray-700 gap-2'>
          {getFlag(language)}
          {/* <FaChevronDown /> */}
        </div>
        <div ref={popoverRef} className='relative flex border-l pl-4 items-center gap-2'>
          <div onClick={() => setOpen(!open)} className='flex cursor-pointer items-center gap-2.5'>
            <Avatar.Root className="AvatarRoot inline-flex w-[35px] h-[35px] object-cover object-top rounded-full items-center justify-center overflow-hidden align-middle">
              <Avatar.Image
                className="AvatarImage"
                src={BaseUrl + "" + userConnected?.profile}
                alt={userConnected?.username}
              />
              <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
                {userConnected?.username?.charAt(0)?.toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className='cursor-pointer flex-col hidden'>
              <span className='text-[.85rem] whitespace-nowrap font-semibold'>{userConnected?.username}</span>
              <span className='opacity-60 font-medium text-[.7rem]'>{userConnected?.role}</span>
            </div>
          </div>
          {/* Popover */}
          {open && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-primary font-semibold">{userConnected?.username}</p>
                <p className="text-xs text-gray-600">{userConnected?.email}</p>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <NavLink onClick={() => setOpen(false)} to={"/admin/profile"} className="w-full text-left flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100">
                    <FaUserAlt /> Mon profil
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setOpen(false)} to={"/admin/parametres"} className="w-full flex items-center gap-2.5 text-left px-4 py-2 hover:bg-gray-100">
                    <FiSettings /> Paramètres
                  </NavLink>
                </li>
              </ul>
              <div className="border-t text-sm">
                <button onClick={()=>{handleLogout();setOpen(false)}} className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  <FiLogOut /> Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

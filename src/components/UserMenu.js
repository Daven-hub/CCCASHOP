import React, { useEffect, useRef, useState } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import * as Avatar from "@radix-ui/react-avatar";
import { BaseUrl } from '../config';
import { useAuth } from '../context/authContext';
import { MdDashboard } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

function UserMenu({isAdmin}) {
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

      const { userConnected, handleLogout } = useAuth();
      return (
            <div ref={popoverRef} className='flex relative items-center font-bold text-[.75rem] gap-2'>
                  <div onClick={() => setOpen(!open)} className='cursor-pointer flex items-center gap-1.5'>
                        <Avatar.Root className="AvatarRoot inline-flex w-[40px] h-[40px] object-cover object-top rounded-full items-center justify-center overflow-hidden align-middle">
                              <Avatar.Image
                                    className="AvatarImage"
                                    src={BaseUrl + "" + userConnected?.profile}
                                    alt={userConnected?.username}
                              />
                              <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
                                    {userConnected?.username?.charAt(0)?.toUpperCase()}
                              </Avatar.Fallback>
                        </Avatar.Root>
                        {!isAdmin && <div className='flex flex-col'>
                              <span className='text-white/85 text-[.8rem] font-semibold'>{userConnected?.username}</span>
                              <span className='text-white/60 text-[.65rem]'>{userConnected?.role}</span>
                        </div>}
                  </div>
                  {/* Popover */}
                  {open && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                              <div className="px-4 py-3 border-b">
                                    <p className="text-sm text-primary font-semibold">{userConnected?.username}</p>
                                    <p className="text-xs text-gray-600">{userConnected?.email}</p>
                              </div>
                              <ul className="py-2 text-sm text-gray-700">
                                    {!isAdmin && <li>
                                          <NavLink onClick={() => setOpen(false)} to={"/admin/tableau-de-bord"} className="w-full text-left flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100">
                                                <MdDashboard /> Tableau de bord
                                          </NavLink>
                                    </li>}
                                    <li>
                                          <NavLink onClick={() => setOpen(false)} to={"#"} className="w-full text-left flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100">
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
                                    <button onClick={() => { handleLogout(); setOpen(false) }} className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                                          <FiLogOut /> Déconnexion
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      )
}

export default UserMenu
import React, { useEffect, useRef, useState } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import * as Avatar from "@radix-ui/react-avatar";
import { BaseUrl } from '../config';
import { useAuth } from '../context/authContext';
import { MdDashboard } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import LoaderUltra from './ui/LoaderUltra';

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

      const { userConnected, handleLogout,isLoading } = useAuth();
      // console.log('userConnected',userConnected)
      return (
            <div ref={popoverRef} className='flex relative items-center font-bold text-[.75rem] gap-2'>
                  <div onClick={() => setOpen(!open)} className='cursor-pointer flex items-center gap-1.5'>
                        <Avatar.Root className="AvatarRoot inline-flex w-[42px] h-[42px] object-cover object-top rounded-full items-center justify-center overflow-hidden align-middle">
                              <Avatar.Image
                                    className="AvatarImage"
                                    src={BaseUrl + "" + userConnected?.profile}
                                    alt={userConnected?.username? userConnected?.username: userConnected?.nom}
                              />
                              <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
                                    {userConnected?.username?.charAt(0)?.toUpperCase()}
                              </Avatar.Fallback>
                        </Avatar.Root>
                        {!isAdmin && <div className='flex flex-col leading-[1.3]'>
                              <span className='text-white/85 text-[.9rem] capitalize font-semibold'>{userConnected?.username ?userConnected?.username: userConnected?.prenom+' '+userConnected?.nom}</span>
                              <span className='text-white/70 capitalize font-light text-[.7rem]'>{userConnected?.role}</span>
                        </div>}
                  </div>
                  {/* Popover */}
                  {open && (
                        <div className="absolute top-full right-0 overflow-hidden mt-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                              <div className="px-4 space-y-0.5 py-3 border-b">
                                    <p className="text-sm text-primary capitalize font-semibold">{userConnected?.username ?userConnected?.username: userConnected?.prenom+' '+userConnected?.nom}</p>
                                    <p className="text-xs font-normal text-gray-400">{userConnected?.email}</p>
                              </div>
                              <ul className="py-1 text-sm font-medium text-gray-500">
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
                              <div className="border-t text-sm font-medium">
                                    <button onClick={() => { handleLogout(); setOpen(false) }} className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-red-600 hover:bg-gray-100">
                                          <FiLogOut /> Déconnexion
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      )
}

export default UserMenu
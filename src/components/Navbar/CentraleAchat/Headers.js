import { FavouriteIcon, Search01Icon, ShoppingCart01Icon } from 'hugeicons-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaEnvelope, FaFacebookF, FaLinkedinIn, FaTiktok, FaUserAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import logo from "../../../assets/1x/icone blanc.png";
import { UserCircle } from 'lucide-react';
import * as Avatar from "@radix-ui/react-avatar";
import { BaseUrl } from '../../../config';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/authContext';
import { getFlag } from '../../Admin/Navbar';

export const paddingH = "5%";

function Headers() {
      const [open, setOpen] = useState(false);
      const popoverRef = useRef(null);
      const {i18n } = useTranslation();
      const [language, setLanguage] = useState(
      localStorage.getItem("i18nextLngsa") || i18n.language
      );
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
            <>
                  <div className={`bg-primary flex items-centerborder-b border-b border-white/10 text-white text-[.92rem] px-[${paddingH}] justify-between py-2`}>
                        <div className='flex items-center gap-4'>
                              <ul className='flex items-center gap-3.5 pr-5 border-r border-gray-300'>
                                    <li><FaFacebookF /></li>
                                    <li><FaLinkedinIn /></li>
                                    <li><FaTiktok /></li>
                              </ul>
                              <span className='flex items-center font-semibold gap-1.5'><FaEnvelope />info@ccca.ca</span>
                        </div>
                        <div className='flex items-center gap-4'>
                              <select className='bg-transparent text-[.8rem] font-bold outline-0'>
                                    <option>USD</option>
                                    <option>EURO</option>
                                    <option>$CAD</option>
                                    <option>FCFA</option>
                              </select>
                              <div className='flex items-center pl-5 border-l border-gray-300 font-bold text-white/50 gap-2'>
                              {getFlag(language)} <FaChevronDown />
                              </div>
                        </div>
                  </div>
                  {/* navigation */}
                  <div className={`flex bg-primary items-center gap-8 py-[2.1rem] px-[${paddingH}]`}>
                        <NavLink to={"/"} className="flex items-center gap-2 w-[25%]">
                              <img loading="lazy" src={logo} width={40} height={40} alt="logo_ccca" />
                              <div className="flex flex-col text-white font-semibold text-[1.05rem] leading-[1.4rem]">
                                    <span>Chambre de Commerce</span>
                                    <span>Canada Afrique</span>
                              </div>
                        </NavLink>
                        <div className='flex items-center justify-between gap-4 w-[75%]'>
                              <div className='bg-white rounded-[6px] overflow-hidden flex flex-row-reverse w-[60%]'>
                                    <label className='py-2.5 flex items-center justify-center px-3 bg-secondary' htmlFor='search'><Search01Icon className='text-white' strokeWidth={2} size={20} /></label>
                                    <input placeholder='Rechercher un produit, pournisseur, acheteur ...' className='py-3.5 px-3.5 w-full text-[.8rem] outline-0 placeholder:text-gray-400' id='search' type='text' />
                              </div>
                              <div className='flex gap-6 text-white items-end'>
                                    <NavLink to="/centrale_achats/favoris" className='flex relative items-center font-bold text-[.85rem] gap-2'>
                                          <div className="absolute -top-[0.2rem] -left-2 text-[.75rem] flex bg-red-600 justify-center items-center w-[22px] h-4 rounded-full flex-shrink-0 px-1 py-1">0</div>
                                          <FavouriteIcon strokeWidth={2} size={40} />
                                          {/* Favoris */}
                                    </NavLink>
                                    <NavLink to="/centrale_achats/cart" className='flex relative items-center font-bold text-[.85rem] gap-2.5                                                                            '>
                                          <div className="absolute -top-[0.2rem] -left-2 text-[.75rem] flex bg-red-600 justify-center items-center w-[22px] h-4 rounded-full flex-shrink-0 px-1 py-1">0</div>
                                          <ShoppingCart01Icon strokeWidth={2} size={40} />
                                          <div className='flex flex-col gap-1 justify-end'>
                                                <span className='text-white/85 text-[.75rem] leading-[1] font-semibold'>Mon panier</span>
                                                <span className='text-white/60 font-mono leading-[1] text-[.95rem]'>$00.0</span>
                                          </div>
                                    </NavLink>
                                    <div ref={popoverRef} className='flex pl-4 border-l border-white relative items-center font-bold text-[.75rem] gap-2'>
                                          {!userConnected ? <NavLink className="flex items-center gap-1.5" to={"/login"}><UserCircle strokeWidth={2} size={30} />
                                                Login
                                          </NavLink> :

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
                                                      <div className='flex flex-col'>
                                                            <span className='text-white/85 text-[.8rem] font-semibold'>{userConnected?.username}</span>
                                                            <span className='text-white/60 text-[.65rem]'>{userConnected?.role}</span>
                                                      </div>
                                                </div>}
                                          {/* Popover */}
                                          {open && (
                                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                                      <div className="px-4 py-3 border-b">
                                                            <p className="text-sm text-primary font-semibold">{userConnected?.username}</p>
                                                            <p className="text-xs text-gray-600">{userConnected?.email}</p>
                                                      </div>
                                                      <ul className="py-2 text-sm text-gray-700">
                                                            <li>
                                                                  <NavLink onClick={() => setOpen(false)} to={"/admin/tableau-de-bord"} className="w-full text-left flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100">
                                                                        <MdDashboard /> Tableau de bord
                                                                  </NavLink>
                                                            </li>
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
                                                            <button onClick={()=>{handleLogout();setOpen(false)}} className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                                                                  <FiLogOut /> Déconnexion
                                                            </button>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Headers
import { FavouriteIcon, Search01Icon, ShoppingCart01Icon } from 'hugeicons-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaEnvelope, FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import logo from "../../../assets/1x/icone blanc.png";
import { UserCircle } from 'lucide-react';
import * as Avatar from "@radix-ui/react-avatar";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/authContext';
import { getFlag } from '../../Admin/Navbar';
import UserMenu from '../../UserMenu';

export const paddingH = "5%";

function Headers() {
      const [open, setOpen] = useState(false);
      const popoverRef = useRef(null);
      const { i18n } = useTranslation();
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

      const { userConnected } = useAuth();
      return (
            <>
                  <div className={`bg-primary flex items-center text-white text-[.92rem] px-[${paddingH}] justify-between py-2.5`}>
                        <div className='flex items-center gap-4'>
                              <ul className='flex items-center gap-3.5 pr-5 border-r border-gray-300'>
                                    <li><FaFacebookF /></li>
                                    <li><FaLinkedinIn /></li>
                                    <li><FaTiktok /></li>
                              </ul>
                              <span className='flex items-center font-normal gap-1.5'><FaEnvelope />info@cc-ca.ca</span>
                        </div>
                        <div className='flex items-center gap-4'>
                              <NavLink to={"/enregistrement"} className="pr-5 text-[.8rem] border-r border-gray-300">Créer un compte</NavLink>
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
                  <div className={`flex bg-primary border-y border-white/5 items-center gap-8 py-[1.9rem] px-[${paddingH}]`}>
                        <NavLink to={"/"} className="flex items-center gap-2 w-[22%]">
                              <img loading="lazy" src={logo} width={40} height={40} alt="logo_ccca" />
                              <div className="flex flex-col text-white font-medium text-[1.1rem] leading-[1.35rem]">
                                    <span>Chambre de Commerce</span>
                                    <span>Canada Afrique</span>
                              </div>
                        </NavLink>
                        <div className='flex items-center justify-between gap-4 w-[78%]'>
                              <div className='bg-white rounded-[6px] p-1 overflow-hidden flex flex-row-reverse w-[55%]'>
                                    <label className='flex items-center justify-center px-2.5 bg-secondary rounded-r-[6px]' htmlFor='search'><Search01Icon className='text-white' strokeWidth={2} size={20} /></label>
                                    <input placeholder='Rechercher un produit, pournisseur, acheteur ...' className='py-2 bg-transparent px-1.5 w-full text-[.9rem] outline-0 font-light placeholder:text-gray-400' id='search' type='text' />
                              </div>
                              <div className='flex gap-4 text-white items-center'>
                                    <div className='flex items-center gap-6'>
                                          <NavLink to="/favoris" className='flex relative items-center font-bold text-[.85rem] gap-2'>
                                                <span className="absolute text-[.95rem] flex justify-center items-center top-[0rem] bg-secondary py-0.5 px-1.5 leading-[1] rounded-[50px] -left-1.5 leading-0">
                                                      0
                                                </span>
                                                <div className="p-3 flex justify-center item-center rounded-full bg-gray-100/20">
                                                      <FavouriteIcon strokeWidth={2} size={20} />
                                                </div>
                                                {/* Favoris */}
                                          </NavLink>
                                          <NavLink to="/cart" className='flex relative items-center font-bold text-[.85rem] gap-2                                                                            '>
                                                <span className="absolute text-[.95rem] flex justify-center items-center top-[0rem] bg-secondary py-0.5 px-1.5 leading-[1] rounded-[50px] -left-1.5 leading-0">
                                                      0
                                                </span>
                                                <div className="p-3 flex justify-center item-center rounded-full bg-gray-100/20">
                                                      <ShoppingCart01Icon strokeWidth={2} size={20} />
                                                </div>
                                                <div className='flex flex-col gap-1.5 leading-[1] mt-[.15rem] justify-end'>
                                                      <span className='text-white/50 text-[.7rem] font-light'>Mon panier</span>
                                                      <span className='text-white/75 text-[.90rem]'>$00.0</span>
                                                </div>
                                          </NavLink>
                                    </div>
                                    <div className='pl-4 border-l border-white/30'>
                                          {!userConnected ? <NavLink className="flex text-[.8rem] items-center gap-1.5" to={"/login"}><UserCircle strokeWidth={1} size={40} />
                                                Login
                                          </NavLink> :
                                                <UserMenu isAdmin={false} />
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Headers
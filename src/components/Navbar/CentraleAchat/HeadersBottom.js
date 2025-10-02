import { ArrowDown01Icon, Menu01Icon } from 'hugeicons-react'
import React from 'react'
import { paddingH } from './Headers'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
export  const categories = [
      "Informatique",
      "Agriculture",
      "Élevage",
      "Formations",
      "Théâtre",
      "Agro-alimentaire",
      "Pharmacie",
      "Médecine",
      "Vêtements",
      "Bâtiments",
      "Cosmétique"
]

export const liensHeader=[
      {
            label:"Acceuil",
            link:"/"
      },
      {
            label:"Achats",
            link:"/shop"
      },
      {
            label:"Produits",
            link:"/produits"
      },
      {
            label:"Fournisseurs",
            link:"/fournisseurs"
      },
      {
            label:"Acheteurs",
            link:"/acheteurs"
      }
]
function HeadersBottom() {
      return (
            <>
                  <div className={`flex items-end gap-8 bg-primary px-[${paddingH}]`}>
                        <div className="w-[25%]">
                              <div className='bg-white relative rounded-t-[6px] text-black/75 flex items-center justify-between font-semibold'>
                                    <span className='text-[.9rem] w-full rounded-t-[6px] justify-between py-3 px-5 border flex items-center gap-3.5'><Menu01Icon strokeWidth={2} size={21} /> Toutes les Catégories <ArrowDown01Icon size={22} /></span>
                                    <ul className='absolute top-[calc(100%)] rounded-b-[6px] w-full bg-white left-0 flex border-x border-b border-t-0 text-[.85rem] flex-col'>
                                          {categories?.map((item, ind) =>
                                                <li key={ind}><NavLink className="py-3 hover:bg-gray-50 border-b font-semimold block px-5" to={item}>{item}</NavLink></li>
                                          )}
                                    </ul>
                              </div>
                        </div>
                        <div className="w-[75%] flex items-end justify-between">
                              <ul className='flex gap-1 nav-achat items-center uppercase text-white text-[.8rem] font-bold'>
                                    {liensHeader?.map((item, ind)=>
                                          <li key={ind}><NavLink to={item.link} className="px-6 block py-3.5">{item.label}</NavLink></li>
                                    )}
                              </ul>
                              <NavLink className="py-2.5 text-[.93rem] font-medium capitalize text-white flex items-center gap-1.5" to={"/"}><MdDashboard size={21}/> Revenir sur le site</NavLink>
                        </div>
                  </div>
                  <div className={`flex gap-8 pt-6 px-[${paddingH}]`}>
                        <div className="w-[25%]"></div>
                        <div className="w-[75%] rounded-[6px] h-[475.5px] bg-red-500"></div>
                  </div>
            </>
      )
}

export default HeadersBottom
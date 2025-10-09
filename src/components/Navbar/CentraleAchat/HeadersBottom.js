import { ArrowDown01Icon, Location01Icon, Menu01Icon } from 'hugeicons-react'
import React from 'react'
import { paddingH } from './Headers'
import { NavLink } from 'react-router-dom'
// import { MdDashboard } from 'react-icons/md'
import { BookOpen, Cpu, Heart, Home, Leaf, Monitor, Pill, Shirt, ShoppingBag, Sparkles, Video } from 'lucide-react'
export const categories = [
      { label: "Informatique", value: "informatique", icon: Cpu },
      { label: "Agriculture", value: "agriculture", icon: Leaf },
      { label: "Vidéos", value: "videos", icon: Video },
      { label: "Formations", value: "formations", icon: BookOpen },
      { label: "Electronique", value: "electronique", icon: Monitor },
      { label: "Agro-alimentaire", value: "agro_alimentaire", icon: ShoppingBag },
      { label: "Pharmacie", value: "pharmacie", icon: Pill },
      { label: "Médecine", value: "medecine", icon: Heart },
      { label: "Vêtements", value: "vetements", icon: Shirt },
      { label: "Bâtiments", value: "batiments", icon: Home },
      { label: "Cosmétique", value: "cosmetique", icon: Sparkles },
];

export const liensHeader = [
      {
            label: "Acceuil",
            link: "/"
      },
      // {
      //       label: "Achats",
      //       link: "/shop"
      // },
      {
            label: "Produits",
            link: "/produits"
      },
      {
            label: "Fournisseurs",
            link: "/fournisseurs"
      },
      {
            label: "Produits recherchés",
            link: "/produits-recherchés"
      }
]
function HeadersBottom() {
      return (
            <>
                  <div className={`flex items-end gap-8 bg-primary px-[${paddingH}]`}>
                        <div className="w-[25%]">
                              <div className='bg-white relative rounded-t-[6px] text-black/75 flex items-center justify-between'>
                                    <div className='text-[.9rem] w-full rounded-t-[6px] justify-between py-3.5 px-5 border flex items-center font-semibold gap-3.5'><span className="flex items-center gap-4"><Menu01Icon strokeWidth={2} size={21} /> Toutes les Catégories</span> <ArrowDown01Icon size={22} /></div>
                                    <ul className='absolute top-[calc(100%)] rounded-b-[6px] w-full bg-white left-0 flex border-x border-b border-t-0 text-primary/70 text-[.85rem] flex-col'>
                                          {categories?.map((item, ind) =>
                                                <li key={ind}><NavLink className="py-3 flex items-center gap-5 hover:bg-gray-50 border-b font-medium px-5" to={item.value}><item.icon className="w-5 h-5 text-primary/70" />{item.label}</NavLink></li>
                                          )}
                                    </ul>
                              </div>
                        </div>
                        <div className="w-[75%] flex items-end justify-between">
                              <ul className='flex gap-1 nav-achat items-center capitalize text-white text-[.94rem] font-medium'>
                                    {liensHeader?.map((item, ind) =>
                                          <li key={ind}><NavLink to={item.link} className="px-6 block py-3.5">{item.label}</NavLink></li>
                                    )}
                              </ul>
                              <NavLink className="py-3.5 text-[.93rem] font-medium capitalize text-white flex items-center gap-1.5" to={"/"}><Location01Icon strokeWidth={2} size={18} /> Suivre ma commande</NavLink>
                        </div>
                  </div>
                  <div className={`flex gap-6 pt-6 px-[${paddingH}]`}>
                        <div className="w-[25%]"></div>
                        <div className="w-[75%] border relative overflow-hidden shadow rounded-[6px] h-[472.5px]">
                              <img className='w-full h-full object-cover aspect-[4/4]' src='/images/produits/bann1.jpg' alt='p1' />
                              <div className='absolute flex flex-col gap-6 px-[5%] w-[50%] left-0 top-1/2 -translate-y-1/2'>
                                    <div className='flex flex-col gap-3'>
                                          <span className='text-[.9rem] font-semibold text-secondary/80'>Discount - 10%</span>
                                          <h1 className='text-[3.1rem] text-primary/85 leading-[1] font-bold'>Tree Top Fruit</h1>
                                          <p className='text-md text-gray-500 font-normal'>Un goût pur, des ingrédients de qualité. Idéal pour un encas sain ou une pause gourmande à tout moment.</p>
                                    </div>
                                    <button className='px-8 text-white w-2/3 rounded-md text-md font-bold bg-secondary/80 py-2.5'>Acheter maintenant</button>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default HeadersBottom
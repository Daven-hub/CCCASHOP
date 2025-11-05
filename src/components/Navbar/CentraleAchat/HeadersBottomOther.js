import { ArrowDown01Icon, Location01Icon, Menu01Icon } from 'hugeicons-react'
import React from 'react'
import { paddingH } from './Headers'
import { NavLink } from 'react-router-dom'
import { liensHeader, useTouteCategorie } from './HeadersBottom'
import Slugify from '../../../utils/Slugify'
import { IconRenderer } from '../../../lib/IconeRenderer'
// import { MdDashboard } from 'react-icons/md'

// export const categories = [
//       { label: "Informatique", value: "informatique", icon: Cpu },
//       { label: "Agriculture", value: "agriculture", icon: Leaf },
//       { label: "Vidéos", value: "videos", icon: Video },
//       { label: "Formations", value: "formations", icon: BookOpen },
//       { label: "Electronique", value: "electronique", icon: Monitor },
//       { label: "Agro-alimentaire", value: "agro_alimentaire", icon: ShoppingBag },
//       { label: "Pharmacie", value: "pharmacie", icon: Pill },
//       { label: "Médecine", value: "medecine", icon: Heart },
//       { label: "Vêtements", value: "vetements", icon: Shirt },
//       { label: "Bâtiments", value: "batiments", icon: Home },
//       { label: "Cosmétique", value: "cosmetique", icon: Sparkles },
// ];
function HeadersBottomOther () {
  const { categories, isLoading } = useTouteCategorie()
  return (
    <div className={`flex gap-8 bg-primary px-[${paddingH}]`}>
      <div className='w-[25%]'>
        <div className='bg-white group hover:cursor-pointer relative rounded-t-[6px] text-black/75 flex items-center justify-between font-semibold'>
          <div className='text-[.9rem] w-full relative z-[2] rounded-t-[6px] justify-between py-3.5 px-5 border border-gray-90 flex font-bold items-center gap-3.5'>
            <span className='flex items-center gap-4'>
              <Menu01Icon strokeWidth={2} size={21} /> Toutes les Catégories
            </span>{' '}
            <ArrowDown01Icon size={22} />
          </div>
          <ul className='group-hover:block z-[1] transition-all duration-500 absolute md:hidden top-[calc(100%)] rounded-b-[6px] w-full bg-white left-0 flex text-primary/70 border-x border-b border-t-0 text-[.85rem] flex-col'>
            {isLoading && (
              <span className='py-3 flex items-center gap-5 hover:bg-gray-50 border-b font-medium px-5'>
                Chargement des catégories...
              </span>
            )}
            {!isLoading &&
              categories?.map((item, ind) => (
                <li key={ind}>
                  <NavLink
                    className='py-3 flex items-center gap-5 hover:bg-gray-50 border-b font-medium px-5'
                    to={Slugify(item.nom)}
                  >
                    <IconRenderer iconName={item?.icon} className='w-5 h-5 text-primary/70' />
                    {item.nom}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='w-[75%] flex items-end justify-between'>
        <ul className='flex gap-1 nav-achat items-center capitalize text-white text-[.94rem] font-medium'>
          {liensHeader?.map((item, ind) => (
            <li key={ind}>
              <NavLink to={item.link} className='px-6 block py-3.5'>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink
          className='py-3.5 text-[.93rem] font-medium capitalize text-white flex items-center gap-1.5'
          to={'/'}
        >
          <Location01Icon strokeWidth={2} size={18} /> Suivre ma commande
        </NavLink>
      </div>
    </div>
  )
}

export default HeadersBottomOther

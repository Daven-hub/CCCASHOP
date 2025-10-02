import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import { ShoppingCart01Icon, TruckIcon } from 'hugeicons-react'
// import MultiStepForm from './MultiStepForm'

function Enregistrement() {
  const { t } = useTranslation()
  // const { id } = useParams()

  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/centrale_achats" },
    { label: " Enregistrement", path: "/centrale_achats/enregistrement" },
  ];
  return (
    <div className=''>
      <div className="px-[5%] py-7 bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className='py-12 px-[5%] md:px-[25%] flex flex-col gap-1.5 md:py-14'>
        {/* <h2 className='text-[2.5rem] text-black/75 text-center font-bold'>Se Connecter en tant que :</h2> */}
        <span className='text-[.85rem] md:text-[1.1rem] text-gray-600'>S'enregisterer en tant que :</span>
        <ul className='grid text-gray-800 font-semibold gap-3 md:gap-6 grid-cols-2 text-[.9rem] md:text-[1.5rem]'>
          <li><NavLink className="flex rounded-[6px] bg-white hover:bg-primary hover:text-white transition-all duration-300 border px-8 py-7 md:py-8 flex-col items-center justify-center gap-0.5" to={"/centrale_achats/enregistrement/fournisseur"}>
            <TruckIcon strokeWidth={1} className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]' />
            Fournisseur
          </NavLink>
          </li>
          <li><NavLink className="flex rounded-[6px] bg-white border hover:bg-primary hover:text-white transition-all duration-300 px-8 py-7 md:py-8 flex-col items-center justify-center gap-0.5" to={"/centrale_achats/enregistrement/acheteur"}>
            <ShoppingCart01Icon strokeWidth={1} className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]' />
            Acheteur
          </NavLink>
          </li>
        </ul>
        <NavLink className="text-center mt-8 hover:underline text-gray-400 font-normal text-[.8rem] md:text-[.95rem]" to={"/centrale_achats/login"}>j'ai déjà un compte</NavLink>
      </div>
    </div>
  )
}

export default Enregistrement

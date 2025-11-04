import React from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import Annimated from '../../../components/Annimated';
import datas from "../../../datas/fournisseur.json"
import { CardFournisseur } from '../';
import { Search01Icon } from 'hugeicons-react';
import SEO from '../../../components/SEO';

function Fournisseurs() {
  const { t } = useTranslation()
  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/a/centrale_d_achat" },
    { label: " Liste des fournisseurs", path: "/a/centrale_d_achat/fournisseurs" },
  ];
  return (
    <Annimated>
      <SEO title={'Fournisseur'} description={'permet au fournisseur de gererr les plateformes'} url={"https://cc-ca.ca/fournisseurs"} image={"/fournisseur.jpg"} />
      <div className="px-[5%] py-[1.5rem] bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className='px-[5%] gap-5 py-12 md:py-12 flex'>
        <div className='p-10 w-[23%] bg-primary rounded-[7px]'></div>
        <div className=' w-[77%] flex flex-col gap-6'>
          <div className='flex border rounded-[7px] items-center gap-3'>
            <label htmlFor='search' className='w-[5.5%] py-2.5'><Search01Icon size={18} strokeWidth={3} aria-label='name' className='flex-shrink-0 text-gray-600 w-[94.5%] flex justify-center items-center' /></label>
            <input id="search" name="search" className='w-full outline-0 text-[.9rem] py-2.5 rounded-[7px]' type='text' placeholder='Enter text'/>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
            {datas?.map((item, ind) =>
              <CardFournisseur key={ind} item={item} />
            )}
          </div>
        </div>
      </div>
    </Annimated>
  )
}

export default Fournisseurs

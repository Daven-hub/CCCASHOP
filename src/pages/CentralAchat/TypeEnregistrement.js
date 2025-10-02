import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import FormFournisseur from './form/FormFournisseur'
import FormAcheteur from './form/FormAcheteur'
// import { ShoppingCart01Icon, TruckIcon } from 'hugeicons-react'

function TypeEnregistrement() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/centrale_achats" },
    { label: " Enregistrement", path: "/centrale_achats/enregistrement" },
    { label: id, path: "/centrale_achats/enregistrement/" + id }
  ];
  return (
    <div className=''>
      <div className="px-[5%] py-7 bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      {/* <div className='px-0 md:px-[20%] bg-secondary/10 border-b-2 border-primary/90'>
        <ul className='grid centrale bg-white grid-cols-2 text-white text-[.9rem] md:text-[1rem]'>
          <li><NavLink className="flex p-3 flex-col items-center justify-center gap-0.5" to={"/a/centrale_d_achat/enregistrement/fournisseur"}>
            <TruckIcon strokeWidth={2} className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]' />
            Fournisseur
          </NavLink>
          </li>
          <li><NavLink className="flex p-3 flex-col items-center justify-center gap-0.5" to={"/a/centrale_d_achat/enregistrement/acheteur"}>
            <ShoppingCart01Icon strokeWidth={2} className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]' />
            Acheteur
          </NavLink>
          </li>
        </ul>
      </div> */}
      <div className='px-[5%] md:px-[15%] bg-white flex flex-col gap-6 py-7 max-md:py-8'>
        {id==="fournisseur"?<FormFournisseur compte={id} handleChange={handleChange} image={image} />:
        <FormAcheteur handleChange={handleChange} image={image} />}
      </div>
    </div>
  )
}

export default TypeEnregistrement

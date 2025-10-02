import React from 'react'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import { paddingH } from '../../components/Navbar/CentraleAchat/Headers';
import { useParams } from 'react-router-dom';
import datas from "../../datas/fournisseur.json"

function DetailFournisseur() {
  const { t } = useTranslation()
  const {id}= useParams()
  const fournisseur= datas?.find(x=>x.id===id)


  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/centrale_achats" },
    { label: "Produits", path: "/centrale_achats/produits" },
    { label: fournisseur?.nom, path: "/centrale_achats/produits/"+id },
  ];
  
  return (
    <div>
      <div className="px-[5%] py-[1.5rem] bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className={`px-[${paddingH}] py-12 md:py-16`}>
          Detail Fournisseur
      </div>
    </div>
  )
}

export default DetailFournisseur

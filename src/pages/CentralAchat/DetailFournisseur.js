import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import { paddingH } from '../../components/Navbar/CentraleAchat/Headers';
import { useParams } from 'react-router-dom';
import datas from "../../datas/fournisseur.json"
import currentProducts from "../../datas/produits.json"
import BannerFournisseur from '../../components/Banner/BannerFournisseur';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { CardProduit } from '.';
import SideShop from '../../components/SideShop';

function DetailFournisseur() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("produits");
  const { id } = useParams()
  const fournisseur = datas?.find(x => x.id === id)


  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: "Fournisseurs", path: "/fournisseurs" },
    { label: fournisseur?.nom, path: "/fournisseurs/produits/" + id },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <div className="px-[5%] py-[1.5rem] bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className={`px-[${paddingH}]`}>
        <BannerFournisseur datas={fournisseur} />
        <div className={`flex gap-6 py-12 md:py-12`}>
          <div className='w-[22%] rounded-[7px] sticky top-[15px] h-[650px]'>
            <SideShop />
          </div>
          <div className='w-[78%] flex overflow-hidden flex-col gap-8'>
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 bg-gray-100 border w-full mb-6">
                <TabsTrigger value="produits">Produits</TabsTrigger>
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="police">Police de Confidentialité</TabsTrigger>
                <TabsTrigger value="review">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="produits" className="space-y-5">
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1.5'>
                    <span>Filtré par :</span>
                    <select className='text-[.8rem] outline-0 border p-2.5'>
                      <option>Fitré par le plus populaire</option>
                      <option>Fitré par l'ancien</option>
                      <option>Fitré par le prix : plus pétit</option>
                    </select>
                  </div>
                  <div className=''>
                  <select className='text-[.8rem] outline-0 border p-2.5'>
                      <option>Show 15</option>
                      <option>Show 25</option>
                      <option>Show 30</option>
                    </select>
                  </div>
                </div>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
                  {currentProducts?.map((x, index) => (
                    <CardProduit key={index} x={x} />
                  ))}
                </div>
                {/* <Pagination
                  currentPage={currentPage}
                  totalItems={data?.lenght}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                /> */}
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                A propos de nous
              </TabsContent>

              <TabsContent value="police" className="space-y-4">
                Police de confidentialité
              </TabsContent>

              <TabsContent value="review" className="space-y-4">
                Donnez vos avis
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailFournisseur

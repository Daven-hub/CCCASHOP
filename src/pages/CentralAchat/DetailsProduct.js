import React from 'react'
import Annimated from '../../components/Annimated'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import data from "../../datas/produits.json"
import { Building06Icon, Location01Icon, Mail01Icon, StarIcon, StudentIcon, TelephoneIcon, TruckIcon } from 'hugeicons-react';
import fournisseurs from "../../datas/fournisseur.json"

function DetailsProduct() {
  const { t } = useTranslation();
  const { id } = useParams();

  const produit = data?.find((x) => x.id === id)

  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/centrale_achats" },
    { label: " Produits", path: "/centrale_achats/produits" },
    { label: produit?.titre, path: "/centrale_achats/produits/" + id }
  ];

  const fournisseur = fournisseurs?.find((x) => x.id === produit?.fournisseur)
  const produits = data?.filter((x) => x.fournisseur === fournisseur?.id && x.id !== id)
  return (
    <Annimated>
      <div className="px-[5%] py-7 bg-gray-100">
        <Breadcrumb data={bread} />
      </div>

      <div className='px-[5%] pt-10 pb-12 max-md:py-10 flex max-md:flex-col gap-7 md:gap-8'>
        <div className='w-full md:w-[65%] flex flex-col gap-6'>
          <div className='relative overflow-hidden bg-gray-100 p-8 aspect-video rounded-[6px] h-[330px] md:h-[500px] w-full'>
            <img className='w-full h-full object-contain' src={produit?.image} alt='products_ccca_detail' />
          </div>

          <div className='rounded-[6px] flex flex-col gap-5 border-2 px-4 md:px-6 py-5'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-primary leading-[1.2] text-[1.3rem] md:text-[1.8rem] font-bold'>{produit?.titre}</h1>
              <span className='text-[.85rem] md:text-[1rem] text-gray-700'>{produit?.descrip}</span>
            </div>
            <div className='py-5 px-6 flex justify-between items-center border bg-green-100 rounded-[6px]'>
              <div className='flex gap-3 md:gap-4 items-center'>
                <TruckIcon strokeWidth={2} size={35} />
                <div className='flex flex-col gap-0.5'>
                  <h3 className='text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1]'>{produit?.qte} <sub className='text-[.7rem] md:text-[.8rem] -top-[0px]'>{produit?.meter}</sub></h3>
                  <span className='text-gray-500 text-[.75rem] md:text-[.9rem] font-semibold'>En stock</span>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='flex text-end flex-col gap-0.5'>
                  <h3 className='text-[1.15rem] md:text-[1.45rem] text-primary/90 font-extrabold leading-[1]'>{produit?.pu} <sub className='text-[.7rem] md:text-[.8rem] -top-[.1px]'>{produit?.monaie}</sub></h3>
                  <span className='text-gray-500 text-[.7rem] md:text-[.9rem] font-semibold'>par {produit?.meter}</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 border flex items-center gap-3 rounded-[6px] bg-yellow-100'>
                <StarIcon strokeWidth={2} className='text-yellow-600' size={22} />
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[.95rem] text-yellow-600 font-extrabold leading-[1]'>Qualité</h3>
                  <span className='text-[.9rem] md:text-[1.15rem] text-yellow-900 font-semibold'>{produit?.qalite}</span>
                </div>
              </div>
              <div className='p-4 border flex items-center gap-3 rounded-[6px] bg-blue-50'>
                <Location01Icon strokeWidth={2} className='text-primary/70' size={22} />
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[.9rem] text-primary/70 font-extrabold leading-[1]'>Origine</h3>
                  <span className='text-[.8rem] md:text-[.95rem] text-blue-900 font-semibold'>{produit?.local + ", " + produit?.pays}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-[6px] flex flex-col gap-5 border-2 px-4 md:px-6 py-5'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-primary leading-[1.2] text-[1.3rem] md:text-[1.8rem] font-bold'>Spécification technique</h1>
              {/* <span className='text-[.85rem] md:text-[1rem] text-gray-700'>{produit?.descrip}</span> */}
            </div>
            <div className='py-5 px-6 flex justify-between items-center border bg-green-100 rounded-[6px]'>
              <div className='flex gap-3 md:gap-4 items-center'>
                <TruckIcon strokeWidth={2} size={35} />
                <div className='flex flex-col gap-0.5'>
                  <h3 className='text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1]'>{produit?.qte} <sub className='text-[.7rem] md:text-[.8rem] -top-[0px]'>{produit?.meter}</sub></h3>
                  <span className='text-gray-500 text-[.75rem] md:text-[.9rem] font-semibold'>En stock</span>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='flex text-end flex-col gap-0.5'>
                  <h3 className='text-[1.15rem] md:text-[1.45rem] text-primary/90 font-extrabold leading-[1]'>{produit?.pu} <sub className='text-[.7rem] md:text-[.8rem] -top-[.1px]'>{produit?.monaie}</sub></h3>
                  <span className='text-gray-500 text-[.7rem] md:text-[.9rem] font-semibold'>par {produit?.meter}</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 border flex items-center gap-3 rounded-[6px] bg-yellow-100'>
                <StarIcon strokeWidth={2} className='text-yellow-600' size={22} />
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[.95rem] text-yellow-600 font-extrabold leading-[1]'>Qualité</h3>
                  <span className='text-[.9rem] md:text-[1.15rem] text-yellow-900 font-semibold'>{produit?.qalite}</span>
                </div>
              </div>
              <div className='p-4 border flex items-center gap-3 rounded-[6px] bg-blue-50'>
                <Location01Icon strokeWidth={2} className='text-primary/70' size={22} />
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[.9rem] text-primary/70 font-extrabold leading-[1]'>Origine</h3>
                  <span className='text-[.8rem] md:text-[.95rem] text-blue-900 font-semibold'>{produit?.local + ", " + produit?.pays}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-[35%] flex flex-col gap-6'>
          <div className='border-2 flex flex-col gap-3.5 border-tiers rounded-[8px] px-6 md:px-7 py-5'>
            <div className='flex gap-3 items-center'>
              <div className='w-[65px] bg-primary/5 flex justify-center items-center h-[65px] rounded-full flex-shrink-0'>
                <Building06Icon strokeWidth={1.5} size={34} />
              </div>
              <div className='flex flex-col gap-0'>
                <h1 className='font-extrabold capitalize text-[1.15rem] leading-[1.3]'>{fournisseur?.nom}</h1>
                <span className='text-gray-600 font-bold text-[.85rem]'>{fournisseur?.domaine}</span>
              </div>
            </div>
            <p className='text-[.95rem] font-[500] text-gray-700 text-opacity-95'>{fournisseur?.descrip}</p>
            <div className='flex flex-col gap-3 mt-3.5'>
              <h3 className='font-bold text-[.9rem] flex gap-2 items-center underline'><StudentIcon strokeWidth={2} size={20} />Contact</h3>
              <div className='flex flex-col gap-1.5 text-[.95rem]'>
                <h5 className='font-bold text-primary text-[1rem]'>Mr. Maxime Tsafack</h5>
                <span className='flex items-center gap-2 font-bold text-secondary'><Mail01Icon strokeWidth={2} size={18} /> {fournisseur?.email}</span>
                <span className='flex items-center gap-2 font-bold text-secondary'><TelephoneIcon strokeWidth={2} size={18} /> {fournisseur?.telephone}</span>
                <span className='flex items-center gap-2 font-bold text-secondary'><Location01Icon strokeWidth={2} size={18} /> {fournisseur?.adresse + ", " + fournisseur?.pays}</span>
              </div>

            </div>
          </div>

          <div className='border-2 flex flex-col gap-4 border-tiers rounded-[8px] px-6 md:px-7 py-5'>
            <h1 className='font-extrabold text-[1.05rem] md:text-[1.15rem] leading-[1.3]'>Autres produits de ce fournisseur</h1>
            <div className='flex flex-col gap-3'>
              {produits?.map((x, ind) =>
                <NavLink to={"/a/centrale_d_achat/produits/" + x.id} key={ind} className='border hover:bg-gray-100 py-2 px-2.5 rounded-[7px] flex items-center gap-3'>
                  <img src={x?.image} className='rounded-[7px] flex-shrink-0 object-cover w-[70px] h-[68px]' alt={x?.titre} />
                  <div className='flex flex-col w-full gap-0.5'>
                    <h3 className='text-[.94rem] text-primary font-semibold'>{x?.titre}</h3>
                    <div className='bg-green-100 flex py-1.5 rounded-[7px] items-center w-[100%] justify-between px-2.5'>
                      <div className='flex gap-3 md:gap-4 items-center'>
                        <TruckIcon strokeWidth={2} size={20} />
                        <div className='flex flex-col gap-1'>
                          <h3 className='text-[.8rem] text-primary md:text-[.9rem] font-extrabold leading-[1]'>{produit?.qte} <sub className='text-[.6rem] md:text-[.7rem] -top-[0px]'>{produit?.meter}</sub></h3>
                          <span className='text-gray-500 text-[.6rem] md:text-[.7rem] font-semibold'>En stock</span>
                        </div>
                      </div>
                      <div className='flex gap-4 items-center'>
                        <div className='flex text-end flex-col gap-0.5'>
                          <h3 className='text-[.8rem] text-primary md:text-[.9rem] font-extrabold leading-[1]'>{produit?.pu} <sub className='text-[.6rem] md:text-[.7rem] -top-[.1px]'>{produit?.monaie}</sub></h3>
                          <span className='text-gray-500 text-[.6rem] md:text-[.7rem] font-semibold'>par {produit?.meter}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )}
            </div>
          </div>

          <div className='border-2 flex flex-col gap-4 border-tiers rounded-[8px] px-6 md:px-7 py-5'>
            <h1 className='font-extrabold text-[1.05rem] md:text-[1.15rem] leading-[1.3]'>Autres produits similaire</h1>
            <div className='flex flex-col gap-3'>
              {produits?.map((x, ind) =>
                <NavLink to={"/a/centrale_d_achat/produits/" + x.id} key={ind} className='border hover:bg-gray-100 py-2 px-2.5 rounded-[7px] flex items-center gap-3'>
                  <img src={x?.image} className='rounded-[7px] flex-shrink-0 object-cover w-[70px] h-[68px]' alt={x?.titre} />
                  <div className='flex flex-col w-full gap-0.5'>
                    <h3 className='text-[.94rem] text-primary font-semibold'>{x?.titre}</h3>
                    <div className='bg-green-100 flex py-1.5 rounded-[7px] items-center w-[100%] justify-between px-2.5'>
                      <div className='flex gap-3 md:gap-4 items-center'>
                        <TruckIcon strokeWidth={2} size={20} />
                        <div className='flex flex-col gap-1'>
                          <h3 className='text-[.8rem] text-primary md:text-[.9rem] font-extrabold leading-[1]'>{produit?.qte} <sub className='text-[.6rem] md:text-[.7rem] -top-[0px]'>{produit?.meter}</sub></h3>
                          <span className='text-gray-500 text-[.6rem] md:text-[.7rem] font-semibold'>En stock</span>
                        </div>
                      </div>
                      <div className='flex gap-4 items-center'>
                        <div className='flex text-end flex-col gap-0.5'>
                          <h3 className='text-[.8rem] text-primary md:text-[.9rem] font-extrabold leading-[1]'>{produit?.pu} <sub className='text-[.6rem] md:text-[.7rem] -top-[.1px]'>{produit?.monaie}</sub></h3>
                          <span className='text-gray-500 text-[.6rem] md:text-[.7rem] font-semibold'>par {produit?.meter}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </Annimated>
  )
}

export default DetailsProduct

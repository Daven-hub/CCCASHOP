import React from 'react'
import { useTouteCategorie } from './Navbar/CentraleAchat/HeadersBottom';
// import { categories } from './Navbar/CentraleAchat/HeadersBottom';

function SideShop() {
      const {categories,isLoading,loadTime,error}=useTouteCategorie();
      return (
            <div className='flex flex-col gap-4'>
                  {/* catégories */}
                  <div className='flex flex-col gap-1'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Toutes les catégories</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {isLoading && <span className='text-sm text-gray-500'>Chargement des catégories...</span>}
                                          {!isLoading && (
                              categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x?.nom}</li>
                              ))}
                        </ul>
                  </div>
                  {/* sous-catégories */}
                  <div className='border-t'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Sous catégorie</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {isLoading && <span className='text-sm text-gray-500'>Chargement des catégories...</span>}
                                          {!isLoading && (
                              categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x?.nom}</li>
                              ))}
                        </ul>
                  </div>
                  {/* prices */}
                  <div className='border-t'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Prix</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {isLoading && <span className='text-sm text-gray-500'>Chargement des catégories...</span>}
                                          {!isLoading && (
                              categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x?.nom}</li>
                              ))}
                        </ul>
                  </div>
            </div>
      )
}

export default SideShop;

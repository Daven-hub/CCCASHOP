import React from 'react'
import { categories } from './Navbar/CentraleAchat/HeadersBottom';

function SideShop() {
      return (
            <div className='flex flex-col gap-4'>
                  {/* catégories */}
                  <div className='flex flex-col gap-1'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Toutes les catégories</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x.label}</li>
                              )}
                        </ul>
                  </div>
                  {/* sous-catégories */}
                  <div className='border-t'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Sous catégorie</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x.label}</li>
                              )}
                        </ul>
                  </div>
                  {/* prices */}
                  <div className='border-t'>
                        <div className='text-[1.15rem] py-2 font-medium'>
                              <span>Prix</span>
                        </div>
                        <ul className='flex pl-2 text-gray-700 text-[.95rem] flex-col gap-2'>
                              {categories?.slice(0,5)?.map((x, ind) =>
                                    <li key={ind}>{x.label}</li>
                              )}
                        </ul>
                  </div>
            </div>
      )
}

export default SideShop;

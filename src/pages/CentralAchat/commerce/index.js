import React from 'react'
import HeadersBottom from '../../../components/Navbar/CentraleAchat/HeadersBottom'
import { CardFournisseur, CardProduit } from '..'
import data from "../../../datas/produits.json"
import datas from "../../../datas/fournisseur.json"
import { NavLink } from 'react-router-dom'
import { CheckListIcon, MoveRightIcon } from 'hugeicons-react'
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import { FaCheck } from 'react-icons/fa'

function Commerce() {

      const avantages=[
            "Paiement securisé",
            "Engagement envers l'authenticité",
            "Garantie de remboursement globale",
            "Directives strictes pour les concessionnaires",
            "Envois assurés",
            "Qualité des produits"
      ]

      return (
            <div className='flex flex-col'>
                  <HeadersBottom />
                  <div className={`flex gap-5 px-[${paddingH}] py-12 md:py-16 flex-col`}>
                        <div className='pb-1 flex justify-between items-end border-b-2 border-dashed border-primary/70 '><h2 className='text-[2rem] font-bold text-primary'>Nos produits</h2>
                              <NavLink className="text-[.85rem] flex items-center gap-2 text-black/70 font-semibold underline" to={"#"}>Listes des produits <MoveRightIcon size={12} /></NavLink>
                        </div>
                        <div className='grid gap-5 grid-cols-1 md:grid-cols-5'>
                              {data?.slice(0,10)?.map((x, index) => (
                                    <CardProduit key={index} x={x} />
                              ))}
                        </div>
                  </div>
                  <div className={`flex gap-8 px-[${paddingH}]`}>
                        <div className='w-[60%] h-[270px] rounded-[6px] bg-green-600'></div>
                        <div className='w-[40%] rounded-[6px] bg-red-600'></div>
                  </div>
                  <div className={`flex gap-5 px-[${paddingH}] py-12 md:py-16 flex-col`}>
                        <div className='pb-1.5 flex justify-between items-end border-b-2 border-dashed border-primary/70 '><h2 className='text-[2rem] font-bold text-primary'>Articles recherchés par les acheteurs</h2>
                              <NavLink className="text-[.85rem] flex items-center gap-2 text-black/70 font-semibold underline" to={"#"}>Listes des produits <MoveRightIcon size={12} /></NavLink>
                        </div>
                        <div className='grid gap-6 grid-cols-1 md:grid-cols-5'>
                              {data?.slice(0,5)?.map((x, index) => (
                                    <CardProduit key={index} x={x} />
                              ))}
                        </div>
                  </div>
                  <div className={`px-[${paddingH}]`}>
                        <div className='grid grid-cols-2 rounded-[7px] overflow-hidden'>
                              <div className={`px-16 flex flex-col gap-7 py-12 md:py-14 bg-primary`}>
                                    <h3 className='text-[2.2rem] leading-[1.2] font-bold text-white'>Protection des acheteurs</h3>
                                    <ul className='flex flex-col gap-3.5 text-[1.2rem] text-white'>
                                          {avantages?.map((x,ind)=>
                                                <li key={ind} className='flex gap-3 items-center'><FaCheck className='text-green-600' />{x}</li>
                                          )}
                                    </ul>
                                    <NavLink to={"#"} className="text-white mt-1.5 border border-white flex justify-center items-center p-3 rounded-[7px]">Devenir Acheteur</NavLink>
                              </div>
                              <div className='relative'>
                                    <img src={"/banAcheteur.jpg"} className='
                                    w-full absolute top-0 left-0 h-full object-cover' alt='ccca_banière_acheteur' />
                                     <div className='absolute w-full h-full z-[1] left-0 top-0 bg-gradient-to-t from-primary/95 to-primary/30'></div>
                              </div>
                        </div>
                  </div>
                  <div className={`flex gap-5 px-[${paddingH}] py-12 md:py-16 flex-col`}>
                        <div className='flex justify-between items-end'><h2 className='text-[2rem] leading-[1.2] font-bold text-primary'>Commander par fournisseur</h2>
                        </div>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-6'>
                              {datas?.slice(0,6)?.map((item, ind) =>
                                    <NavLink to={"/centrale_achats/fournisseurs/"+item?.id} className='border shadow-sm aspect-video rounded-[6px] flex items-center justify-center p-1 ' key={ind}>
                                          <img className='w-[90%] rounded-[6px] object-contain h-[90%]' src={item?.image} alt={item?.nom} />
                                    </NavLink>
                              )}
                        </div>
                  </div>
            </div>
      )
}

export default Commerce

import React from 'react'
import HeadersBottom from '../../../components/Navbar/CentraleAchat/HeadersBottom'
import { CardFournisseur, CardProduit } from '..'
import data from "../../../datas/produits.json"
import datas from "../../../datas/fournisseur.json"
import { NavLink } from 'react-router-dom'
// import { CheckListIcon, MoveRightIcon } from 'hugeicons-react'
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import { FaCheck } from 'react-icons/fa'
import { MoveRight } from 'lucide-react'
import PresentationLabel from '../../../components/PresentationLabel'

function Commerce() {

      const avantages = [
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
                  <div className={`flex gap-5 px-[${paddingH}] py-10 md:py-14 flex-col`}>
                        <PresentationLabel titre={"Produits en vedette"} Component={<NavLink className="text-[.8rem] flex items-center gap-2 text-black/70 font-semibold hover:underline" to={"#"}>Listes des produits <MoveRight size={14} /></NavLink>} />
                        <div className='grid gap-5 grid-cols-1 md:grid-cols-5'>
                              {data?.slice(0, 10)?.map((x, index) => (
                                    <CardProduit key={index} x={x} />
                              ))}
                        </div>
                  </div>
                  <div className={`grid grid-cols-1 pt-4 pb-8 md:grid-cols-2 gap-8 px-[${paddingH}]`}>
                        <div className='h-[250px] border relative overflow-hidden rounded-[6px]'>
                              <img src={"/produits/bann3.jpg"} className='absolute object-cover object-right left-0 top-0 w-full h-full' alt='ccca_top_product' />
                        </div>
                        <div className='rounded-[6px] border overflow-hidden h-[250px] relative bg-red-600'>
                              <img src={"/produits/banb1.jpg"} className='absolute object-right left-0 top-0 w-full h-full' alt='ccca_top_product' />
                        </div>
                  </div>
                  <div className={`flex gap-5 px-[${paddingH}] py-10 md:py-14 flex-col`}>
                        <PresentationLabel titre={"Articles recherchés par les acheteurs"} Component={<NavLink className="text-[.8rem] flex items-center gap-2 text-black/70 font-semibold hover:underline" to={"#"}>Listes des produits <MoveRight size={15} /></NavLink>} />
                        <div className='grid gap-5 grid-cols-1 md:grid-cols-5'>
                              {data?.slice(0, 5)?.map((x, index) => (
                                    <CardProduit key={index} x={x} />
                              ))}
                        </div>
                  </div>
                  <div className={`px-[${paddingH}]`}>
                        <div className='grid grid-cols-2 rounded-[7px] overflow-hidden'>
                              <div className={`px-16 flex flex-col gap-7 py-12 md:py-14 bg-primary/90`}>
                                    <h3 className='text-[2.2rem] leading-[1.2] font-bold text-white'>Protection des acheteurs</h3>
                                    <ul className='flex flex-col gap-3.5 text-[1.15rem] text-white'>
                                          {avantages?.map((x, ind) =>
                                                <li key={ind} className='flex gap-3 items-center'><FaCheck className='text-green-600' />{x}</li>
                                          )}
                                    </ul>
                                    <NavLink to={"#"} className="text-white mt-1.5 border border-white flex justify-center items-center p-2.5 rounded-[7px]">Devenir Acheteur</NavLink>
                              </div>
                              <div className='relative'>
                                    <img src={"/banAcheteur.jpg"} className='
                                    w-full absolute top-0 left-0 h-full object-cover' alt='ccca_banière_acheteur' />
                                    <div className='absolute w-full h-full z-[1] left-0 top-0 bg-gradient-to-t from-primary/90 to-primary/40'></div>
                              </div>
                        </div>
                  </div>
                  <div className={`flex gap-5 px-[${paddingH}] py-12 md:py-16 flex-col`}>
                        <PresentationLabel titre={"Commander par fournisseur"} Component={""} />
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-6'>
                              {datas?.slice(0, 6)?.map((item, ind) =>
                                    <NavLink to={"/fournisseurs/" + item?.id} className='border shadow-sm aspect-video rounded-[6px] flex items-center justify-center p-1 ' key={ind}>
                                          <img className='w-[90%] rounded-[6px] object-contain h-[90%]' src={item?.image} alt={item?.nom} />
                                    </NavLink>
                              )}
                        </div>
                  </div>
            </div>
      )
}

export default Commerce

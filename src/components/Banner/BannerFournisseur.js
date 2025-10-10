import React from 'react'
import * as Avatar from "@radix-ui/react-avatar";
import { Location01Icon, TelephoneIcon } from 'hugeicons-react';
import { MdEmail } from 'react-icons/md';
import StarRating from '../ui/StarRating';

function BannerFournisseur({ datas }) {
      // console.log(datas)
      return (
            <div className='h-[350px] relative rounded-[6px]'>
                  <img src={datas?.couvert} alt="banner" className='w-full object-top h-full object-cover rounded-[6px] absolute top-0 left-0' />
                  <div className='absolute bottom-0 py-3 left-0 px-[19%] flex flex-col gap-2 w-full bg-black/70'>
                             <h3 className='text-[1.6rem] font-bold capitalize text-white'>{datas?.nom}</h3>
                             <div className='flex gap-1.5 text-[.95rem] font-light flex-col'>
                                    <p className='flex items-center gap-3 text-white/80 font-semibold'><Location01Icon size={20}/> {datas?.adresse+" ,"+datas?.pays}</p>
                                    <p className='flex items-center gap-3 text-white/80 font-semibold'><TelephoneIcon size={20}/> {datas?.telephone}</p>
                                    <p className='flex items-center gap-3 text-white/80 font-semibold'><MdEmail size={20}/> {datas?.email}</p>
                             </div>
                             <div className="absolute flex flex-col justify-center items-center gap-2 bottom-[23%] left-[5%]">
                                    <div className='bg-white p-4 rounded-full border flex items-center gap-4'>
                                          <Avatar.Root className="AvatarRoot inline-flex w-[110px] h-[110px] object-cover rounded-full items-center justify-center align-middle">
                                                <Avatar.Image
                                                      className="AvatarImage"
                                                      src={datas?.image}
                                                      alt={datas?.nom}
                                                />
                                                <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
                                                      {datas?.nom?.charAt(0)?.toUpperCase()}
                                                </Avatar.Fallback>
                                          </Avatar.Root>
                                    </div>
                                    <StarRating rating={3} />
                              </div>
                  </div>
            </div>
      )
}

export default BannerFournisseur

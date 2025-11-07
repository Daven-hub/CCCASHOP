import React from 'react'
import * as Avatar from "@radix-ui/react-avatar";
import { Location01Icon, TelephoneIcon } from 'hugeicons-react';
import { MdEmail } from 'react-icons/md';
import StarRating from '../ui/StarRating';
import { BaseUrl } from '../../config';

function BannerFournisseur({ datas,email }) {
      // console.log(datas)
      return (
            <div className='h-[250px] relative rounded-[6px]'>
                  <img src={datas?.couverture?BaseUrl+datas?.couverture:'/images/baniere.jpg'} alt="banner" className='w-full object-top h-full object-cover rounded-[6px] absolute top-0 left-0' />
                  <div className='absolute bottom-0 py-3 left-0 px-[19%] flex flex-col gap-2 w-full bg-black/70'>
                             <h3 className='text-[1.4rem] font-bold capitalize text-white'>{datas?.shopname}</h3>
                             <div className='flex gap-1.5 text-[.9rem] font-light flex-col'>
                                    <p className='flex items-center gap-3 text-white/80 font-semibold'><Location01Icon size={18}/> {datas?.adresse1+" ,"+datas?.pays}</p>
                                    {/* <p className='flex items-center gap-3 text-white/80 font-semibold'><TelephoneIcon size={18}/> {datas?.telephone}</p> */}
                                    <p className='flex items-center gap-3 text-white/80 font-semibold'><MdEmail size={18}/> {email}</p>
                             </div>
                             <div className="absolute flex flex-col justify-center items-center gap-2 bottom-[23%] left-[5%]">
                                    <div className='bg-white relaive p-4 overflow-hidden rounded-full border flex items-center gap-4'>
                                          <Avatar.Root className="AvatarRoot inline-flex w-[80px] h-[80px] object-cover rounded-full items-center justify-center align-middle">
                                                <Avatar.Image
                                                      className="AvatarImage w-full h-full rounded-full object-cover"
                                                      src={BaseUrl+datas?.profile}
                                                      alt={datas?.shopname}
                                                />
                                                <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
                                                      {datas?.shopname?.charAt(0)?.toUpperCase()}
                                                </Avatar.Fallback>
                                          </Avatar.Root>
                                    </div>
                                    <StarRating rating={datas?.rating} />
                              </div>
                  </div>
            </div>
      )
}

export default BannerFournisseur

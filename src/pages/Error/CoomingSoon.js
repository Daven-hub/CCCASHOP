import React from 'react'
import Footer from '../../components/Footer'
import logo from '../assets/1x/icone.png'
import logo1 from '../assets/1x/icone.png'
import Navsbar from '../components/Navbar/Navsbar'
import { NavLink } from 'react-router-dom'

export default function CoomingSoon() {
    return (
        <>
            <Navsbar logo={logo} logos={logo1} />
            <div className='bg-[#F7F9F9] h-[calc(90vh-50px)] flex flex-col items-center justify-center'>
                <span className='font-semibold text-[3rem] max-md:text-[1.4rem] text-center'>Site en cour de construction ...</span>
                <span className='font-medium space-x-3'>Nous contactez via <NavLink className={'text-blue-700 font-semibold'} to={'mailto:info@cc-ca.ca'}>info@cc-ca.ca</NavLink></span>
                <NavLink className='bg-primary text-white mt-4 text-[.82rem] px-4 py-2 rounded-md' to={'/'}>Retour vers la page d'acceuil</NavLink>
            </div>
            <Footer />
        </>
  )
}

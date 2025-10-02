import React from 'react'
import Navsbar from '../../components/Navbar/Navsbar'
import logo from '../../assets/1x/icone.png'
import logo1 from '../../assets/1x/icone.png'
import Footer from '../../components/Footer'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
    <Navsbar logo={logo} logos={logo1} />
    <div className="flex flex-col items-center justify-center h-[65vh] bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page non trouvée</p>
      <NavLink
        to="/a"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Retour à l'accueil
      </NavLink>
    </div>
    <Footer />
    </>
  )
}

import React from 'react'
import Headers from '../../components/Navbar/CentraleAchat/Headers'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

function LayoutsCommerce() {
  return (
    <>
      <Headers />
      {/* <div className='bg-gray-50'> */}
      <Outlet />
      {/* </div> */}
      <Footer />
    </>
  )
}

export default LayoutsCommerce

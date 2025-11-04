import React from 'react'
import HeadersBottomOther from '../../components/Navbar/CentraleAchat/HeadersBottomOther'
import { Outlet } from 'react-router-dom'

function LayoutOtherPage() {
  return (
    <div className='flex flex-col'>
      <HeadersBottomOther />
      <Outlet />
    </div>
  )
}

export default LayoutOtherPage
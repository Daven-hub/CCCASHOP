import React from 'react'
import HeadersBottomOther from '../../components/Navbar/CentraleAchat/HeadersBottomOther'
import { Outlet } from 'react-router-dom'

function LayoutOtherPage() {
  return (
    <div className='flex flex-col bg-soft-gradient bg-[length:400%_400%] animate-gradient-move'>
      <HeadersBottomOther />
      <Outlet />
    </div>
  )
}

export default LayoutOtherPage
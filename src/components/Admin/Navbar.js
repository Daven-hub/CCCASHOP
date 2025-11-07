import React, { useEffect, useRef, useState } from 'react'
import { Menu01Icon } from 'hugeicons-react'
import { FlagIcon } from 'react-flag-kit'
import { useTranslation } from 'react-i18next'
import UserMenu from '../UserMenu'
import { useAuth } from '../../context/authContext'

export const getFlag = lang => {
  switch (lang) {
    case 'fr':
      return <FlagIcon code='FR' size={17} />
    case 'de':
      return <FlagIcon code='DE' size={17} />
    case 'es':
      return <FlagIcon code='ES' size={17} />
    case 'dk':
      return <FlagIcon code='DK' size={17} />
    case 'nl':
      return <FlagIcon code='NL' size={17} />
    default:
      return <FlagIcon code='GB' size={17} />
  }
}

function Navbar ({ toggleSidebar }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(
    localStorage.getItem('i18nextLngsa') || i18n.language
  )

  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const { isLoading } = useAuth()

  return (
    <nav className='w-full sticky top-0 bg-white shadow-md z-[1] shadow-gray-100 border-gray-300 flex items-center justify-between px-6 max-md:px-[4%] py-3 max-md:py-2.5 border-b'>
      <div className='flex items-center gap-3 w-[55%]'>
        <div className='cursor-pointer flex-shrink-0 btn-menu'>
          <Menu01Icon size={30} />
        </div>
        <input
          id='recherche'
          className='bg-gray-50 border border-black/10 text-[.85rem] rounded-full max-md:hidden px-5 w-[60%] py-2.5 focus:outline-none'
          type='text'
          placeholder='Rechercher ...'
        />
      </div>
      <div className='flex gap-4 items-center'>
        <div className='flex w-[35px] h-[35px] justify-center rounded-full border items-center font-bold text-gray-700 gap-2'>
          {getFlag(language)}
          {/* <FaChevronDown /> */}
        </div>
        <div className='pl-4 border-l border-gray-200'>
          {isLoading ? (
            <div className='flex items-center gap-2 animate-pulse'>
              <div className='flex flex-col gap-1'>
                <div className='w-24 h-3 bg-gray-300/60 rounded'></div>
                <div className='w-16 h-3 bg-gray-300/50 rounded'></div>
              </div>
              <div className='w-10 h-10 rounded-full bg-gray-300/70' />
            </div>
          ) : (
            <UserMenu isAdmin={false} />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

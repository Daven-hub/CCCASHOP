import React from 'react'
import Breadcrumbs from './Breadcumbs'
import { FaTable, FaTh } from 'react-icons/fa'

export default function Breads({title,breadcrumbLinks}) {
  return (
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h2 className="text-[1.4rem] font-semibold text-primary capitalize">
            {title}
          </h2>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
        <div className="flex space-x-2 ml-auto">
          <button className={`px-5 rounded-md py-2 bg-primary text-white`}>
            <FaTable />
          </button>
          <button
            className={`px-5 rounded-md py-2 text-primary border-2 border-primary`}
          >
            <FaTh />
          </button>
        </div>
      </div>
  )
}

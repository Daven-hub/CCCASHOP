import React from 'react'

export default function Unauthorized() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-[65vh] bg-gray-100 text-gray-800">
      <h1 className="text-7xl font-bold">305</h1>
      <p className="text-lg mt-2">Page non Autorisée</p>
      <button
        onClick={()=>window.history.back()}
        className="mt-2.5 text-lg px-8 py-1.5 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Retour
      </button>
    </div>
    </>
  )
}

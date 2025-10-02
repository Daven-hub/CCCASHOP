import React from 'react'

export default function NotFoun() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-[65vh] bg-gray-100 text-gray-800">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-lg mt-3">Page non trouvée</p>
      <button
        onClick={()=>window.location.reload()}
        className="mt-2 text-lg px-8 py-1.5 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Actualisez
      </button>
    </div>
    </>
  )
}

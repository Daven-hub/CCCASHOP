import { RefreshIcon } from 'hugeicons-react'
import React from 'react'

function Offline() {
  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-center">
      <div className="bg-white flex flex-col justify-center items-center py-24 max-md:py-16 px-[5%] w-full">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 11.75 12a9 9 0 0120.25 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 max-md:text-lg">Oops! Vous êtes hors ligne</h1>
        <p className="text-gray-600 mb-6 text-center">
          Il semble que vous n'ayez pas de connexion Internet. Veuillez vérifier votre réseau et réessayer.
        </p>
        <button
          className="bg-primary text-white flex items-center justify-center gap-3 px-8 rounded-sm py-2 max-md:w-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75"
          onClick={() => window.location.reload()}
        >
          <RefreshIcon size={16}/>Réessayer 
        </button>
        <div className="mt-8">
          <p className="text-sm max-md:text-[.8rem] text-gray-500 text-center">Besoin d'aide ? Contactez votre administrateur réseau.</p>
        </div>
      </div>
    // </div>
  )
}

export default Offline

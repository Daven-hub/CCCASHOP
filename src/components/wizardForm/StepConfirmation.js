import { CheckCircle, CheckCircle2Icon } from 'lucide-react'
import React from 'react'

export default function StepConfirmation (props) {
  return (
    <div className='text-center flex flex-col pb-3 items-center justify-center gap-5 w-full'>
      {/* <h3 className="text-lg font-medium mb-4">Confirmation</h3> */}
      {/* <p className="text-gray-600 mb-4">
        Vérifiez vos informations avant de soumettre votre demande d’ouverture de boutique.
      </p> */}
      <div className="flex flex-col items-center justify-center gap-0">
        <CheckCircle2Icon size={70} className='text-white fill-green-600' />
        <h3 className='text-lg text-primary font-semibold'>
          Votre Boutique est pret!
        </h3>
      </div>
      <button
        onClick={props.previousStep}
        className='px-14 w-fit py-2.5 bg-primary text-white rounded hover:bg-primary/70'
      >
        Redirigez vers votre Tableau de Bord
      </button>
    </div>
  )
}

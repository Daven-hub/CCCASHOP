import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../../../ui/dialog'
import { Loader2 } from 'lucide-react'
import { Button } from '../../../ui/Button'

function CreateValeur ({
  open,
  setOpen,
  onSubmit,
  connexion,
  loading,
  errorLog,
  type
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Créer une valeur</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4 text-[.9rem]'>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>
              Valeur de l'attribut
            </label>
            <input
              type={type}
              className={`mt-1 w-full border rounded-lg px-3 ${type==='text'?'py-2':'h-[40px]'} focus:ring-2 focus:ring-blue-500`}
              {...connexion('value', { required: 'Ce champs est obligatoire' })}
            />
            {errorLog.value && (
              <p className='text-red-500 text-xs mt-1'>
                {errorLog.value.message}
              </p>
            )}
          </div>

          <Button
            type='submit'
            className='w-full mt-1.5 flex item-center justify-center text-white'
          >
            {loading ? (
              <Loader2 className='animate-spin h-5 w-5 text-white' />
            ) : (
              'Enregistrer'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateValeur

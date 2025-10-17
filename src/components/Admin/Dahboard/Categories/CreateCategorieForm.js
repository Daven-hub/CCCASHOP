import React, { useState } from 'react'
import IconPicker from '../../../IconePicker'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '../../../ui/Button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../../../ui/dialog'
import { Loader2 } from 'lucide-react'

function CreateCategorie ({
  open,
  setOpen,
  onSubmit,
  connexion,
  control,
  loading,
  errorLog
}) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4 text-[.9rem]'>
          <div className='grid grid-cols-2 gap-3'>
            <Controller
              name='icon'
              control={control}
              render={({ field }) => (
                <IconPicker value={field.value} onChange={field.onChange} />
              )}
            />
            <div className='relative'>
              <label className='text-sm font-medium text-gray-600'>
                Thumbnail
              </label>
              <input
                type='file'
                className='flex border-2 w-full mt-[0.4rem] px-3 py-[0.315rem] rounded-[5px] outline-0'
                accept='image/*'
                placeholder='profile *'
                {...connexion('profile', { required: false })}
              />
              {errorLog.profile && (
                <p className='text-[.7rem] text-red-600'>
                  Vous deviez renseigner le champs password
                </p>
              )}
            </div>
          </div>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>Nom</label>
            <input
              type='text'
              placeholder='Ex: Électronique'
              className='mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500'
              {...connexion('nom', { required: 'Champs nom require' })}
            />
            {errorLog.nom && (
              <p className='text-red-500 text-xs mt-1'>
                {errorLog.nom.message}
              </p>
            )}
          </div>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>
              Description
            </label>
            <textarea
              rows={4}
              placeholder='Ex: Électronique'
              className='mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500'
              {...connexion('description', { required: false })}
            />
            {errorLog.description && (
              <p className='text-red-500 text-xs mt-1'>
                {errorLog.description.message}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full flex item-center justify-center text-white'>
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

export default CreateCategorie

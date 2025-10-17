import React, { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../ui/select'
import { IconRenderer } from '../../../../lib/IconeRenderer'

function CreateSousCategorie ({
  open,
  setOpen,
  onSubmit,
  connexion,
  control,
  loading,
  errorLog,
  categories
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Créer une sous catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4 text-[.9rem]'>
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
              Catégorie
            </label>
            <Controller
              name='idCategorie'
              control={control}
              rules={{ required: 'La catégorie est obligatoire' }}
              render={({ field, fieldState }) => {
                const selectedCat = categories?.find(
                  cat => cat.idcategorie.toString() === field.value
                )

                return (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'>
                        {selectedCat ? (
                          <div className='flex items-center gap-3'>
                            <IconRenderer iconName={selectedCat.icon} size={20}/>
                            <span>{selectedCat.nom}</span>
                          </div>
                        ) : (
                          <SelectValue placeholder='Choisir une catégorie' />
                        )}
                      </SelectTrigger>

                      <SelectContent>
                        {categories?.map(cat => (
                          <SelectItem
                            key={cat.idcategorie}
                            value={cat.idcategorie}
                          >
                            <div className='flex items-center gap-2.5'>
                              <IconRenderer iconName={cat.icon} size={18} />
                              {cat.nom}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p className='text-red-500 text-xs mt-1'>
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )
              }}
            />
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

export default CreateSousCategorie

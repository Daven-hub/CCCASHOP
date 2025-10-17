import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
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
// import { IconRenderer } from '../../../../lib/IconeRenderer'

function CreateAttribute ({
  open,
  setOpen,
  onSubmit,
  connexion,
  control,
  loading,
  errorLog,
  subcategories
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Créer un attribut</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4 text-[.9rem]'>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>Nom</label>
            <input
              type='text'
              placeholder='Ex: Électronique'
              className='mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500'
              {...connexion('name', { required: 'Champs nom require' })}
            />
            {errorLog.name && (
              <p className='text-red-500 text-xs mt-1'>
                {errorLog.name.message}
              </p>
            )}
          </div>

          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>
              Sous-catégorie
            </label>
            <Controller
              name='idSubcategorie'
              control={control}
              rules={{ required: 'La sous-categorie est obligatoire' }}
              render={({ field, fieldState }) => {
                const selectedCat = subcategories?.find(
                  cat => cat.idsubcateg.toString() === field.value
                )

                return (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'> 
                          {selectedCat ? (
                            <span>{selectedCat.nom}</span>
                          ) : (
                            <SelectValue placeholder="Choisir une sous-catégorie" />
                          )}
                      </SelectTrigger>

                      <SelectContent>
                        {subcategories?.map(cat => (
                          <SelectItem
                            key={cat.idsubcateg}
                            value={cat.idsubcateg}
                          >
                              {cat.nom}
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

          <div className='relative'>
            <label className='text-sm font-medium text-gray-600'>
              Type de colonne
            </label>
            <Controller
              name='type'
              control={control}
              rules={{ required: 'Le type de champs est obligatoire' }}
              render={({ field, fieldState }) => {
                const selectedCat = subcategories?.find(
                  cat => cat.idsubcateg.toString() === field.value
                )

                return (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'> 
                            <SelectValue placeholder="Choisir le type de champs de l'attribut" />
                      </SelectTrigger>

                      <SelectContent>
                        {['color','text']?.map(cat => (
                          <SelectItem
                            key={cat}
                            value={cat}
                          >
                              {cat}
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

export default CreateAttribute

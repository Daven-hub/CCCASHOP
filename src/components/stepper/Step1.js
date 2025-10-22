import { useState } from 'react'
import { Controller} from 'react-hook-form'
import SelectInputWithRef from '../ui/SelectInputWithRef'
import { MoveRight } from 'lucide-react'

export default function Step1 ({
  nextStep,
  setFormData,
  formData,
  categories,
  subcategories,
  register,
  setValue,
  control,
  reset,
  handleSubmit,
  unregister,
  watch,
  errors
}) {
  const [image, setImage] = useState(null)

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  const allCategories = categories?.map(x => {
    return {
      value: x?.idcategorie,
      label: x?.nom
    }
  })
  const idsub = watch()?.idCategorie
  const allSubCategorie = subcategories
    ?.filter(x => x.idCategorie === idsub)
    .map(y => {
      return {
        value: y?.idsubcateg,
        label: y?.nom
      }
    })

  const handleChange = (onChange, value) => {
    setValue('idsubcateg', '')
    onChange?.(value)
  }

   const onSubmit = async data => {
    await setFormData({ ...formData, ...data })
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-3.5 text-[.95rem]'
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-7 items-start'>
        <div className='space-y-2.5 md:col-span-2 w-full'>
          <div className='flex flex-col'>
            <label>Nom du produit</label>
            <input
              type='text'
              {...register('nom', { required: true })}
              className='border-2 rounded-[5px] p-2'
              placeholder='Ex: T-shirt en coton bio'
            />
            {errors.nom && (
              <p className='text-red-500 text-xs mt-0.5'>Ce champ est requis</p>
            )}
          </div>
          <div className='flex flex-col'>
            <label>Catégorie</label>
            <Controller
              name='idCategorie'
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <SelectInputWithRef
                    {...field}
                    attributeType="text"
                    options={allCategories}
                    placeholder='Choisir une catégorie'
                    value={field.value || ''}
                    onChange={event =>
                      handleChange(field.onChange, event.target.value)
                    }
                  />
                  {fieldState.error && (
                    <p className='text-red-500 text-xs mt-0.5'>
                      Ce champ est requis
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <label>Sous-catégorie</label>
            <Controller
              name='idsubcateg'
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <SelectInputWithRef
                    {...field}
                    options={allSubCategorie}
                    placeholder='Choisir une sous-catégorie'
                    value={field.value || ''}
                    onChange={event => field.onChange(event.target.value)}
                  />
                  {fieldState.error && (
                    <p className='text-red-500 text-xs mt-0.5'>
                      Ce champ est requis
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <label>Tags</label>
            <input
              type='text'
              {...register('tag')}
              placeholder='Ex: vêtements, coton, bio'
              className='border-2 rounded-[5px] p-2'
            />
            <p className='text-[.6rem] leading-[1] text-gray-400 mt-0.5'>
              Sépare les tags par des virgules
            </p>
          </div>
        </div>
        <div className='md:col-span-1 w-full flex flex-col gap-1 h-full'>
          <label className='block font-medium'>Thumbnail</label>
          <div className='relative flex-1'>
            <input
              type='file'
              id='upload'
              accept='image/*'
              className='hidden'
              {...register('profile')}
              onChange={e => {
                register('profile').onChange(e)
                handleImageChange(e)
              }}
            />
            <label
              htmlFor='upload'
              className='w-full relative h-full min-h-[270px] border-2 border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-gray-50'
            >
              {image ? (
                <img
                  src={image}
                  alt='Uploaded'
                  className='absolute w-full h-full object-contain rounded-xl'
                />
              ) : (
                <p className='text-gray-400'>Cliquez pour ajouter</p>
              )}
            </label>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex flex-col'>
          <label>Description</label>
          <textarea
            {...register('description')}
            className='border-2 rounded-[5px] p-2'
            rows={4}
            placeholder='Décris ton produit...'
          />
        </div>
        <div className='flex items-center gap-2'>
          <input type='checkbox' {...register('hasVariation')} />
          <label>Ce produit possède des variations?</label>
        </div>
      </div>

      <div className='flex justify-end pt-3.5 border-t-2'>
        <button
                  type='submit'
                  className='bg-primary text-white flex items-center gap-2 px-4 py-2 rounded'
                >
                  Suivant
                  <MoveRight />
                </button>
      </div>
    </form>
  )
}

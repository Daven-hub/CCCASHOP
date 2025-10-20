import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { PlusIcon, TrashIcon, MoveLeft, MoveRight } from 'lucide-react'
import useAttributsDisponibles from '../../hook/useAttributeDisponible'
import SelectInputWithRef from '../ui/SelectInputWithRef'

const generateSKU = (index, sousCategorie) => {
  const prefix = sousCategorie?.substring(0, 3).toUpperCase() || 'PRD'
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${index + 1}-${randomPart}`
}

export default function Step2 ({
  nextStep,
  previousStep,
  setFormData,
  formData,
  watching,
  attributeValues,
  attributes,
  subcategories
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: formData
  })

  const sousCategorie = subcategories?.find(
    x => x.idsubcateg === watching('idsubcateg')
  )?.nom

  const attributsDisponibles = useAttributsDisponibles(
    subcategories,
    attributes,
    attributeValues
  )

  const attributsSousCategorie = attributsDisponibles[sousCategorie] || []

  const getValueData = x => {
    return attributsSousCategorie[x] || []
  }

  const {
    fields: variations,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'variations'
  })

  const hasVariation = watching()?.hasVariation

  const onSubmit = data => {
    setFormData({ ...formData, ...data })
    nextStep()
  }

  useEffect(() => {
    reset(prev => ({
      ...prev,
      variations: prev.variations?.map((v, i) => ({
        ...v,
        sku: v.sku || generateSKU(i, sousCategorie),
        attributes: Object.keys(attributsSousCategorie)?.map(attr => ({
          name: attr,
          value: v.attributes?.find(a => a.name === attr)?.value || ''
        }))
      }))
    }))
  }, [sousCategorie])

  const handleAddVariation = () => {
    const newIndex = variations.length
    const newSKU = generateSKU(newIndex, sousCategorie)
    append({
      sku: newSKU,
      prix: '',
      stock: '',
      attributes: Object.keys(attributsSousCategorie).map(name => ({
        name,
        value: ''
      }))
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {!hasVariation ? (
        <div className='flex flex-col gap-3.5'>
          <div>
            <label className='block mb-1 font-medium'>Prix</label>
            <input
              type='number'
              {...register('pu', { required: 'Prix obligatoire' })}
              className='border rounded px-3 py-2 w-full'
            />
            {errors.pu && (
              <p className='text-red-500 text-sm'>{errors.pu.message}</p>
            )}
          </div>

          <div>
            <label className='block mb-1 font-medium'>Stock</label>
            <input
              type='number'
              {...register('qte', { required: 'Quantité obligatoire' })}
              className='border rounded px-3 py-2 w-full'
            />
            {errors.qte && (
              <p className='text-red-500 text-sm'>{errors.qte.message}</p>
            )}
          </div>
        </div>
      ) : (
        <div className='space-y-5 bg-gray-50 p-4 rounded-lg border'>
          <h3 className='font-semibold text-gray-700'>Variations</h3>

          {variations.map((variation, vIndex) => (
            <div
              key={variation.id}
              className='relative border p-4 bg-white rounded-lg space-y-3'
            >
              <button
                type='button'
                onClick={() => remove(vIndex)}
                className='absolute top-2 right-2 text-red-600 hover:text-red-800'
              >
                <TrashIcon className='w-5 h-5' />
              </button>

              <div className='grid grid-cols-3 gap-3'>
                <div className='flex flex-col'>
                  <label className='text-sm font-medium'>SKU</label>
                  <input
                    {...register(`variations.${vIndex}.sku`)}
                    className='border rounded px-3 py-2 bg-gray-100 text-gray-600'
                    readOnly
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='text-sm font-medium'>Prix</label>
                  <input
                    type='number'
                    placeholder='Prix'
                    {...register(`variations.${vIndex}.prix`, {
                      required: true
                    })}
                    className='border rounded px-3 py-2'
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='text-sm font-medium'>Stock</label>
                  <input
                    type='number'
                    placeholder='Stock'
                    {...register(`variations.${vIndex}.stock`, {
                      required: true
                    })}
                    className='border rounded px-3 py-2'
                  />
                </div>
              </div>

              <div
                className={`grid grid-cols-2 ${
                  Object.keys(attributsSousCategorie)?.length === 1
                    ? 'md:grid-cols-1'
                    : `md:grid-cols-${
                        Object.keys(attributsSousCategorie)?.length
                      }`
                } gap-3`}
              >
                {Object.keys(attributsSousCategorie)?.map(
                  (attrName, aIndex) => (
                    <div key={aIndex} className='flex w-full flex-col gap-1'>
                      <label className='text-xs text-primary font-semibold'>
                        {attrName}
                      </label>
                      <Controller
                        name={`variations.${vIndex}.attributes.${aIndex}.value`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <>
                            <SelectInputWithRef
                              {...field}
                              attributeType="color"
                              options={attributsSousCategorie[attrName] || []}
                              placeholder={`Choisir une/un ${attrName}`}
                              value={field.value || ''}
                              onChange={event =>
                                field.onChange(event.target.value)
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
                       <input
                      type="hidden"
                      value={attrName}
                      {...register(`variations.${vIndex}.attributes.${aIndex}.name`)}
                    /> 
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          <button
            type='button'
            onClick={handleAddVariation}
            className='flex items-center gap-1 text-blue-600 hover:text-blue-800'
          >
            <PlusIcon className='w-5 h-5' /> Ajouter une variation
          </button>
        </div>
      )}

      {/* FOOTER BOUTONS */}
      <div className='flex justify-between mt-3'>
        <button
          type='button'
          onClick={previousStep}
          className='bg-gray-400 flex items-center gap-2 text-white px-4 py-2 rounded'
        >
          <MoveLeft />
          Précédent
        </button>
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

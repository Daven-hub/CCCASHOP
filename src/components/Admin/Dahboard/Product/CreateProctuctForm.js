import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../../ui/dialog'
import { PlusIcon, TrashIcon } from 'lucide-react'
import StepWizard from 'react-step-wizard'
import Step1 from '../../../stepper/Step1'
import Step2 from '../../../stepper/Step2'
import Step3 from '../../../stepper/Step3'

export default function CreateProduct ({
  titre = 'Créer un produit',
  open,
  setOpen,
  formData,
  setFormData,
  subcategories,
  categories,
  attributeValues,
  attributes,
  loading,
  onSave
}) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    reset,
    unregister,
    formState: { errors }
  } = useForm({
    defaultValues: {
      idCategorie: '',
      idsubcateg: '',
      hasVariation: false,
      variations: [],
    }
  })

  const [currentStep, setCurrentStep] = useState(1)
  console.log("formData",formData)

  
   return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='!max-w-4xl block w-full overflow-hidden'>
        <DialogHeader>
          <DialogTitle>{titre}</DialogTitle>
        </DialogHeader>
        <StepWizard onStepChange={stats => setCurrentStep(stats.activeStep)}>
          <Step1
            setFormData={setFormData}
            categories={categories}
            subcategories={subcategories}
            formData={formData}
            register={register}
            setValue={setValue}
            reset={reset}
            unregister={unregister}
            control={control}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
          />
          <Step2
            setFormData={setFormData}
            formData={formData}
            watching={watch}
            subcategories={subcategories}
            attributeValues={attributeValues}
            attributes={attributes}
          />
          <Step3 
          formData={formData} 
           subcategories={subcategories}
            categories={categories}
            attributeValues={attributeValues}
            attributes={attributes}
            onSave={onSave}
            loading={loading}
            />
        </StepWizard>
      </DialogContent>
    </Dialog>
  )
}

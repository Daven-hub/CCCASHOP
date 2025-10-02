// MultiStepForm.js
import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import { useForm } from "react-hook-form";

// function ProgressBar({ currentStep, totalSteps }) {
//   const progress = Math.round((currentStep / totalSteps) * 100);
//   return (
//     <div className="w-full bg-gray-200 h-2 rounded mb-6">
//       <div
//         className="bg-blue-600 h-2 rounded"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// }

function Step1({ nextStep, setFormData, formData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Étape 1 : Informations perso</h2>
      <input
        {...register("name", { required: "Le nom est obligatoire" })}
        placeholder="Nom"
        className="border p-2 w-full mb-2 rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        Suivant
      </button>
    </form>
  );
}

function Step2({ nextStep, previousStep, setFormData, formData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Étape 2 : Contact</h2>
      <input
        {...register("email", {
          required: "L'email est obligatoire",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
            message: "Email invalide",
          },
        })}
        placeholder="Email"
        className="border p-2 w-full mb-2 rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={previousStep}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Retour
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}

function Step3({ previousStep, formData }) {
  const handleFinish = () => {
    console.log("Données envoyées ✅", formData);
    alert("Formulaire soumis avec succès !");
  };

  return (
    <div className="p-6 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Étape 3 : Confirmation</h2>
      <p><strong>Nom :</strong> {formData.name}</p>
      <p><strong>Email :</strong> {formData.email}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={previousStep}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Retour
        </button>
        <button
          onClick={handleFinish}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Envoyer ✅
        </button>
      </div>
    </div>
  );
}

export default function MultiStepForm() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-lg mx-auto mt-10">
      {/* <ProgressBar currentStep={currentStep} totalSteps={3} /> */}

      <StepWizard onStepChange={(stats) => setCurrentStep(stats.activeStep)}>
        <Step1 setFormData={setFormData} formData={formData} />
        <Step2 setFormData={setFormData} formData={formData} />
        <Step3 formData={formData} />
      </StepWizard>
    </div>
  );
}

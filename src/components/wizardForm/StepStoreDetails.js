import React from "react";
import { useForm } from "react-hook-form";


export default function StepStoreDetails({nextStep,previousStep}) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    // Ici tu peux envoyer les données à ton API via fetch / axios
    nextStep()
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5"
    >

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Type d'entreprise</label>
          <input
            {...register("typeEntreprise")}
            placeholder="SARL, SAS, Auto-entrepreneur..."
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Date de création</label>
          <input
            type="date"
            {...register("date_creation")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">ID Catégorie</label>
          <input
            type="number"
            {...register("idCategorie")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Tags</label>
          <input
            {...register("tags")}
            placeholder="Mode, Électronique, Artisanat..."
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* <div className="flex flex-col">
          <label className="mb-1 font-medium">Seconde catégorie</label>
          <input
            {...register("secondeCategorie")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Pays</label>
          <input
            {...register("pays")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Ville</label>
          <input
            {...register("ville")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Province</label>
          <input
            {...register("region")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Adresse</label>
          <input
            {...register("adresse1")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Code postal</label>
          <input
            {...register("zipcode")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">CNI</label>
          <input
            type="file"
            {...register("cni")}
            placeholder="Numéro de carte d'identité"
            className="border px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className=" flex items-center text-sm justify-between">
        <button
          type="button"
          onClick={()=>previousStep()}
          className="bg-primary-light px-8 w-full md:w-fit text-white py-2.5 rounded font-semibold hover:bg-primary/70 transition"
        >
          precedent
        </button>
        <button
          type="submit"
          className=" w-full px-8 md:w-fit bg-primary text-white py-2.5 rounded font-semibold hover:bg-prmary/70 transition"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}

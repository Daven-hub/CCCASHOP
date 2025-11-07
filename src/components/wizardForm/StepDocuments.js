import React from "react";
import { useForm } from "react-hook-form";

export default function StepDocuments({nextStep,previousStep}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    nextStep()
    // Ici tu peux envoyer les données à ton API via fetch / axios
  };
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Site web</label>
        <input
          {...register("siteweb")}
          placeholder="https://monsite.com"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Facebook */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Facebook</label>
        <input
          {...register("facebook")}
          placeholder="https://facebook.com/nompage"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* LinkedIn */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">LinkedIn</label>
        <input
          {...register("linkedin")}
          placeholder="https://linkedin.com/in/nom"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* TikTok */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">TikTok</label>
        <input
          {...register("tiktok")}
          placeholder="https://tiktok.com/@nomutilisateur"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Rating */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Rating</label>
        <input
          type="number"
          {...register("rating", { valueAsNumber: true, min: 0 })}
          placeholder="0"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Bouton soumettre */}
      <div className=" flex items-center text-sm justify-between">
        <button
          type="button"
          onClick={()=>previousStep()}
          className="bg-primary-light px-8 w-full md:w-fit text-white py-2 rounded font-semibold hover:bg-primary/70 transition"
        >
          precedent
        </button>
        <button
          type="submit"
          className=" w-full px-8 md:w-fit bg-primary text-white py-2 rounded font-semibold hover:bg-prmary/70 transition"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";

export default function StepOwnerInfo({nextStep,previousStep}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = (data) => {
      console.log("Données soumises :", data);
      nextStep()
      // Ici tu peux envoyer les données à ton API via fetch / axios
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Nom de la boutique *</label>
          <input
            {...register("shopname", { required: "Le nom de la boutique est requis" })}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nom de la boutique"
          />
          {errors.shopname && <span className="text-red-500 text-sm">{errors.shopname.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Slug</label>
          <input
            {...register("slug")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="nom-boutique"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Téléphone</label>
          <input
            {...register("shoptel")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Langue principale</label>
          <input
            {...register("languePrincipale")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Français"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Profil (URL image)</label>
          <input
            {...register("profile")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://monsite.com/profile.jpg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Couverture (URL image)</label>
          <input
            {...register("couverture")}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://monsite.com/cover.jpg"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description de votre boutique"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          {...register("showemail")}
          defaultChecked
          className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
        />
        <label className="font-medium">Afficher l'email de la boutique</label>
      </div>

      <div className=" flex items-center text-sm justify-between">
        <button
          type="submit"
          className=" w-full px-8 md:w-full bg-primary text-white py-2.5 rounded font-semibold hover:bg-prmary/70 transition"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}

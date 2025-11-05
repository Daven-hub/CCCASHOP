import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { Button } from "./Button";

export default function StepPersonalInfo() {
  const { register, handleSubmit } = useForm();
  const { next } = useWizard();

  const onSubmit = (data) => {
    console.log("Étape 1:", data);
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input
          {...register("fullName", { required: true })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Suivant</Button>
      </div>
    </form>
  );
}

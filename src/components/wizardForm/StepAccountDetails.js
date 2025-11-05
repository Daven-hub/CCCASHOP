import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { Button } from "./Button";

export default function StepAccountDetails() {
  const { nextStep, previousStep } = useWizard();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Étape 2:", data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom d’utilisateur</label>
        <input
          {...register("username", { required: true })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={previousStep}>
          Retour
        </Button>
        <Button type="submit">Suivant</Button>
      </div>
    </form>
  );
}

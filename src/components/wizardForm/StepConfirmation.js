import { useWizard } from "react-use-wizard";
import { Button } from "./Button";

export default function StepConfirmation() {
  const { previousStep } = useWizard();

  const handleConfirm = () => {
    alert("Enregistrement complété 🎉");
  };

  return (
    <div className="text-center space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Confirmez votre enregistrement
      </h3>
      <p className="text-gray-500">
        Vérifiez vos informations avant de finaliser votre inscription.
      </p>

      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={previousStep}>
          Retour
        </Button>
        <Button onClick={handleConfirm}>Confirmer</Button>
      </div>
    </div>
  );
}

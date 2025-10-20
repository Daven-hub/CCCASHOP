import * as React from 'react'
export default function Step3({ previousStep, formData }) {
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
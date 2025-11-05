// WizardContainer.jsx
import React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import { motion, AnimatePresence } from "framer-motion";
import StepPersonalInfo from "./StepPersonalInfo";
import StepAccountDetails from "./StepAccountDetails";
import StepConfirmation from "./StepConfirmation";
import ProgressBar from "./ProgressBar";

export default function WizardContainer() {
  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8 mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Enregistrement
      </h2>

      <Wizard>
        <WizardSteps />
      </Wizard>
    </div>
  );
}

// Composant gérant l'affichage des étapes avec animation
function WizardSteps() {
  const { stepCount, activeStep, goToStep } = useWizard();

  // Tableau des étapes
  const steps = [
    <StepPersonalInfo key={0} />,
    <StepAccountDetails key={1} />,
    <StepConfirmation key={2} />,
  ];

  return (
    <div>
      <ProgressBar stepCount={stepCount} activeStep={activeStep} goToStep={goToStep} />

      <div className="mt-6 relative h-[300px] overflow-hidden">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeStep} // clé unique = étape active
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full"
          >
            {steps[activeStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

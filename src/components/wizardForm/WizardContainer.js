import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import { motion } from "framer-motion";
import StepOwnerInfo from "./StepOwnerInfo";
import StepStoreDetails from "./StepStoreDetails";
import StepDocuments from "./StepDocuments";
import StepConfirmation from "./StepConfirmation";
import ProgressBar from "./ProgressBar";
import { NavLink } from "react-router-dom";

export default function WizardContainer() {
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const steps = ["Principale", "Légales & Fiscales", "Contact","Pret!"];

  const onStepChange = (stats) => {
    setActiveStep(stats.activeStep);
    setTotalSteps(stats.totalSteps);
  };

  return (
    <div className="min-h-screen pt-[4.5rem] bg-soft-gradient bg-[length:400%_400%] animate-gradient-move flex flex-col items-center">
      <div className="flex flex-col gap-6  w-[55%]">
        <ProgressBar steps={steps} currentStep={activeStep} />
        <div className="flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white overflow-hidden border rounded-[6px] p-8"
          >
            <StepWizard
              isHashEnabled={false}
              onStepChange={onStepChange}
              initialStep={activeStep}
              transitions={{
                enterRight: "animate__animated animate__fadeInRight",
                exitLeft: "animate__animated animate__fadeOutLeft",
                enterLeft: "animate__animated animate__fadeInLeft",
                exitRight: "animate__animated animate__fadeOutRight",
              }}
            >
              <StepOwnerInfo />
              <StepStoreDetails />
              <StepDocuments />
              <StepConfirmation />
              <StepConfirmation />
            </StepWizard>
          </motion.div>
          {activeStep===4 && <NavLink to={"/"} className="text-center mt-1 font-medium text-gray-500 text-sm hover:underline hover:text-blue-600">Retour à la page d'acceuil</NavLink>}
       </div>
      </div>
    </div>
  );
}

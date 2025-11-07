import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ steps = [], currentStep = 1 }) {
  const N = Math.max(steps.length, 1);
  // const stepProgress = 100 / N;
  let progress = Math.min((currentStep / N) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex w-full mb-0.5">
        {steps.map((label, i) => (
          <div key={i} className="flex-1 flex items-end justify-center">
            <span
              className={`text-sm font-medium Capitalize tracking-wide ${
                i + 1 <= currentStep ? "text-orange-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex w-full">
          {steps.map((_, i) => {
            const idx = i + 1;
            const active = idx <= currentStep;
            return (
              <div key={i} className="flex-1 flex items-center justify-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    active
                      ? "bg-orange-500 border-orange-500"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

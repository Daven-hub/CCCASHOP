export default function ProgressBar({ stepCount, activeStep, goToStep }) {
  const steps = Array.from({ length: stepCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-between relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-500"
        style={{ width: `${(activeStep / (stepCount - 1)) * 100}%` }}
      />
      {steps.map((i) => (
        <button
          key={i}
          onClick={() => goToStep(i)}
          className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all
            ${i === activeStep ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-gray-300 text-gray-600"}
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

import React from "react";

const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${checked ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full shadow ring-0 transition-transform
          ${checked ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
};

export default Switch;

import React from "react";
import SelectInput from "@commercetools-uikit/select-input";

const SelectInputWithRef = React.forwardRef(
  (
    {
      placeholder = "Sélectionner une option",
      options = [],
      attributeType = "text",
      ...props
    },
    ref
  ) => {
    const formattedOptions = options.map((opt) => {
      if (attributeType === "color") {
        return {
          ...opt,
          label: (
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border"
                style={{ backgroundColor: opt.label }}
              />
              <span>{opt.label}</span>
            </div>
          ),
        };
      } else {
        return opt;
      }
    });

    const handleChange = (event) => {
      if (event?.target?.value === "__add_new__") {
        // onAddNew?.(); // déclenche le popup ou le formulaire d'ajout
      } else {
        props.onChange?.(event); // passe la valeur normale au parent
      }
    };
    return (
      <SelectInput
        {...props}
        forwardedRef={ref}
        placeholder={placeholder}
        options={formattedOptions}
        onChange={handleChange}
      />
    );
  }
);

export default SelectInputWithRef;

// const formattedOptions = [
//       ...options.map((opt) => {
//         if (attributeType === "color") {
//           return {
//             ...opt,
//             label: (
//               <div className="flex items-center gap-2">
//                 <span
//                   className="inline-block w-4 h-4 rounded-full border"
//                   style={{ backgroundColor: opt.label }}
//                 />
//                 <span>{opt.label}</span>
//               </div>
//             ),
//           };
//         }
//         return opt;
//       }),
//       {
//         value: "__add_new__", // valeur spéciale
//         label: (
//           <span className="text-blue-600 font-medium">
//             + Ajouter une nouvelle option
//           </span>
//         ),
//       },
//     ];

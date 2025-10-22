import React, { useState, useMemo } from "react";
import SelectInput from "@commercetools-uikit/select-input";

const CreatableSelectInput = React.forwardRef(
  (
    {
      placeholder = "Sélectionner une option",
      options = [],
      onAddNew, // callback pour ajouter une nouvelle option
      attributeType = "text",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrer les options selon le terme de recherche
    const filteredOptions = useMemo(() => {
      return options.filter((opt) =>
        String(opt.label)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm]);

    // Ajouter l’option “Ajouter” si aucune correspond
    const displayedOptions = useMemo(() => {
      const formatted = filteredOptions.map((opt) => {
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
        }
        return opt;
      });

      if (
        searchTerm.trim() !== "" &&
        !options.some(
          (opt) =>
            String(opt.label).toLowerCase() === searchTerm.toLowerCase()
        )
      ) {
        formatted.push({
          value: "__add_new__",
          label: (
            <span className="text-blue-600 font-medium">
              + Ajouter "{searchTerm}"
            </span>
          ),
        });
      }

      return formatted;
    }, [filteredOptions, searchTerm, options, attributeType]);

    // Gestion du changement
    const handleChange = (event) => {
      const val = event?.target?.value;
      if (val === "__add_new__") {
        onAddNew?.(searchTerm);
      } else {
        onChange?.(event);
      }
    };

    return (
      <SelectInput
        {...props}
        forwardedRef={ref}
        placeholder={placeholder}
        options={displayedOptions}
        value={value}
        onChange={handleChange}
        onInputChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
);

export default CreatableSelectInput;


// const [options, setOptions] = React.useState([
//   { value: "rouge", label: "Rouge" },
//   { value: "bleu", label: "Bleu" },
// ]);

// const handleAddNew = (label) => {
//   const newOption = { value: label.toLowerCase(), label };
//   setOptions((prev) => [...prev, newOption]);
//   console.log("Nouvelle option ajoutée :", label);
// };

// <CreatableSelectInput
//   name="couleur"
//   options={options}
//   placeholder="Sélectionner ou créer une couleur"
//   onAddNew={handleAddNew}
// />

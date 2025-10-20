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

    return (
      <SelectInput
        {...props}
        forwardedRef={ref}
        placeholder={placeholder}
        options={formattedOptions}
      />
    );
  }
);

export default SelectInputWithRef;

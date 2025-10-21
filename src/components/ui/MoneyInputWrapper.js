import { Controller } from "react-hook-form";
import MoneyInput from "@commercetools-uikit/money-input";

export default function MoneyInputWrapper({ field, currencies = ["USD"] }) {
  // Valeur sécurisée pour MoneyInput
  const value = field.value
    ? { amount: field.value, currencyCode: currencies[0] }
    : { amount: null, currencyCode: currencies[0] }; // "" indique champ vide

  const handleChange = (val) => {
    // On transmet uniquement amount à RHF
    field.onChange(val?.amount ?? 0);
  };

  return (
    <MoneyInput
      value={value}
      onChange={handleChange}
      currencies={currencies}
    />
  );
}

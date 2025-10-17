import React from "react";
import { X, Plus } from "lucide-react";

function ProductAttributesSection({
    hasAttributes,
    setHasAttributes,
    attributes,
    setAttributes,
}) {
    const handleAttributeChange = (index, e) => {
        const { name, value } = e.target;
        const newAttrs = [...attributes];
        newAttrs[index][name] = value;
        setAttributes(newAttrs);
    };

    const addAttribute = () => {
        setAttributes([
            ...attributes,
            { sku: "", qte: "", pu: "", stock: "", subAttributes: [] },
        ]);
    };

    const removeAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const addSubAttribute = (attrIndex) => {
        const newAttrs = [...attributes];
        newAttrs[attrIndex].subAttributes.push({
            name: "",
            value: "",
            extraPrice: "",
        });
        setAttributes(newAttrs);
    };

    const handleSubAttributeChange = (attrIndex, subIndex, e) => {
        const { name, value } = e.target;
        const newAttrs = [...attributes];
        newAttrs[attrIndex].subAttributes[subIndex][name] = value;
        setAttributes(newAttrs);
    };

    const removeSubAttribute = (attrIndex, subIndex) => {
        const newAttrs = [...attributes];
        newAttrs[attrIndex].subAttributes = newAttrs[attrIndex].subAttributes.filter(
            (_, i) => i !== subIndex
        );
        setAttributes(newAttrs);
    };

    return (
        <section className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="checkbox"
                    checked={hasAttributes}
                    onChange={() => setHasAttributes(!hasAttributes)}
                    id="hasAttributes"
                    className="w-4 h-4"
                />
                <label
                    htmlFor="hasAttributes"
                    className="text-gray-700 font-medium text-sm"
                >
                    Ce produit a des attributs
                </label>
            </div>

            {hasAttributes && (
                <div className="flex flex-col gap-6">
                    {attributes.map((attr, index) => (
                        <div
                            key={index}
                            className="relative border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
                        >
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                Attribut #{index + 1}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {["sku", "qte", "pu", "stock"].map((field) => (
                                    <div key={field} className="flex flex-col gap-1">
                                        <label className="text-[.85rem] font-semibold text-gray-600">
                                            {field.toUpperCase()}
                                        </label>
                                        <input
                                            type="text"
                                            name={field}
                                            value={attr[field]}
                                            onChange={(e) => handleAttributeChange(index, e)}
                                            className="border border-gray-300 rounded-lg py-2 px-2 text-[.9rem] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Sous-attributs */}
                            <div className="mt-4 border-t pt-3">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Sous-attributs
                                </h4>
                                {attr.subAttributes.map((sub, subIndex) => (
                                    <div
                                        key={subIndex}
                                        className="grid grid-cols-3 gap-3 mb-2 relative"
                                    >
                                        {[
                                            { label: "Nom", name: "name" },
                                            { label: "Valeur", name: "value" },
                                            // { label: "Prix supplémentaire", name: "extraPrice" },
                                        ].map((input) => (
                                            <div key={input.name} className="flex flex-col gap-1">
                                                <label className="text-[.8rem] font-semibold text-gray-600">
                                                    {input.label}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={input.name}
                                                    value={sub[input.name]}
                                                    onChange={(e) =>
                                                        handleSubAttributeChange(index, subIndex, e)
                                                    }
                                                    className="border border-gray-300 rounded-lg py-1.5 px-2 text-[.85rem] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => removeSubAttribute(index, subIndex)}
                                            className="absolute -top-2 -right-2 text-red-500 p-1 hover:bg-red-50 rounded-full transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addSubAttribute(index)}
                                    className="mt-2 text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                                >
                                    <Plus className="w-4 h-4" />
                                    Ajouter un sous-attribut
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeAttribute(index)}
                                className="absolute top-3 right-3 text-red-500 p-1 hover:bg-red-50 rounded-full transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAttribute}
                        className="mt-2 text-primary font-medium text-sm px-4 py-2 border border-primary rounded-lg hover:bg-primary/10 transition w-max"
                    >
                        Ajouter un attribut
                    </button>
                </div>
            )}
        </section>
    );
}

export default ProductAttributesSection;

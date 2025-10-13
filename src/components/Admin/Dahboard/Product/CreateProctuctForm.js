import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";

function CreateProduct({ open, setOpen, onCreate }) {
    const [form, setForm] = useState({
        // idVendeur: "",
        desc: "",
        rating: "",
        qualite: "",
        profile: "",
        specification: "",
        idUnit: "",
        idCategorie: "",
        idsubcateg: "",
    });

    const [hasAttributes, setHasAttributes] = useState(false);
    const [attributes, setAttributes] = useState([
        { sku: "", qte: "", pu: "", stock: "" },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAttributeChange = (index, e) => {
        const { name, value } = e.target;
        const newAttrs = [...attributes];
        newAttrs[index][name] = value;
        setAttributes(newAttrs);
    };

    const addAttribute = () => {
        setAttributes([...attributes, { sku: "", qte: "", pu: "", stock: "" }]);
    };

    const removeAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...form, attributes: hasAttributes ? attributes : [] };
        onCreate(data);

        setForm({
            // idVendeur: "",
            desc: "",
            rating: "",
            qualite: "",
            profile: "",
            specification: "",
            idUnit: "",
            idCategorie: "",
            idsubcateg: "",
        });
        setHasAttributes(false);
        setAttributes([{ sku: "", qte: "", pu: "", stock: "" }]);
        setOpen(false);
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
                <AlertDialog.Content className="fixed z-50 bg-white rounded-2xl shadow-xl w-[95%] sm:w-[600px] p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-100 max-h-[90vh] overflow-y-auto">
                    <AlertDialog.Title className="text-[1.3rem] font-bold text-primary mb-4">
                        Créer un nouveau produit
                    </AlertDialog.Title>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                // { label: "Vendeur (ID)", name: "idVendeur", type: "number" },
                                { label: "Note (rating)", name: "rating", type: "number" },
                                { label: "Qualité", name: "qualite", type: "text" },
                                { label: "Profil", name: "profile", type: "text" },
                                { label: "Spécification", name: "specification", type: "text" },
                                { label: "Unité (ID)", name: "idUnit", type: "number" },
                                { label: "Catégorie (ID)", name: "idCategorie", type: "number" },
                                { label: "Sous-catégorie (ID)", name: "idsubcateg", type: "number" },
                            ].map((input, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <label className="text-[.9rem] font-semibold text-gray-700">
                                        {input.label}
                                    </label>
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        value={form[input.name]}
                                        onChange={handleChange}
                                        required
                                        className="border border-gray-300 rounded-[7px] py-2.5 px-3 text-[.9rem] outline-none focus:border-primary"
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-[.9rem] font-semibold text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="desc"
                                    value={form.desc}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="border border-gray-300 rounded-[7px] py-2.5 px-3 text-[.9rem] outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={hasAttributes}
                                onChange={() => setHasAttributes(!hasAttributes)}
                                id="hasAttributes"
                                className="w-4 h-4"
                            />
                            <label htmlFor="hasAttributes" className="text-gray-700 font-medium text-sm">
                                Ce produit a des attributs
                            </label>
                        </div>

                        {hasAttributes && (
                            <div className="flex flex-col gap-3 mt-2 border p-3 rounded-lg border-gray-200">
                                {attributes.map((attr, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end relative"
                                    >
                                        {["sku", "qte", "pu", "stock"].map((field) => (
                                            <div key={field} className="flex flex-col gap-1">
                                                <label className="text-[.8rem] font-semibold text-gray-600">
                                                    {field.toUpperCase()}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={attr[field]}
                                                    onChange={(e) => handleAttributeChange(index, e)}
                                                    className="border border-gray-300 rounded-[7px] py-2 px-2 text-[.85rem] outline-none focus:border-primary w-full"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => removeAttribute(index)}
                                            className="absolute top-0 right-0 text-red-500 p-1 hover:bg-red-50 rounded-full transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAttribute}
                                    className="mt-2 text-primary font-medium text-sm px-3 py-1 border border-primary rounded hover:bg-primary/10 transition w-max"
                                >
                                    Ajouter un attribut
                                </button>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-4 flex-wrap">
                            <AlertDialog.Cancel asChild>
                                <button
                                    type="button"
                                    className="px-4 py-2.5 rounded-[7px] border border-gray-300 font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Annuler
                                </button>
                            </AlertDialog.Cancel>

                            <AlertDialog.Action asChild>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-[7px] bg-primary text-white font-semibold hover:opacity-90"
                                >
                                    Créer
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </form>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default CreateProduct;

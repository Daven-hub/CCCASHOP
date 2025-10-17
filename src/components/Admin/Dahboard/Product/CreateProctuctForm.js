import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import ProductInfoSection from "./ProductInfoSection";
import ProductImageSection from "./ProductImageSection";
import ProductAttributesSection from "./ProductAttributesSection";

function CreateProduct({ open, setOpen }) {
    const [form, setForm] = useState({
        desc: "",
        rating: "",
        qualite: "",
        profile: "",
        specification: "",
        idUnit: "",
        idCategorie: "",
        idsubcateg: "",
        image: null,
    });

    const [hasAttributes, setHasAttributes] = useState(false);
    const [attributes, setAttributes] = useState([
        { sku: "", qte: "", pu: "", stock: "", subAttributes: [] },
    ]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const removeImage = () => setForm({ ...form, image: null });

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                <AlertDialog.Content
                    className="fixed z-50 bg-white rounded-3xl shadow-2xl w-[95%] max-w-5xl p-8 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          border border-gray-100 max-h-[90vh] overflow-y-auto"
                >
                    <AlertDialog.Title asChild>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Créer un nouveau produit
                            </h1>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-red-500 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </AlertDialog.Title>

                    <AlertDialog.Description asChild>
                        <p className="text-gray-500 mb-6 text-sm">
                            Remplissez les informations nécessaires pour ajouter un nouveau produit à votre catalogue.
                        </p>
                    </AlertDialog.Description>

                    <form className="space-y-8">
                        <ProductInfoSection form={form} handleChange={handleChange} />
                        <ProductImageSection
                            form={form}
                            handleChange={handleChange}
                            removeImage={removeImage}
                        />
                        <ProductAttributesSection
                            hasAttributes={hasAttributes}
                            setHasAttributes={setHasAttributes}
                            attributes={attributes}
                            setAttributes={setAttributes}
                        />

                        <div className="flex justify-end gap-3 mt-8">
                            <AlertDialog.Cancel asChild>
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Annuler
                                </button>
                            </AlertDialog.Cancel>

                            <AlertDialog.Action asChild>
                                <button
                                    type="button"
                                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
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

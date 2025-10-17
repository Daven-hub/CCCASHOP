import React from "react";
import { X } from "lucide-react";

function ProductImageSection({ form, handleChange, removeImage }) {
    return (
        <section className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Image du produit
            </h2>
            <div className="flex flex-col gap-2">
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl py-2.5 px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                />
                {form.image && (
                    <div className="mt-3 relative w-fit">
                        <img
                            src={URL.createObjectURL(form.image)}
                            alt="preview"
                            className="w-40 h-40 object-cover rounded-xl border shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductImageSection;

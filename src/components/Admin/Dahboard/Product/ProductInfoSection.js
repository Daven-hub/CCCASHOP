import React from "react";

function ProductInfoSection({ form, handleChange }) {
    return (
        <section className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Informations principales
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                    { label: "Note (rating)", name: "rating", type: "number" },
                    { label: "Qualité", name: "qualite", type: "text" },
                    { label: "Profil", name: "profile", type: "text" },
                    { label: "Spécification", name: "specification", type: "text" },
                    { label: "Unité (ID)", name: "idUnit", type: "number" },
                    { label: "Catégorie (ID)", name: "idCategorie", type: "number" },
                    { label: "Sous-catégorie (ID)", name: "idsubcateg", type: "number" },
                ].map((input, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">
                            {input.label}
                        </label>
                        <input
                            type={input.type}
                            name={input.name}
                            value={form[input.name]}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-xl py-2.5 px-3 text-[.95rem] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-600">Description</label>
                <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-[.95rem] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none transition"
                />
            </div>
        </section>
    );
}

export default ProductInfoSection;

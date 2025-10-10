import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

function CreateAttribute({ open, setOpen, onCreate }) {
    const [nom, setNom] = useState("");
    const [categorie, setCategorie] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ nom, categorie });
        setNom("");
        setCategorie("");
        setOpen(false);
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

                <AlertDialog.Content className="fixed z-50 bg-white rounded-[10px] shadow-lg w-[90%] md:w-[420px] p-6 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <AlertDialog.Title className="text-[1.3rem] font-bold text-primary mb-4">
                        Créer un nouvel attribut
                    </AlertDialog.Title>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[.9rem] font-semibold text-gray-700">
                                Nom de l’attribut
                            </label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                                placeholder="Ex: Couleur, Taille..."
                                className="border border-gray-300 rounded-[7px] py-2.5 px-4 text-[.9rem] outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[.9rem] font-semibold text-gray-700">
                                Sous-catégorie
                            </label>
                            <input
                                type="text"
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                                required
                                placeholder="Ex: Mode, Beauté..."
                                className="border border-gray-300 rounded-[7px] py-2.5 px-4 text-[.9rem] outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
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

export default CreateAttribute;

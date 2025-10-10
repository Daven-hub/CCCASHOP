import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X, Upload } from "lucide-react";

function CreateCategorie({ open, setOpen, onCreate }) {
    const [nom, setNom] = useState("");
    const [icon, setIcon] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ nom, icon, image });
        setNom("");
        setIcon("");
        setImage(null);
        setPreview(null);
        setOpen(false);
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

                <AlertDialog.Content className="fixed z-50 bg-white rounded-2xl shadow-xl w-[95%] sm:w-[420px] p-6 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border border-gray-100">
                    <AlertDialog.Title className="text-[1.3rem] font-bold text-primary mb-4">
                        Créer une nouvelle catégorie
                    </AlertDialog.Title>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[.9rem] font-semibold text-gray-700">
                                Nom de la catégorie
                            </label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                                placeholder="Ex : Mode, Beauté..."
                                className="border border-gray-300 rounded-[7px] py-2.5 px-4 text-[.9rem] outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[.9rem] font-semibold text-gray-700">
                                Icon
                            </label>
                            <input
                                type="text"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                required
                                placeholder="Ex : HOME"
                                className="border border-gray-300 rounded-[7px] py-2.5 px-4 text-[.9rem] outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[.9rem] font-semibold text-gray-700">
                                Image de la catégorie
                            </label>

                            {!preview ? (
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Upload className="w-7 h-7 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">
                                        Cliquez pour importer une image
                                    </span>
                                </label>
                            ) : (
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                                    <img
                                        src={preview}
                                        alt="Aperçu"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md transition"
                                        title="Retirer l'image"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
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

export default CreateCategorie;

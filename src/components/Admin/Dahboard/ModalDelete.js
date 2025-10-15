import React, { useEffect } from "react";

function ModalDelete({ open, setOpen, onConfirm, itemName = "cet élément" }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [setOpen]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm "
            onClick={() => setOpen(false)}
        >
            <div
                className="bg-white w-[90%] md:w-[420px] rounded-[12px] shadow-lg p-6 animate-fadeIn "
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-[1.3rem] font-bold text-red-600 mb-3 text-center">
                    Confirmer la suppression
                </h2>

                <p className="text-gray-700 text-center mb-6">
                    Êtes-vous sûr de vouloir supprimer{" "}
                    <span className="font-semibold">{itemName}</span> ?<br />
                    Cette action est irréversible.
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2.5 rounded-[7px] border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={() => {
                            onConfirm && onConfirm();
                            setOpen(false);
                        }}
                        className="px-5 py-2.5 rounded-[7px] bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;

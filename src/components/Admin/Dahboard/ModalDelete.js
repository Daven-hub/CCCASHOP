import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

function ModaleDelete({ open, setOpen, onConfirm, itemName = "cét élément" }) {
    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

                <AlertDialog.Content
                    className="fixed z-50 bg-white rounded-[10px] shadow-lg w-[90%] md:w-[420px] p-6 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                    onEscapeKeyDown={(event) => event.preventDefault()}
                    onPointerDownOutside={(event) => event.preventDefault()}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                >
                    <AlertDialog.Title className="text-[1.3rem] font-bold text-red-600 mb-3 text-center">
                        Confirmer la suppression
                    </AlertDialog.Title>

                    <AlertDialog.Description className="text-gray-700 text-center mb-6">
                        Êtes-vous sûr de vouloir supprimer{" "}
                        <span className="font-semibold">{itemName}</span> ?
                        <br />
                        Cette action est irréversible.
                    </AlertDialog.Description>

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
                                onClick={handleConfirm}
                                className="px-5 py-2.5 rounded-[7px] bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                            >
                                Supprimer
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default ModaleDelete;
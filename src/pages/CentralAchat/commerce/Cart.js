// import React from 'react'
// import Annimated from '../../../components/Annimated';
// import Breadcrumb from '../../../components/Breadcumb';
// import SideShop from '../../../components/SideShop';
// import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers';
// import { useTranslation } from 'react-i18next';
// // import HeadersBottomOther from '../../../components/Navbar/CentraleAchat/HeadersBottomOther'

// function Cart() {
//       const { t } = useTranslation()
//       const bread = [
//             { label: t("accueille"), path: "/" },
//             { label: "Panier", path: "/cart" },
//       ];
//       return (

//             // <div className='flex px-[8%] py-8'>
//             //       Cart
//             // </div>

//             <Annimated className="bg-white">
//                   <div className="px-[5%] py-[1.5rem] bg-gray-100">
//                         <Breadcrumb data={bread} />
//                   </div>
//                   <div className={`flex px-[${paddingH}] gap-8 py-12 md:py-12`}>
//                         <div className='w-[18%] rounded-[7px] sticky top-[15px] h-[650px]'>
//                               <SideShop />
//                         </div>
//                   </div>
//                    <div className='w-[82%] flex overflow-hidden flex-col gap-6'>

//                    </div>
//             </Annimated>

//       )
// }

// export default Cart

import React, { useState } from 'react';
import Annimated from '../../../components/Annimated';
import Breadcrumb from '../../../components/Breadcumb';
import SideShop from '../../../components/SideShop';
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers';
import { useTranslation } from 'react-i18next';
import data from "../../../datas/produits.json";
import { Trash2Icon, MinusIcon, PlusIcon, ShoppingCart01Icon } from 'lucide-react';
import PresentationLabel from '../../../components/PresentationLabel';

function Cart() {
      const { t } = useTranslation();
      const bread = [
            { label: t("accueille"), path: "/" },
            { label: "Panier", path: "/cart" },
      ];

      const [cart, setCart] = useState(
            data.slice(0, 3).map((item) => ({ ...item, qty: 1 }))
      );

      const total = cart.reduce((acc, item) => acc + parseFloat(item.pu) * item.qty, 0).toFixed(2);

      const removeFromCart = (id) => {
            setCart((prev) => prev.filter((item) => item.id !== id));
      };

      const updateQty = (id, newQty) => {
            setCart((prev) =>
                  prev.map((item) =>
                        item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
                  )
            );
      };

      return (
            <Annimated className="bg-white">
                  <div className="px-[5%] py-[1.5rem] bg-gray-100">
                        <Breadcrumb data={bread} />
                  </div>

                  <div className={`flex px-[${paddingH}] gap-8 py-12 md:py-12`}>

                        {/* <div className='w-[18%] rounded-[7px] sticky top-[15px] h-[650px]'>
                              <SideShop />
                        </div> */}


                        <div className='w-[82%] flex overflow-hidden flex-col gap-6 mx-auto'>

                              <div className={`flex gap-5  py-12 md:py-16 flex-col`}>
                                    <PresentationLabel titre={"MON PANIER"} Component={""} />

                              </div>
                              <div className="flex flex-col border border-gray-200 rounded-b-md bg-white shadow-sm p-4">
                                    {cart.length === 0 ? (
                                          <p className="text-center py-8 text-gray-500">Votre panier est vide.</p>
                                    ) : (
                                          cart.map((item) => (
                                                <div
                                                      key={item.id}
                                                      className="group relative flex flex-col md:flex-row items-center gap-6 border border-gray-100 bg-white rounded-[7px] p-4 mb-4 hover:shadow-md transition-all"
                                                >

                                                      <div className="relative bg-primary/5 p-4 rounded-md w-full md:w-[25%] h-[180px] flex justify-center">
                                                            <img
                                                                  src={item.image}
                                                                  alt={item.titre}
                                                                  className="object-contain w-full h-full rounded-md transition-transform duration-500 group-hover:scale-90"
                                                            />
                                                            <button
                                                                  onClick={() => removeFromCart(item.id)}
                                                                  className="absolute top-2 right-2 bg-gray-100 text-secondary hover:text-primary transition rounded-full p-1"
                                                            >
                                                                  <Trash2Icon size={18} />
                                                            </button>
                                                      </div>

                                                      <div className="flex flex-col gap-2 flex-1">
                                                            <h2 className="text-primary/80 font-semibold text-lg group-hover:text-primary transition-colors">
                                                                  {item.titre}
                                                            </h2>
                                                            <p className="text-sm text-gray-500">Fournisseur : {item.fournisseur}</p>
                                                            <p className="text-sm text-green-700 font-medium">
                                                                  En stock : <span className="font-semibold">{item.qte} {item.meter}</span>
                                                            </p>
                                                            <p className="text-secondary font-bold text-[1rem]">
                                                                  {item.monaie}{item.pu}
                                                                  <sub className="text-[.7rem] text-primary/70"> /{item.meter}</sub>
                                                            </p>
                                                      </div>

                                                      <div className="flex flex-col items-center gap-3">
                                                            <div className="flex items-center gap-3">
                                                                  <button
                                                                        onClick={() => updateQty(item.id, item.qty - 1)}
                                                                        className="border rounded-md px-2 py-1 hover:bg-gray-100 transition"
                                                                  >
                                                                        <MinusIcon size={15} />
                                                                  </button>
                                                                  <input
                                                                        type="number"
                                                                        value={item.qty}
                                                                        onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                                                                        min="1"
                                                                        className="w-12 border text-center rounded-md"
                                                                  />
                                                                  <button
                                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                                        className="border rounded-md px-2 py-1 hover:bg-gray-100 transition"
                                                                  >
                                                                        <PlusIcon size={15} />
                                                                  </button>
                                                            </div>
                                                            <p className="text-secondary font-semibold text-lg">
                                                                  Total : {(item.qty * parseFloat(item.pu)).toFixed(2)} {item.monaie}
                                                            </p>
                                                      </div>
                                                </div>
                                          ))
                                    )}

                                    {cart.length > 0 && (
                                          <>
                                                <div className="flex justify-end py-4">
                                                      <div className="text-right">
                                                            <p className="text-secondary font-medium text-lg">SUBTOTAL</p>
                                                            <p className="text-gray-800 font-semibold text-xl">{total} $</p>
                                                      </div>
                                                </div>

                                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-4">
                                                      <div className="text-gray-600 text-sm">
                                                            Continuer vos achats
                                                      </div>
                                                      <div className="flex gap-3">
                                                            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                                                                  METTRE À JOUR LE PANIER
                                                            </button>
                                                            <button className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                                                                  VÉRIFIER
                                                            </button>
                                                      </div>
                                                </div>

                                                <div className="mt-4">
                                                      <label className="block text-gray-600 mb-2 text-sm">
                                                            Instructions spéciales pour le vendeur
                                                      </label>
                                                      <textarea
                                                            className="w-full border border-gray-300 rounded-md p-2 h-[70px] text-sm"
                                                            placeholder="Écrivez ici..."
                                                      />
                                                </div>

                                                <div className="flex flex-wrap gap-3 justify-start pt-4">
                                                      {["american", "dicover", "visa", "master", "maestro", "currus", "paypal", "google"].map((p) => (
                                                            <img key={p} src={`/payment/${p}.png`} alt={p} className="h-8" />
                                                      ))}
                                                </div>
                                          </>
                                    )}
                              </div>
                        </div>
                  </div>
            </Annimated>
      );
}

export default Cart;


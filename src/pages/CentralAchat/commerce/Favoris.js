import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import Annimated from '../../../components/Annimated'
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import { useTranslation } from 'react-i18next'
import PresentationLabel from '../../../components/PresentationLabel'
import data from "../../../datas/produits.json"
import datac from "../../../datas/fournisseur.json"
import { NavLink } from 'react-router-dom'
import { StarIcon, StarHalfIcon, ShoppingCart01Icon } from 'hugeicons-react'
import { Eye, Heart, MoveRight, Trash2 } from 'lucide-react'


const CardProduit = ({ x, isFavori, onToggleFavori }) => {
      const getImageFourn = (z) => {
            return datac.find((y) => y?.id === z)?.image;
      };

      return (
            <div className='group border p-2 border-gray-200 overflow-hidden bg-white rounded-[5px]'>
                  <div className='relative h-[200px] md:h-[265px] overflow-hidden p-6 bg-primary/5'>
                        <img
                              className='absolute group-hover:scale-[.75] duration-500 transition-all scale-[.65] rounded-t-[5px] left-0 top-0 w-full h-full object-contain'
                              src={x.image}
                              alt='item'
                        />

                        <div className='flex absolute right-2 top-2.5 text-secondary/65 flex-col gap-2 transform transition-transform duration-300 translate-x-[120%] group-hover:translate-x-0'>
                              <div
                                    onClick={() => onToggleFavori(x.id)}
                                    className='p-1 w-fit cursor-pointer rounded-full hover:text-primary/65 bg-gray-100 flex justify-center items-center transition'
                              >
                                    <Heart
                                          size={20}
                                          strokeWidth={2}
                                          className={isFavori ? 'text-red-600' : 'text-gray-400'}
                                          fill={isFavori ? '#E30713' : 'none'}
                                    />
                              </div>

                              <div className='p-1 w-fit cursor-pointer rounded-full hover:text-primary/65 bg-gray-100 flex justify-center items-center'>
                                    <Eye strokeWidth={2} size={20} />
                              </div>
                        </div>
                  </div>

                  <div className='py-3 relative px-2 flex flex-col gap-2'>
                        <NavLink to={"/produits/" + x.id} className='flex items-center gap-1.5'>
                              <div className='flex flex-col gap-1 whitespace-nowrap overflow-hidden'>
                                    <h1 className='group-hover:text-blue-800 text-primary/80 text-ellipsis duration-300 transition-all text-[1.05rem] leading-[1.3] font-semibold'>
                                          {x.titre}
                                    </h1>
                              </div>
                        </NavLink>

                        <div className="flex flex-col gap-2">
                              <span className="flex items-center text-green-700 font-bold text-[.7rem]">
                                    EN STOCK : <mark className="bg-transparent">&nbsp;{x.qte + " " + x.meter} </mark>
                              </span>

                              <ul className='flex items-center gap-0.5'>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /></li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /></li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /></li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /></li>
                                    <li><StarHalfIcon strokeWidth={0.5} className='text-yellow-500 fill-yellow-500' size={11} /></li>
                              </ul>

                              <span className='text-secondary text-[.9rem] font-bold'>
                                    {x.monaie + "" + x.pu}
                                    <sub className="text-[.62rem] top-[0] font-bold text-primary/80">{"/" + x.meter}</sub>
                              </span>
                        </div>

                        <div className='absolute right-0.5 bottom-[36%] w-[60px] group-hover:opacity-100 opacity-40 h-[40px] p-0.5'>
                              <img className='object-contain w-full h-full' src={getImageFourn(x.fournisseur)} alt="fournisseur" />
                        </div>

                        <button className="relative w-full mt-1.5 rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group">
                              <span className="absolute left-0 top-0 h-full w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></span>
                              <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-primary/90">
                                    <ShoppingCart01Icon strokeWidth={2} size={19} className="transition-colors duration-500 group-hover:text-primary/90" />
                                    Ajouter au panier
                              </span>
                        </button>
                  </div>
            </div>
      );
};


function Favoris() {
      const { t } = useTranslation();
      const bread = [
            { label: t("accueille"), path: "/" },
            { label: "Favoris", path: "/favoris" },
      ];

      const [favoris, setFavoris] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 25;

      useEffect(() => {
            const stored = JSON.parse(localStorage.getItem("favoris") || "[]");

            if (stored.length === 0) {
                  const firstFour = data.slice(0, 4).map((p) => p.id);
                  setFavoris(firstFour);
                  localStorage.setItem("favoris", JSON.stringify(firstFour));
            } else {
                  setFavoris(stored);
            }
      }, []);

      useEffect(() => {
            localStorage.setItem("favoris", JSON.stringify(favoris));
      }, [favoris]);

      const toggleFavori = (id) => {
            setFavoris((prev) =>
                  prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
            );
      };

      const clearFavoris = () => {
            setFavoris([]);
            localStorage.removeItem("favoris");
      };

      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentProducts = data.slice(startIndex, startIndex + itemsPerPage);
      const favorisProduits = currentProducts.filter((x) => favoris.includes(x.id));
      const totalPages = Math.ceil(favoris.length / itemsPerPage);

      return (
            <Annimated className="bg-white">
                  <div className="px-[5%] py-[1.5rem] bg-gray-100">
                        <Breadcrumb data={bread} />
                  </div>

                  <div className={`flex gap-5 px-[${paddingH}] py-10 md:py-14 flex-col`}>
                        <div className='flex justify-between items-center flex-wrap gap-3'>
                              <PresentationLabel
                                    titre={`MES FAVORIS (${favoris.length})`}
                                    Component={
                                          <NavLink
                                                className="text-[.8rem] flex items-center gap-2 text-black/70 font-semibold hover:underline"
                                                to={"#"}
                                          >
                                                Liste des produits <MoveRight size={14} />
                                          </NavLink>
                                    }
                              />

                              {favoris.length > 0 && (
                                    <button
                                          onClick={clearFavoris}
                                          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition"
                                    >
                                          Vider la liste
                                    </button>
                              )}
                        </div>           

                        <div className='grid gap-5 grid-cols-1 md:grid-cols-5'>
                              {favorisProduits.map((x) => (
                                    <CardProduit
                                          key={x.id}
                                          x={x}
                                          isFavori={favoris.includes(x.id)}
                                          onToggleFavori={toggleFavori}
                                    />
                              ))}

                              {favoris.length === 0 && (
                                    <div className="col-span-full text-center text-gray-500 py-10 font-medium">
                                          <p className='mb-2'>Aucun favori pour le moment.</p>
                                          <NavLink
                                                to="/produits"
                                                className="text-primary font-semibold hover:underline"
                                          >
                                                Découvrir nos produits
                                          </NavLink>
                                    </div>
                              )}
                        </div>

                        {favoris.length > itemsPerPage && (
                              <div className="flex justify-center mt-6 gap-2">
                                    {[...Array(totalPages)].map((_, idx) => (
                                          <button
                                                key={idx}
                                                onClick={() => setCurrentPage(idx + 1)}
                                                className={`px-3 py-1 rounded-md text-sm font-semibold border ${currentPage === idx + 1
                                                      ? "bg-primary text-white border-primary"
                                                      : "bg-white border-gray-300 hover:bg-gray-100"
                                                      }`}
                                          >
                                                {idx + 1}
                                          </button>
                                    ))}
                              </div>
                        )}
                  </div>
            </Annimated>
      );
}

export default Favoris;

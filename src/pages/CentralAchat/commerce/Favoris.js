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
import { Eye, Heart, MoveRight } from 'lucide-react'


const CardProduit = ({ x, isFavori, onToggleFavori }) => {
      const getImageFourn = (z) => datac.find((y) => y?.id === z)?.image

      return (
            <div className="group border border-gray-200 bg-white rounded-[6px] p-3 md:p-4 flex items-stretch gap-3 md:gap-4">
                  <div className="relative shrink-0 w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-primary/5 rounded-[6px] overflow-hidden">
                        <img
                              className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[.95]"
                              src={x.image}
                              alt={x.titre}
                              loading="lazy"
                        />
                        <div className="flex absolute right-2 top-2.5 text-secondary/65 flex-col gap-2 transform transition-all duration-300 translate-x-[120%] group-hover:translate-x-0">
                              <button
                                    type="button"
                                    onClick={() => onToggleFavori(x.id)}
                                    aria-pressed={!!isFavori}
                                    aria-label={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    className="p-1 w-fit cursor-pointer rounded-full hover:text-primary/65 bg-gray-100 flex justify-center items-center transition"
                              >
                                    <Heart
                                          size={20}
                                          strokeWidth={2}
                                          className={isFavori ? 'text-red-600' : 'text-gray-400'}
                                          fill={isFavori ? '#E30713' : 'none'}
                                    />
                              </button>

                              <button
                                    type="button"
                                    className="p-1 w-fit cursor-pointer rounded-full hover:text-primary/65 bg-gray-100 flex justify-center items-center"
                                    title="Aperçu"
                              >
                                    <Eye strokeWidth={2} size={20} />
                              </button>
                        </div>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                        <div className="min-w-0">
                              <NavLink to={`/produits/${x.id}`} className="block">
                                    <h2 className="group-hover:text-blue-800 text-primary/80 truncate transition-colors duration-300 text-[1.05rem] leading-[1.3] font-semibold">
                                          {x.titre}
                                    </h2>
                              </NavLink>

                              <div className="mt-2 flex items-center gap-3 flex-wrap">
                                    <ul className="flex items-center gap-0.5">
                                          <li><StarIcon size={11} className="text-yellow-500 fill-yellow-500" /></li>
                                          <li><StarIcon size={11} className="text-yellow-500 fill-yellow-500" /></li>
                                          <li><StarIcon size={11} className="text-yellow-500 fill-yellow-500" /></li>
                                          <li><StarIcon size={11} className="text-yellow-500 fill-yellow-500" /></li>
                                          <li><StarHalfIcon strokeWidth={0.5} className="text-yellow-500 fill-yellow-500" size={11} /></li>
                                    </ul>

                                    <span className="text-green-700 font-bold text-[.72rem]">
                                          EN STOCK : <mark className="bg-transparent">{x.qte} {x.meter}</mark>
                                    </span>
                              </div>
                        </div>

                        <div className="w-full md:w-auto flex items-center md:items-end justify-between md:flex-col gap-3 md:gap-4">
                              <div className="flex items-center gap-3">
                                    <span className="text-secondary text-[.95rem] font-bold">
                                          {x.monaie}{x.pu}
                                          <sub className="text-[.62rem] top-0 font-bold text-primary/80">/{x.meter}</sub>
                                    </span>

                                    {x.fournisseur && (
                                          <img
                                                className="w-[50px] h-[32px] object-contain opacity-90"
                                                src={getImageFourn(x.fournisseur)}
                                                alt="Fournisseur"
                                                loading="lazy"
                                          />
                                    )}
                              </div>

                              <button
                                    type="button"
                                    className="relative w-full md:w-[220px] rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group/btn"
                              >
                                    <span className="absolute left-0 top-0 h-full w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></span>
                                    <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-primary/90">
                                          <ShoppingCart01Icon strokeWidth={2} size={19} className="transition-colors duration-500 group-hover:text-primary/90" />
                                          Ajouter au panier
                                    </span>
                              </button>
                        </div>
                  </div>
            </div>
      )
}


const CtaPublicitaire = ({ produit }) => {
      if (!produit) return null;

      return (
            <aside className="hidden xl:block sticky top-24 self-start w-[320px] 2xl:w-[340px] flex-shrink-0">
                  <div className="border border-gray-200 rounded-[8px] overflow-hidden bg-white">
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-50 flex items-start gap-2">
                              <div>
                                    <h3 className="text-sm font-semibold text-primary/90">Ne ratez pas ce produit</h3>
                              </div>
                        </div>

                        <div className="p-4">
                              <NavLink to={`/produits/${produit.id}`} className="block">
                                    <div className="relative h-[180px] bg-primary/5 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                                          <img
                                                src={produit.image}
                                                alt={produit.titre}
                                                className="object-contain w-full h-full"
                                          />
                                          <span className="absolute left-2 top-2 text-[10px] uppercase bg-primary text-white rounded-full px-2 py-0.5">
                                                Coup de coeur
                                          </span>
                                    </div>
                                    <h4 className="text-[.95rem] font-semibold text-primary/80 line-clamp-2 mb-2">
                                          {produit.titre}
                                    </h4>
                              </NavLink>

                              <div className="flex items-center justify-between mb-3">
                                    <span className='text-secondary text-[.95rem] font-bold'>
                                          {produit.monaie}{produit.pu}
                                          <sub className="text-[.62rem] top-[0] font-bold text-primary/80">{"/" + produit.meter}</sub>
                                    </span>

                                    <NavLink
                                          to={`/produits/${produit.id}`}
                                          className="text-[.8rem] text-primary/80 font-semibold hover:underline flex items-center gap-1"
                                    >
                                          Découvrir <MoveRight size={14} />
                                    </NavLink>
                              </div>

                              <button className="relative w-full rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group">
                                    <span className="absolute left-0 top-0 h-full w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></span>
                                    <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-500 group-hover:text-primary/90">
                                          <ShoppingCart01Icon strokeWidth={2} size={19} className="transition-colors duration-500 group-hover:text-primary/90" />
                                          Ajouter au panier
                                    </span>
                              </button>
                        </div>
                  </div>
            </aside>
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

      const favorisProduitsAll = data.filter((x) => favoris.includes(x.id));
      const totalPages = Math.ceil(favorisProduitsAll.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const favorisProduits = favorisProduitsAll.slice(startIndex, startIndex + itemsPerPage);

      const featuredProduct = data.find((p) => !favoris.includes(p.id)) || data[3];

      return (
            <Annimated className="bg-white">

                  <div className="px-[5%] py-[1.5rem] bg-gray-100">
                        <Breadcrumb data={bread} />
                  </div>

                  <div className={`px-[${paddingH}] py-10 md:py-14`}>
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
                                          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition whitespace-nowrap shrink-0"
                                          title="Vider la liste de favoris"
                                    >
                                          Vider la liste
                                    </button>
                              )}
                        </div>

                        <div className="mt-6 flex flex-col xl:flex-row items-start gap-6">
                              <div className="flex-1 min-w-0">
                                    <div className="flex flex-col gap-4">
                                          {favorisProduits.map((x) => (
                                                <CardProduit
                                                      key={x.id}
                                                      x={x}
                                                      isFavori={favoris.includes(x.id)}
                                                      onToggleFavori={toggleFavori}
                                                />
                                          ))}

                                          {favoris.length === 0 && (
                                                <div className="text-center text-gray-500 py-10 font-medium">
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

                                    {favorisProduitsAll.length > itemsPerPage && (
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

                              <CtaPublicitaire produit={featuredProduct} />
                        </div>
                  </div>

                  <div className={`flex gap-6 pb-10 md:pb-14  px-[${paddingH}]`}>
                        <div className="w-full border relative overflow-hidden shadow rounded-[6px] h-[472.5px]">
                              <img className='w-full h-full object-cover aspect-[4/4]' src='/images/produits/ban2role.jpg' alt='p1' />
                              <div className='absolute flex flex-col gap-6 px-[5%] w-[50%] left-0 top-1/2 -translate-y-1/2'>
                                    <div className='flex flex-col gap-3'>
                                          <span className='text-[.9rem] font-semibold text-secondary/80'>Discount - 10%</span>
                                          <h1 className='text-[3.1rem] text-primary/85 leading-[1] font-bold'>
                                                StepStyle Shoes
                                          </h1>
                                          <p className='text-md text-gray-500 font-normal'>
                                                Confort, élégance et durabilité. Des chaussures pensées pour sublimer chaque pas, au quotidien comme dans les grands moments.
                                          </p>
                                    </div>
                                    <button className='px-8 text-white w-2/3 rounded-md text-md font-bold bg-secondary/80 py-2.5'>Acheter maintenant</button>
                              </div>
                        </div>
                  </div>
            </Annimated>
      );
}

export default Favoris;
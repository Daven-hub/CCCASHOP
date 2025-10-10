import React, { useState } from 'react'
import Annimated from '../../components/Annimated';
// import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import data from "../../datas/produits.json"
import datac from "../../datas/fournisseur.json"
import { ArrowRightDoubleIcon, ArrowRight04Icon, StarIcon, UserAccountIcon, Bitcoin02Icon, Building01Icon, Location01Icon, Mail01Icon, SecurityValidationIcon, ZapIcon, UserMultiple02Icon, Globe02Icon, Award04Icon, HeadphonesIcon, Building06Icon, ShoppingCart01Icon, Bitcoin04Icon, Building04Icon, StarHalfIcon, FavouriteIcon, EyeIcon } from 'hugeicons-react';
// import moment from 'moment';
import { ArrowRight02Icon } from 'hugeicons-react';
// import acheteurs from "../../datas/Acheteur.json"

// export const CardFournisseur = ({ item }) => {
//       return (
//             <div className='px-3.5 md:px-4 py-4 flex flex-col gap-4 rounded-[6px] border'>
//                   <div className='flex gap-3 items-center'>
//                         <img className='w-[62px] border h-[62px] p-1 object-contain rounded-[50px] flex-shrink-0' src={item?.image} alt={item?.nom} />
//                         <div className='flex flex-col'>
//                               <h3 className='capitalize leading-[1.3] text-[1.02rem] font-bold text-primary'>{item?.nom}</h3>
//                               <span className='text-gray-600 capitalize font-semibold text-[.85rem]'>{item?.forme}</span>
//                         </div>
//                   </div>
//                   <div className='flex flex-col font-semibold gap-1'>
//                         <span className='flex capitalize text-[.85rem] items-center gap-2 text-gray-700'> <Building01Icon size={18} /> {item?.domaine}</span>
//                         <span className='flex capitalize text-[.85rem] items-center gap-2 text-gray-700'> <Location01Icon size={18} />{item?.adresse + ", " + item?.pays}</span>
//                         {/* <span> <UserBlock01Icon size={20}/></span> */}
//                   </div>
//                   {/* <div className='bg-green-100 px-4 py-2.5'>
//                         <p className='text-green-900 font-semibold text-[.9rem]'>Volume d'achat</p>
//                         <span className='font-bold'>{item?.volume}</span>
//                   </div> */}
//                   <p className='text-[.85rem] text-gray-600 font-medium'>{item?.descrip}</p>
//                   <div className='flex flex-col gap-1.5'>
//                         <span className='text-[.8rem] font-medium text-gray-800'>Catégories recherchées :</span>
//                         <ul className='flex items-center gap-1.5'>
//                               {item?.categ?.map((x, indo) =>
//                                     <li key={indo} className='py-0.5 px-3 text-secondary/90 text-[.7rem] font-bold rounded-[50px] bg-secondary/10'>{x}</li>
//                               )}
//                         </ul>
//                   </div>
//                   <div className='flex items-center gap-3'>
//                         <NavLink to={"/centrale_achat/fournisseurs/" + item?.id} className='w-[85%] text-[.9rem] text-white/70 flex justify-center items-center p-2 bg-primary/60 rounded-[6px]'>
//                               Détails
//                         </NavLink>
//                         <div className='w-[15%] cursor-pointer border flex items-center justify-center p-2 rounded-[6px]'>
//                               <Mail01Icon strokeWidth={2} size={20} />
//                         </div>
//                   </div>
//             </div>
//       )
// }
export const CardFournisseur = ({ item }) => {
      return (
            <div className='px-3.5 md:px-4 py-4 flex flex-col gap-4 rounded-[6px] border'>
                  
            </div>
      )
}

export const CardAcheteur = ({ item }) => {
      return (
            <div className='px-5 md:px-7 py-5 flex flex-col gap-4 rounded-[6px] border'>
                  <div className='flex gap-3 items-center'>
                        <img className='w-[60px] h-[60px] rounded-[50px] flex-shrink-0' src={item?.image} alt={item?.nom} />
                        <div className='flex flex-col'>
                              <h3 className='capitalize leading-[1.3] text-[1.15rem] font-bold text-primary'>{item?.nom}</h3>
                              <span className='text-gray-600 capitalize font-semibold text-[.9rem]'>{item?.forme}</span>
                        </div>
                  </div>
                  <div className='flex flex-col font-semibold gap-1'>
                        <span className='flex capitalize text-[.9rem] items-center gap-2 text-gray-700'> <Building01Icon size={18} /> {item?.domaine}</span>
                        <span className='flex capitalize text-[.9rem] items-center gap-2 text-gray-700'> <Location01Icon size={18} />{item?.adresse + ", " + item?.pays}</span>
                        {/* <span> <UserBlock01Icon size={20}/></span> */}
                  </div>
                  <div className='bg-green-100 px-4 py-2.5'>
                        <p className='text-green-900 font-semibold text-[.9rem]'>Volume d'achat</p>
                        <span className='font-bold'>{item?.volume}</span>
                  </div>
                  <p className='text-[.95rem] text-gray-600 font-medium'>{item?.descrip}</p>
                  <div className='flex flex-col gap-1.5'>
                        <span className='text-[.8rem] font-medium text-gray-800'>Catégories recherchées :</span>
                        <ul className='flex items-center gap-1.5'>
                              {item?.categ?.map((x, indo) =>
                                    <li key={indo} className='py-1 px-3 text-secondary/90 text-[.7rem] font-bold rounded-[50px] bg-secondary/10'>{x}</li>
                              )}
                        </ul>
                  </div>
                  <div className='flex items-center gap-3'>
                        <NavLink to={"/centrale_achats/acheteurs/" + item?.id} className='w-[85%] text-[.9rem] text-white/70 flex justify-center items-center p-2 bg-primary/60 rounded-[6px]'>
                              Détails
                        </NavLink>
                        <div className='w-[15%] cursor-pointer border flex items-center justify-center p-2 rounded-[6px]'>
                              <Mail01Icon strokeWidth={2} size={20} />
                        </div>
                  </div>
            </div>
      )
}

export const CardPourquoi = ({ item }) => {
      return (
            <div className='flex border bg-white flex-col gap-3 p-8 rounded-[6px]'>
                  <div className='flex w-fit p-2 rounded-[10px] bg-secondary/5 text-primary items-center justify-center'>
                        {item?.icon}
                  </div>
                  <h2 className='text-[1.35rem] leading-[1.3] text-primary font-bold'>{item?.titre}</h2>
                  <p className='text-[1rem] leading-[1.3] text-gray-700'>{item?.descrip}</p>
            </div>
      )
}


export const CardProduit = ({ x }) => {

      const getImageFourn=(z)=>{
           return datac.find((y)=>y?.id===z)?.image
      }
      return (
            <div className='group border p-2 border-gray-200 overflow-hidden bg-white rounded-[5px]'>
                  <div className='relative h-[200px] md:h-[265px] overflow-hidden p-6 bg-primary/5'>
                        <img className='absolute group-hover:scale-[.75] duration-500 transition-all scale-[.65] rounded-t-[5px] overflow-hidden left-0 top-0 w-full h-full object-contain' src={x.image} alt='item' />
                        {/* <div className='absolute top-[5%] text-white right-[3%] bg-green-700 font-bold border border-white rounded-[50px] px-4 text-[.7rem]'>
                              {x.statut}
                        </div> */}
                        <div className='flex absolute right-2 top-2.5 text-secondary/65 flex-col gap-2 transform transition-transform duration-300 translate-x-[120%] group-hover:translate-x-0'>
                              <div className='p-1 w-fit cursor-pointer rounded-full  hover:text-primary/65 bg-gray-100'><FavouriteIcon strokeWidth={2} size={20} /> </div>
                              <div className='p-1 w-fit cursor-pointer rounded-full  hover:text-primary/65 bg-gray-100'><EyeIcon strokeWidth={2} size={20} /> </div>
                        </div>
                  </div>
                  <div className='py-3 relative px-2 flex flex-col gap-2'>
                        <NavLink to={"/produits/" + x.id} className='flex items-center gap-1.5'>
                              <div className='flex flex-col gap-1 whitespace-nowrap overflow-hidden'>
                                    <h1 className='group-hover:text-blue-800 text-primary/80 text-ellipsis duration-300 transition-all text-[1.05rem] leading-[1.3] font-semibold'>{x.titre}</h1>
                              </div>
                        </NavLink>
                        <div className="flex flex-col gap-2">
                              <span className="flex items-center text-green-700 font-bold text-[.7rem]">EN STOCK : <mark className="bg-transparent">&nbsp;{x.qte+" "+x.meter} </mark></span>
                              <ul className='flex items-center gap-0.5'>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /> </li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /> </li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /> </li>
                                    <li><StarIcon size={11} className='text-yellow-500 fill-yellow-500' /> </li>
                                    <li><StarHalfIcon strokeWidth={0.5} className='text-yellow-500 fill-yellow-500' size={11} /> </li>
                              </ul>
                              <span className='
                              text-secondary text-[.9rem] font-bold'>{x.monaie+""+x.pu}<sub className="text-[.62rem] top-[0] font-bold text-primary/80">{"/"+x.meter}</sub></span>
                        </div>
                        <div className='absolute right-0.5 bottom-[36%] w-[60px] group-hover:opacity-100 opacity-40 h-[40px] p-0.5'>
                              <img className='object-contain w-full h-full' src={getImageFourn(x.fournisseur)} alt="Dr Prese" />
                        </div>
{/* <span className='text-[.85rem] text-gray-600 text-ellipsis font-medium flex items-center gap-1'><Building06Icon strokeWidth={2} size={13} /> Franchise IT</span> */}
                        <button className="relative w-full mt-1.5 rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group">
                              <span className="absolute left-0 top-0 h-full w-0 bg-primary/10 
                                                transition-all duration-500 ease-out group-hover:w-full"></span>

                              <span className="relative z-10 flex items-center gap-2.5 
                                                transition-colors duration-500 group-hover:text-primary/90">
                              <ShoppingCart01Icon 
                                    strokeWidth={2} 
                                    size={19} 
                                    className="transition-colors duration-500 group-hover:text-primary/90"
                              />
                              Ajouter au panier
                              </span>
                        </button>
                  </div>
            </div>
      )
}

function CentralAchat() {
      // const { t } = useTranslation();
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 8;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

      const iconSize = 40

      const avantages = [
            "Visibilité maximale auprès de milliers d'acheteurs",
            "Support marketing pour promouvoir vos produits",
            "Système de notation et d'avis clients",
            "Interface intuitive et facile à utiliser",
            "Statistiques détaillées de performance"
      ]

      const success = [
            {
                  icon: <Bitcoin02Icon strokeWidth={2} size={25} className='text-green-500' />,
                  label: "+250%",
                  descrip: "Augmentation des ventes",
                  color: "bg-green-50"
            },
            {
                  icon: <UserAccountIcon strokeWidth={2} size={25} className='text-primary/70' />,
                  label: "5,000+",
                  descrip: "Nouveaux clients acquis",
                  color: "bg-blue-50"
            },
            {
                  icon: <StarIcon strokeWidth={2} size={25} className='text-yellow-500' />,
                  label: "4.8/5",
                  descrip: "Note moyenne satisfaction",
                  color: "bg-yellow-50"
            }
      ]

      const pourquoiCcca = [
            {
                  icon: <SecurityValidationIcon strokeWidth={1} size={iconSize} />,
                  titre: "Sécurité Garantie",
                  descrip: "Tous nos fournisseurs sont vérifiés et certifiés pour garantir la qualité de vos transactions."
            },
            {
                  icon: <ZapIcon strokeWidth={1} size={iconSize} />,
                  titre: "Mise en Relation Rapide",
                  descrip: "Connectez-vous instantanément avec les fournisseurs qui correspondent à vos besoins."
            },
            {
                  icon: <UserMultiple02Icon strokeWidth={1} size={iconSize} />,
                  titre: "Réseau Étendu",
                  descrip: "Accédez à un vaste réseau de professionnels dans tous les secteurs d'activité."
            },
            {
                  icon: <Globe02Icon strokeWidth={1} size={iconSize} />,
                  titre: "Portée Internationale",
                  descrip: "Trouvez des partenaires locaux et internationaux pour développer votre business."
            },
            {
                  icon: <Award04Icon strokeWidth={1} size={iconSize} />,
                  titre: "Qualité Certifiée",
                  descrip: "Nos fournisseurs sont évalués et notés par la communauté pour assurer l'excellence."
            },
            {
                  icon: <HeadphonesIcon strokeWidth={1} size={iconSize} />,
                  titre: "Support 24/7",
                  descrip: "Notre équipe d'experts vous accompagne à chaque étape de vos partenariats."
            }
      ]

      const apropos = [
            {
                  icon: <Building04Icon strokeWidth={2} />,
                  label: "100+",
                  descrip: "Fournisseurs Actifs",
                  sty: "self-start"
            },
            {
                  icon: <UserMultiple02Icon strokeWidth={2} />,
                  label: "50+",
                  descrip: "Acheteurs Actifs",
                  sty: "self-center"
            },
            {
                  icon: <Bitcoin04Icon strokeWidth={2} />,
                  label: "€10M+",
                  descrip: "Volume d'Affaires",
                  sty: "self-end"
            }
      ]

      return (
            <Annimated>
                  {/* Banner */}
                  <div className='h-[calc(100vh-206px)] w-full relative flex items-center'>
                        <img loading='lazy' src={"/images/centrale/centrale.jpg"} alt="focus_gabon" className='absolute object-cover object-right w-full h-full z-1' />
                        <div className='absolute w-full h-full bg-[linear-gradient(90deg,_#062338FF_38%,_#ffffff0d)] max-md:bg-[rgb(6,35,56,.6)] z-2'></div>
                        <div className='px-[5%] min-[2080px]:w-53% z-10 text-white min-[1360px]:w-[65%] flex flex-col gap-4 max-md:gap-3 max-md:w-full'>
                              <p className='text-[2.8rem] max-md:text-[1.4rem] leading-tight font-bold'>CENTRALE D'ACHATS</p>
                              <p className='text-[1.6rem] max-md:text-[.9rem] leading-snug font-medium'>
                                    Découvrez notre plateforme centralisée qui connecte les fournisseurs et les acheteurs à travers une large gamme de produits de qualité
                              </p>
                              <div className='grid w-[80%] max-md:w-full grid-cols-2 max-md:text-[.9rem] max-md:grid-cols-1 gap-4 mt-2'>
                                    <NavLink to={'/centrale_achats/login'} className='py-2 font-semibold text-center flex justify-center gap-3 px-5 bg-secondary  border-2 text-white rounded-md border-white'>Se connecter<ArrowRight02Icon /></NavLink>
                                    <NavLink to={'/centrale_achats/'} className='py-2 font-semibold text-center flex justify-center gap-3 px-5  border-2 text-white rounded-md border-white'>Commencer mes achats <ArrowRight02Icon /></NavLink>
                                    {/* <NavLink to={'/a/centrale_d_achat/enregistrement/acheteur'} className='py-2 font-semibold text-center flex justify-center items-center gap-4 text-white bg-secondary rounded-md '>Je suis un acheteur<ArrowRight02Icon /></NavLink> */}
                              </div>
                        </div>
                  </div>

                  <div className='grid relative z-[1] grid-cols-1 md:grid-cols-2 px-[5%] md:px-[6%] gap-9 py-12 md:py-16 bg-white'>
                        <div className='flex flex-col font-medium gap-2'>
                              <p className='text-[1rem] md:text-[1.1rem] text-gray-600'>Ici on regroupe plusieurs acheteurs afin de négocier et d’acheter des produits ou services en commun auprès des fournisseurs.</p>
                              <p className='text-[1rem] md:text-[1.1rem] text-gray-600'>Son rôle est de mutualiser les besoins, obtenir de meilleurs prix, simplifier les processus d’approvisionnement et assurer la qualité des produits. Grâce à ce modèle, les fournisseurs bénéficient d’un accès direct à un réseau élargi de clients, tandis que les acheteurs profitent d’un gain de temps, d’économies et d’une meilleure sécurité d’approvisionnement.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {apropos?.map((x, ind) =>
                                    <div key={ind} className={`flex flex-col gap-3.5 items-center ${x.sty} bg-gray-100 py-5 px-5 rounded`}>
                                          <div className='rounded-[6px] px-4 py-2.5 bg-secondary/10'>{x.icon}</div>
                                          <div className='flex items-center flex-col gap-0.5'>
                                                <h3 className='text-primary leading-[1.1] text-[1.3rem] font-extrabold'>{x.label}</h3>
                                                <span className='text-gray-600 text-center font-semibold text-[.9rem]'>{x.descrip}</span>
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>

                  <div className='flex flex-col px-[5%] gap-6 py-12 md:py-16 bg-primary relative'>
                        <div className='absolute max-md:hidden overflow-hidden -top-[80px] p-8 z-0 left-[5%] w-[160px] h-[160px] rounded-full bg-white'>
                              <div className='h-1/2 w-full bg-green-500'></div>
                              <div className='h-1/2 w-full rounded-full bg-secondary'></div>
                        </div>
                        <div className='absolute max-md:hidden overflow-hidden p-8 -top-[80px] z-0 right-[5%] w-[160px] rounded-full h-[160px] bg-white'>
                              <div className='h-1/2 w-full bg-green-500'></div>
                              <div className='h-1/2 w-full rounded-full bg-secondary'></div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                              <h2 className='text-[2rem] md:text-[2.1rem] m-0 p-0 text-white leading-[1.3] font-extrabold'>Pourquoi choisir notre plateforme ?</h2>

                              <span className='text-[1rem] md:text-[1.1rem] leading-[1.3] max-w-2xl text-start md:text-center font-medium text-white/60'>Nous offrons la solution la plus complète pour connecter acheteurs et fournisseurs dans un environnement sécurisé et professionnel.</span>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                              {pourquoiCcca?.map((item, ind) =>
                                    <CardPourquoi key={ind} item={item} />
                              )}
                        </div>
                  </div>

                  {/* produits */}
                  {/* <div className='max-md:w-full flex flex-col gap-7 px-[5%] py-16 max-md:py-12'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                              <h2 className='text-[2rem] text-primary leading-[1.1] font-extrabold'>Nos Catalogues de produits</h2>
                              <span className='text-[1rem] md:text-[1.1rem] leading-[1.3] max-w-2xl text-start md:text-center font-medium text-gray-600'>Nous offrons la solution la plus complète pour connecter acheteurs et fournisseurs dans un environnement sécurisé et professionnel.</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-7'>
                              {paginatedData?.slice(0, 7).map((x, index) => (
                                    <CardProduit key={index} x={x} />
                              ))}
                              <NavLink to={"/a/centrale_d_achat/produits/"} className='group border-2 overflow-hidden rounded-[6px] max-md:h-[300px] p-0.5 relative'>
                                    <div className='absolute h-full left-0 top-0 w-full '>
                                          <img className='absolute rounded-t-[6px] overflow-hidden left-0 top-0 w-full h-full object-cover' src={"/images/centrale/entrepot.jpg"} alt='item' />
                                    </div>
                                    <div className='absolute h-full w-full items-center justify-center top-0 left-0 bg-black/70 p-8 flex flex-col gap-1.5'>
                                          <p className='text-[1.5rem] transition-all duration-300 gap-2 group-hover:text-white/50 text-center leading-[1.3] text-white font-semibold'>Liste des Produits <MoveRightIcon strokeWidth={2} size={40} className='inline align-middle' /></p>
                                    </div>
                              </NavLink>
                        </div>
                  </div> */}

                  {/* fournisseurs */}
                  <div className='max-md:w-full grid bg-tiers grid-cols-1 md:grid-cols-2 gap-10 px-[5%] py-16 max-md:py-12'>
                        <div className='flex flex-col gap-4 md:gap-2.5'>
                              <h2 className='text-[2rem] md:text-[2.5rem] text-primary leading-[1.3] font-extrabold'>Développez Votre Business en Tant que <mark className='bg-transparent text-secondary'>Fournisseur</mark></h2>

                              <p className='text-[1rem] md:text-[1.1rem] leading-[1.3] font-medium text-gray-600'>Rejoignez notre réseau de fournisseurs d'excellence et accédez à de nouveaux marchés grâce à notre plateforme innovante.</p>

                              <ul className="flex flex-col gap-2">
                                    {avantages?.map((x, ind) =>
                                          <li key={ind} className="text-secondary/70 text-[1rem] md:text-[1.15rem] font-semibold items-center gap-2.5"><ArrowRightDoubleIcon className="text-secondary inline align-middle mr-1" />{x}</li>
                                    )}
                              </ul>

                              <div className="grid md:grid-cols-2 gap-2 text-[.85rem] md:text-[1rem] md:gap-6 mt-2">
                                    <NavLink to={"/a/centrale_d_achat/enregistrement/fournisseur"} className="px-4 py-3 rounded-[6px] bg-primary text-white flex gap-2 justify-center items-center">
                                          Devenir un fournisseur <ArrowRight04Icon />
                                    </NavLink>
                                    <NavLink to={"/a/centrale_d_achat/fournisseurs"} className="px-4 py-3 rounded-[6px] bg-primary text-white flex justify-center gap-2 items-center text-center">
                                          Listes des fournisseurs <ArrowRight04Icon />
                                    </NavLink>
                              </div>
                        </div>
                        <div className='px-5 md:px-8 py-7 rounded-[6px] flex flex-col gap-3.5 bg-white border'>
                              <h2 className='text-[1.18rem] md:text-[1.35rem] text-primary font-extrabold'>Succès de Nos Fournisseurs</h2>
                              <div className='flex flex-col gap-4'>
                                    {success?.map((x, ind) =>
                                          <div key={ind} className={`py-5 px-5 md:px-6 flex justify-between items-center border ${x.color} rounded-[6px]`}>
                                                <div className='flex gap-4 items-center'>
                                                      <div className='flex bg-primary/10 flex-shrink-0 items-center justify-center p-3 rounded-[50px]'>
                                                            {x.icon}
                                                      </div>
                                                      <div className='flex flex-col gap-0.5'>
                                                            <h3 className='text-[1.2rem] md:text-[1.45rem] font-extrabold leading-[1]'>{x.label}</h3>
                                                            <span className='text-gray-500 text-[.8rem] md:text-[.9rem] font-semibold'>{x.descrip}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>

                  {/* Acheteurs */}
                  {/* <div className='flex flex-col px-[5%] gap-6 py-12 md:py-16'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                              <h2 className='text-[2rem] text-primary leading-[1.1] font-extrabold'>Acheteurs Actifs sur Notre Plateforme</h2>
                              <span className='text-[1rem] md:text-[1.1rem] leading-[1.3] max-w-2xl text-start md:text-center font-medium text-gray-600'>Découvrez les entreprises qui recherchent activement des fournisseurs et des partenaires commerciaux de qualité.</span>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-[3%]'>
                              {acheteurs?.slice(0, 3)?.map((item, ind) =>
                                    <CardAcheteur key={ind} item={item} />
                              )}
                        </div>
                        <NavLink to={"/a/centrale_d_achat/acheteurs"} className='border-2 mt-1.5 text-[.8rem] md:text-[.9rem] mx-auto flex gap-2 text-primary w-full md:w-[25%] justify-center font-bold border-dashed border-primary rounded-[6px] py-2 px-6'>
                              Tous les Acheteurs <ArrowRight02Icon size={25} />
                        </NavLink>
                  </div> */}
            </Annimated>
      )
}

export default CentralAchat

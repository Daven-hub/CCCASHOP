import React, { useEffect, useState } from 'react'
import HeadersBottom from '../../components/Navbar/CentraleAchat/HeadersBottom'
import data from '../../datas/produits.json'
import datas from '../../datas/fournisseur.json'
import { NavLink } from 'react-router-dom'
import { paddingH } from '../../components/Navbar/CentraleAchat/Headers'
import { FaCheck } from 'react-icons/fa'
import { MoveRight } from 'lucide-react'
import PresentationLabel from '../../components/PresentationLabel'
import {
  StarIcon,
  Building01Icon,
  Location01Icon,
  Mail01Icon,
  ShoppingCart01Icon,
  StarHalfIcon,
  FavouriteIcon,
  EyeIcon
} from 'hugeicons-react'
import datac from '../../datas/fournisseur.json'
import SEO from '../../components/SEO'

import { useDispatch, useSelector } from 'react-redux'
import { getAllAttrs } from '../../store/slices/attribute.slice.js'
import { getAllAttrValues } from '../../store/slices/attributeValue.slice'
import { getAllProduits } from '../../store/slices/produits.slice'
import { getAllVendor } from '../../store/slices/vendeur.slice'
import { getAllProduitVariants } from '../../store/slices/produitVariant.slice'
import { useAuth } from '../../context/authContext.js'
import LoaderUltra from '../../components/ui/LoaderUltra.js'
import { BaseUrl } from '../../config.js'
import { getAllVariantValues } from '../../store/slices/variantValue.slice.js'
import { AlertTriangle, Layers, Package, ShoppingBag } from 'lucide-react'
import { useToast } from '../../hook/use-toast.js'
import { CardProduit } from '../../components/card/CardProduit.js'

export const CardFournisseur = ({ item }) => {
  return (
    <div className='px-3.5 md:px-4 py-4 flex flex-col gap-4 rounded-[6px] border'></div>
  )
}

export const CardAcheteur = ({ item }) => {
  return (
    <div className='px-5 md:px-7 py-5 flex flex-col gap-4 rounded-[6px] border'>
      <div className='flex gap-3 items-center'>
        <img
          className='w-[60px] h-[60px] rounded-[50px] flex-shrink-0'
          src={item?.image}
          alt={item?.nom}
        />
        <div className='flex flex-col'>
          <h3 className='capitalize leading-[1.3] text-[1.15rem] font-bold text-primary'>
            {item?.nom}
          </h3>
          <span className='text-gray-600 capitalize font-semibold text-[.9rem]'>
            {item?.forme}
          </span>
        </div>
      </div>
      <div className='flex flex-col font-semibold gap-1'>
        <span className='flex capitalize text-[.9rem] items-center gap-2 text-gray-700'>
          {' '}
          <Building01Icon size={18} /> {item?.domaine}
        </span>
        <span className='flex capitalize text-[.9rem] items-center gap-2 text-gray-700'>
          {' '}
          <Location01Icon size={18} />
          {item?.adresse + ', ' + item?.pays}
        </span>
        {/* <span> <UserBlock01Icon size={20}/></span> */}
      </div>
      <div className='bg-green-100 px-4 py-2.5'>
        <p className='text-green-900 font-semibold text-[.9rem]'>
          Volume d'achat
        </p>
        <span className='font-bold'>{item?.volume}</span>
      </div>
      <p className='text-[.95rem] text-gray-600 font-medium'>{item?.descrip}</p>
      <div className='flex flex-col gap-1.5'>
        <span className='text-[.8rem] font-medium text-gray-800'>
          Catégories recherchées :
        </span>
        <ul className='flex items-center gap-1.5'>
          {item?.categ?.map((x, indo) => (
            <li
              key={indo}
              className='py-1 px-3 text-secondary/90 text-[.7rem] font-bold rounded-[50px] bg-secondary/10'
            >
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center gap-3'>
        <NavLink
          to={'/centrale_achats/acheteurs/' + item?.id}
          className='w-[85%] text-[.9rem] text-white/70 flex justify-center items-center p-2 bg-primary/60 rounded-[6px]'
        >
          Détails
        </NavLink>
        <div className='w-[15%] cursor-pointer border flex items-center justify-center p-2 rounded-[6px]'>
          <Mail01Icon strokeWidth={2} size={20} />
        </div>
      </div>
    </div>
  )
}


export const avantages = [
  'Paiement securisé',
  "Engagement envers l'authenticité",
  'Garantie de remboursement globale',
  'Directives strictes pour les concessionnaires',
  'Envois assurés',
  'Qualité des produits'
]

function CentralAchat () {
  const [isLoading, setIsLoading] = useState(true)
  const [loadTime, setLoadTime] = useState(0)
  const dispatch = useDispatch()
  //   const { userConnected } = useAuth()
  const { toast } = useToast()
  const { produits } = useSelector(state => state.produit)
   const { vendeurs } = useSelector(state => state.vendeur)
  //   const [combined, setCombined] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      const start = performance.now()
      try {
        await Promise.all([
            dispatch(getAllProduits()).unwrap(),
            dispatch(getAllVendor()).unwrap(),
            dispatch(getAllProduitVariants()).unwrap()
      ])

        const end = performance.now()
        const duration = end - start
        setLoadTime(duration.toFixed(0))
      } catch (error) {
        toast({
          title: error?.toString(),
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dispatch,toast])

  if (isLoading) {
      return <LoaderUltra loading={isLoading} duration={loadTime} />
    }

  return (
    <>
      <SEO
        title={"Centrale d'achat"}
        description={'Bienveenue sur la centrale dachat'}
        url={'https://cc-ca.ca/produits'}
        image={'/entrepreneure_canadien.jpg'}
      />
      <div className='flex flex-col'>
        <HeadersBottom />
        <div className={`flex gap-5 px-[${paddingH}] py-10 md:py-14 flex-col`}>
          <PresentationLabel
            titre={'Produits en vedette'}
            Component={
              <NavLink
                className='text-[.8rem] flex items-center gap-2 text-black/70 font-semibold hover:underline'
                to={'#'}
              >
                Listes des produits <MoveRight size={14} />
              </NavLink>
            }
          />
          <div className='grid gap-3.5 grid-cols-1 md:grid-cols-5'>
            {produits?.slice(0, 5)?.map((x, index) => (
              <CardProduit key={index} x={x} />
            ))}
          </div>
        </div>
        <div
          className={`grid grid-cols-1 pt-4 pb-8 md:grid-cols-2 gap-8 px-[${paddingH}]`}
        >
          <div className='h-[210px] border relative overflow-hidden rounded-[6px]'>
            <img
              src={'/images/produits/bann3.jpg'}
              className='absolute object-cover object-right left-0 top-0 w-full h-full'
              alt='ccca_top_product'
            />
            <div className='absolute px-8 flex flex-col left-[43%] top-1/2 -translate-y-1/2'>
              <h1 className='text-yellow-700 text-[2rem] font-semibold'>
                Gateau madeleine
              </h1>
              <span className='text-[.98rem] text-gray-700'>
                Un moelleux fondant pour une pause douce et réconfortante.
                Redécouvrez
              </span>
              <div className='mt-1 text-[1rem] font-bold'>Voir plus</div>
            </div>
          </div>
          <div className='rounded-[6px] border overflow-hidden h-[210px] relative'>
            <img
              src={'/images/produits/banb1.jpg'}
              className='absolute object-right left-0 top-0 w-full h-full'
              alt='ccca_top_product'
            />
            <div className='absolute w-[50%] px-8 flex flex-col left-0 top-1/2 -translate-y-1/2'>
              <h1 className='text-primary/80 text-[1.8rem] font-semibold'>
                Laptops
              </h1>
              <span className='text-[.98rem] text-gray-700'>
                Un moelleux fondant pour une pause douce et réconfortante.
              </span>
              <div className='mt-1 text-[1rem] font-bold'>Voir plus</div>
            </div>
          </div>
        </div>
        <div className={`flex gap-5 px-[${paddingH}] py-10 md:py-14 flex-col`}>
          <PresentationLabel
            titre={'Articles recherchés par les acheteurs'}
            Component={
              <NavLink
                className='text-[.8rem] flex items-center gap-2 text-black/70 font-semibold hover:underline'
                to={'#'}
              >
                Listes des produits <MoveRight size={15} />
              </NavLink>
            }
          />
          <div className='grid gap-4 grid-cols-1 md:grid-cols-5'>
            {produits?.slice(0, 5)?.map((x, index) => (
              <CardProduit key={index} x={x} />
            ))}
          </div>
        </div>
        <div className={`px-[${paddingH}]`}>
          <div className='grid grid-cols-2 rounded-[7px] overflow-hidden'>
            <div
              className={`px-16 flex flex-col gap-7 py-12 md:py-14 bg-primary/90`}
            >
              <h3 className='text-[2.2rem] leading-[1.2] font-bold text-white'>
                Protection des acheteurs
              </h3>
              <ul className='flex flex-col gap-3.5 text-[1.15rem] text-white'>
                {avantages?.map((x, ind) => (
                  <li key={ind} className='flex gap-3 items-center'>
                    <FaCheck className='text-green-600' />
                    {x}
                  </li>
                ))}
              </ul>
              <NavLink
                to={'#'}
                className='text-white mt-1.5 border border-white flex justify-center items-center p-2.5 rounded-[7px]'
              >
                Devenir Acheteur
              </NavLink>
            </div>
            <div className='relative'>
              <img
                src={'/banAcheteur.jpg'}
                className='
                                    w-full absolute top-0 left-0 h-full object-cover'
                alt='ccca_banière_acheteur'
              />
              <div className='absolute w-full h-full z-[1] left-0 top-0 bg-gradient-to-t from-primary/90 to-primary/40'></div>
            </div>
          </div>
        </div>
        <div className={`flex gap-5 px-[${paddingH}] py-12 md:py-16 flex-col`}>
          <PresentationLabel
            titre={'Commander par fournisseur'}
            Component={''}
          />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-6'>
            {datas?.slice(0, 6)?.map((item, ind) => (
              <NavLink
                to={'/fournisseurs/' + item?.id}
                className='border shadow-sm aspect-video rounded-[6px] flex items-center justify-center p-1 '
                key={ind}
              >
                <img
                  className='w-[90%] rounded-[6px] object-contain h-[90%]'
                  src={item?.image}
                  alt={item?.nom}
                />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CentralAchat

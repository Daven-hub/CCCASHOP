import React, { useState, useEffect, useMemo } from 'react'
import Breadcrumb from '../../components/Breadcumb'
import Annimated from '../../components/Annimated'
import { paddingH } from '../../components/Navbar/CentraleAchat/Headers'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {  ShoppingCart01Icon } from 'hugeicons-react'
import { Loader2} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/Table'
import { getAllProduits } from '../../store/slices/produits.slice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCateg } from '../../store/slices/categories.slice'
import { getAllProduitVariants } from '../../store/slices/produitVariant.slice'
import {
  getAllFavoris,
  removeFavoris
} from '../../store/slices/favoris.slice'
import { useAuth } from '../../context/authContext'
import LoaderUltra from '../../components/ui/LoaderUltra'
import { BaseUrl } from '../../config'
import StarRating from '../../components/ui/StarRating'
import { FaTrashAlt } from 'react-icons/fa'
import { useToast } from '../../hook/use-toast'

function Favoris () {
  const { t } = useTranslation()
  const bread = [
    { label: t('accueille'), path: '/' },
    { label: 'Mes Favoris', path: '/favoris' }
  ]
  const dispatch = useDispatch()
  const { userConnected,monaie } = useAuth()
  const idConnected=userConnected?.role==='fournisseur'?userConnected?.id:userConnected?.idUsershop;
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(0)
  const { produits } = useSelector(state => state.produit)
  const { produitVariants } = useSelector(state => state.produitVariant)
  const { favoris } = useSelector(state => state.favori)
  const { toast } = useToast()
  const navigate = useNavigate()
  const [selected,setSelected]=useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now()
      try {
        await Promise.all([
          dispatch(getAllCateg()).unwrap(),
          dispatch(getAllProduits()).unwrap(),
          dispatch(getAllFavoris()).unwrap(),
          dispatch(getAllProduitVariants()).unwrap()
        ])
        const end = performance.now()
        const duration = end - start
        setLoadTime(duration.toFixed(0))
      } catch (error) {
        console.error('Erreur lors du chargement :', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dispatch])

  const getPrixVariantSock = id => {
    const variants = produitVariants
      ?.filter(x => x.idProduit === id)
      .map(y => y?.pu)
    const min = Math.min(...variants)
    const max = Math.max(...variants)
    let result = '$' + min
    if (min !== max) {
      result += ' - $' + max
    }
    return result
  }

  const getTotalStock = id => {
    const result = produitVariants
      ?.filter(x => x.idProduit === id)
      .reduce((sum, item) => sum + item.qte, 0)
    return result
  }

  const StatutStockProduit = ({ stock }) => {
    if (stock > 0) {
      return (
        <span className='py-1 px-4 border border-succes rounded-full text-[.6rem] text-success font-semibold bg-success/10'>
          EN STOCK
        </span>
      )
    }
    return (
      <span className='text-error border border-error rounded-full font-semibold text-[.6rem] py-1 px-4 bg-error/10'>
        TERMINE
      </span>
    )
  }

  // const StatutStock = (stock) => {
  //   if (stock > 0) {
  //     return true;
  //   }else if(stock<=0){
  //     return false
  //   }
  // }

  const messFavoris = useMemo(() => {
    const res = favoris?.filter(
      x =>
        x?.idUser === idConnected && x?.roleUser === userConnected?.role
    )
    const result = res?.map(y => {
      const monProduit = produits?.find(z => z.idproduits === y.idProduits)
      return {
        ...y,
        produit: monProduit
      }
    })
    return result
  }, [favoris, produits, userConnected?.role, idConnected])

  const handleAddRemoveFavoris = async produits => {
    setLoading(true)
    const { idproduits } = produits
    setSelected(idproduits)
    const favorisUnique = favoris?.find(
      x => x?.idProduits === idproduits && x?.idUser === idConnected
    )
    try {
      if (!userConnected) {
        navigate('/mon-compte/connexion')
      } else {
        await dispatch(removeFavoris(favorisUnique?.idFavoris)).unwrap()
        dispatch(getAllFavoris()).unwrap()
        toast({
          title: 'Produit retiré des favoris'
        })
      }
    } catch (error) {
      toast({
        title: 'Retrait échouée',
        description: error?.toString(),
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />
  }

  return (
    <Annimated className='flex flex-col gap-5 bg-gray-50'>
      <div className={`py-4 px-[${paddingH}] border-b bg-white`}>
        <Breadcrumb data={bread} />
      </div>
      {/* <div className='h-[120px] border-b font-semibold text-3xl flex items-center justify-center bg-gray-50'>
        <span>Mes Favoris</span>
      </div> */}
      <div className={`px-[${paddingH}]  py-10 md:pb-14`}>
        <div className='px-[2.5%] pt-7 pb-5 border rounded-[6px] bg-white'>
          <Table>
            <TableHeader className='border-b-2 border-black/20'>
              <TableRow>
                <TableHead className='w-[50%]'>Produits</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {messFavoris?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='text-center py-8'>
                    Vous n'avez pas de produits disponible comme favoris!
                  </TableCell>
                </TableRow>
              ) : (
                messFavoris?.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/5 cursor-pointer'
                    key={index}
                  >
                    <TableCell className='w-[50%]'>
                      <div className='flex items-center gap-4'>
                        <img
                          className='w-[70px] h-[70px] flex-shrink-0 p-0.5 object-contain rounded-lg border bg-gray-100'
                          src={BaseUrl + species?.produit?.profile}
                          alt={species?.produit?.nom}
                        />
                        <div className='flex flex-col gap-0.5'>
                          <h3 className='text-text-primary truncate-multi1 leading-[1.2] font-semibold text-[1rem]'>
                            {species?.produit?.nom}
                          </h3>
                          <p className='text-gray-400 truncate-multi1 mb-1 text-[.9rem] font-light'>
                            {species?.produit?.description}
                          </p>
                          <StarRating
                            rating={species?.produit?.rating}
                            size={12}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='table-cell'>
                      {species?.produit?.hasVariation === 0
                        ? monaie + species?.produit?.pu
                        : getPrixVariantSock(species?.idProduits)}
                    </TableCell>
                    <TableCell className='table-cell'>
                      {
                        <StatutStockProduit
                          stock={
                            species?.produit?.hasVariation === 0
                              ? species?.produit?.qte
                              : getTotalStock(species?.idProduits)
                          }
                        />
                      }
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end items-center gap-4'>
                        <button className='!text-blue-500 rounded-[6px] flex justify-center items-center p-2.5 !hover:bg-blue-200 !bg-blue-100'>
                          <ShoppingCart01Icon size={16} strokeWidth={2} />
                        </button>
                        <button
                          className='!text-red-600 flex rounded-[6px] justify-center items-center !bg-red-200 p-2.5 !hover:bg-red-200'
                          onClick={() =>
                            handleAddRemoveFavoris(species?.produit)
                          }
                        >
                          {loading && species?.idProduits===selected ? (
                            <Loader2 className='animate-spin h-5 w-5 text-error' />
                          ) : (
                            <FaTrashAlt size={16} strokeWidth={1} />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Annimated>
  )
}

export default Favoris

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import Annimated from '../../../components/Annimated'
import datas from '../../../datas/fournisseur.json'
import { CardFournisseur } from '../'
import { Search01Icon } from 'hugeicons-react'
import SEO from '../../../components/SEO'
import { getAllVendor } from '../../../store/slices/vendeur.slice'
import { getAllCateg } from '../../../store/slices/categories.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hook/use-toast'
import { getAllProduits } from '../../../store/slices/produits.slice'
import LoaderUltra from '../../../components/ui/LoaderUltra'
import SideShop from '../../../components/SideShop'

function Fournisseurs () {
  const { t } = useTranslation()
  const bread = [
    { label: t('accueille'), path: '/' },
    { label: ' Liste des fournisseurs', path: '/a/fournisseurs' }
  ]
  const [isLoading, setIsLoading] = useState(true)
  const [loadTime, setLoadTime] = useState(0)
  const { categories } = useSelector(state => state.categorie)
  const { produits } = useSelector(state => state.produit)
  const { vendeurs } = useSelector(state => state.vendeur)
  const { users } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now()
      try {
        await Promise.all([
          dispatch(getAllCateg()).unwrap(),
          dispatch(getAllProduits()).unwrap(),
          dispatch(getAllVendor()).unwrap()
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
  }, [dispatch, toast])


  const countProduct=(y)=>{
    const result=produits?.filter((x)=>x?.idVendeur===y)
    return result?.length
  }

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />
  }

  return (
    <Annimated>
      <SEO
        title={'Fournisseur'}
        description={'permet au fournisseur de gererr les plateformes'}
        url={'https://cc-ca.ca/fournisseurs'}
        image={'/fournisseur.jpg'}
      />
      <div className='px-[5%] py-[.85rem] border-b bg-gray-50'>
        <Breadcrumb data={bread} />
      </div>
      <div className='px-[5%] gap-5 py-12 md:py-12 flex'>
        <div className='w-[23%]'>
          <SideShop />
        </div>
        <div className=' w-[77%] flex flex-col gap-6'>
          <div className='flex border rounded-[7px] items-center gap-3'>
            <label htmlFor='search' className='py-2.5'>
              <Search01Icon
                size={18}
                strokeWidth={3}
                aria-label='name'
                className='flex-shrink-0 text-gray-600 flex justify-center items-center'
              />
            </label>
            {/* <input id="search" name="search" className='w-full outline-0 text-[.9rem] py-2.5 rounded-[7px]' type='text' placeholder='Enter text'/> */}
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
            {vendeurs?.map((item, ind) => (
              <CardFournisseur key={ind} item={item} total={countProduct(item?.id)} />
            ))}
          </div>
        </div>
      </div>
    </Annimated>
  )
}

export default Fournisseurs

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import { useParams } from 'react-router-dom'
import datas from '../../../datas/fournisseur.json'
import currentProducts from '../../../datas/produits.json'
import BannerFournisseur from '../../../components/Banner/BannerFournisseur'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs'
import SideShop from '../../../components/SideShop'
import PrivacyPolicy from '../../../components/PrivacyPolicy'
import AproposFournisseur from '../../../components/AproposFournisseur'
import ReviewFournisseur from '../../../components/ReviewFournisseur'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select'
import { FilterIcon } from 'hugeicons-react'
import { CardProduit } from '../../../components/card/CardProduit'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hook/use-toast'
import { getAllProduits } from '../../../store/slices/produits.slice'
import LoaderUltra from '../../../components/ui/LoaderUltra'
import { getAllVendor } from '../../../store/slices/vendeur.slice'
import Slugify from '../../../utils/Slugify'
import { useAuth } from '../../../context/authContext'

function DetailFournisseur () {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('produits')
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
    const [loadTime, setLoadTime] = useState(0)
    const dispatch = useDispatch()
    //   const { userConnected } = useAuth()
    const { toast } = useToast()
    const { produits } = useSelector(state => state.produit)
    const { vendeurs } = useSelector(state => state.vendeur)

    useEffect(() => {
      const fetchData = async () => {
        const start = performance.now()
        try {
          await Promise.all([
              dispatch(getAllProduits()).unwrap(),
              dispatch(getAllVendor()).unwrap(),
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

  const {userConnected}=useAuth()
  const fournisseur = vendeurs?.find(x => Slugify(x?.shopname) === id)
  const mesProduits=produits?.filter((x)=>x?.idVendeur===fournisseur?.id)

  const bread = [
    { label: t('accueille'), path: '/a' },
    { label: 'Fournisseurs', path: '/fournisseurs' },
    { label: fournisseur?.shopname, path: '/fournisseurs/produits/' + fournisseur?.shopname }
  ]

  if (isLoading) {
        return <LoaderUltra loading={isLoading} duration={loadTime} />
      }

  return (
    <div className='flex flex-col gap-6'>
      <div className='px-[5%] py-[.85rem] border-b bg-gray-100'>
        <Breadcrumb data={bread} />
      </div>
      <div className={`px-[${paddingH}]`}>
        <BannerFournisseur datas={fournisseur} email={userConnected?.email} />
        <div className={`flex gap-6 pt-4 pb-8 md:pt-5`}>
          <div className='w-[22%] border border-black/30 px-7 rounded-[7px] sticky top-[15px] h-[650px]'>
            <SideShop />
          </div>
          <div className='w-[78%] flex overflow-hidden flex-col gap-8'>
            <Tabs
              defaultValue={activeTab}
              className='w-full'
              onValueChange={setActiveTab}
            >
              <TabsList className='grid grid-cols-4 bg-gray-100 border w-full mb-6'>
                <TabsTrigger value='produits'>Produits</TabsTrigger>
                <TabsTrigger value='about'>À propos</TabsTrigger>
                <TabsTrigger value='police'>
                  Police de Confidentialité
                </TabsTrigger>
                <TabsTrigger value='review'>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value='produits' className='space-y-5'>
                <div className='flex items-center justify-between'>
                  <input
                    className='border rounded-[5px] outline-0 text-[.9rem] w-[50%] px-3 py-2.5'
                    type='text'
                    placeholder='Recherche produits du fournisseur'
                  />
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center w-[70%] gap-1.5'>
                      <FilterIcon />
                      <Select
                      // onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Filtré par :' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='le plus populaire'>
                            le plus populaire
                          </SelectItem>
                          <SelectItem value='le plus ancien'>
                            le plus ancien
                          </SelectItem>
                          <SelectItem value='le prix : plus pétit'>
                            le prix : plus pétit
                          </SelectItem>
                          <SelectItem value='le prix : plus grand'>
                            le prix : plus grand
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='w-[30%]'>
                      <Select
                      // onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Afficher' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Show 15'>15</SelectItem>
                          <SelectItem value='Show 25'>25</SelectItem>
                          <SelectItem value='Show 35'>35</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
                  {mesProduits?.map((x, index) => (
                    <CardProduit key={index} x={x} />
                  ))}
                </div>
                {/* <Pagination
                  currentPage={currentPage}
                  totalItems={data?.lenght}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                /> */}
              </TabsContent>

              <TabsContent value='about' className='space-y-4'>
                <AproposFournisseur />
              </TabsContent>

              <TabsContent value='police' className='space-y-4'>
                <PrivacyPolicy />
              </TabsContent>

              <TabsContent value='review' className='space-y-4'>
                <ReviewFournisseur fournisseur={fournisseur} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailFournisseur

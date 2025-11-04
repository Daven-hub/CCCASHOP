import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/Table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../components/ui/Dropdown-menu'
import {
  FaChevronDown,
  FaEdit,
  FaFilePdf,
  FaPlus,
  FaTrash
} from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { PackageIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { FiEye, FiPackage } from 'react-icons/fi'
import CreateProduct from '../../components/Admin/Dahboard/Product/CreateProctuctForm'
import ModaleDelete from '../../components/Admin/Dahboard/ModalDelete'
import { ClientStats } from './Clients'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCateg } from '../../store/slices/categories.slice'
import { getAllSubCateg } from '../../store/slices/sousCategorie.slice'
import LoaderUltra from '../../components/ui/LoaderUltra'
import { getAllAttrs } from '../../store/slices/attribute.slice.js'
import { getAllAttrValues } from '../../store/slices/attributeValue.slice'
import { useToast } from '../../hook/use-toast'
import { createProduitSimple, createProduitVariant, getAllProduits } from '../../store/slices/produits.slice.js'
import { useAuth } from '../../context/authContext.js'
import { BaseUrl } from '../../config.js'
import { getAllProduitVariants } from '../../store/slices/produitVariant.slice.js'
import StarRating from '../../components/ui/StarRating.js'

function Product () {
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(0)
  const [formData, setFormData] = useState({})
  const [selectedItemName, setSelectedItemName] = useState('')
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { subcategories } = useSelector(state => state.souscategorie)
  const { attributeValues } = useSelector(state => state.attributeValue)
  const { attributes } = useSelector(state => state.attribute)
  const { categories } = useSelector(state => state.categorie)
  const { produits } = useSelector(state => state.produit)
  const { produitVariants } = useSelector(state => state.produitVariant)
  const {userConnected}=useAuth()

  const handleDelete = productName => {
    setSelectedItemName(productName)
    setOpenDelete(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      const start = performance.now()
      try {
        await Promise.all([
          dispatch(getAllCateg()).unwrap(),
          dispatch(getAllSubCateg()).unwrap(),
          dispatch(getAllAttrs()).unwrap(),
          dispatch(getAllAttrValues()).unwrap(),
          dispatch(getAllProduits()).unwrap(),
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

  const onSubmit = async () => {
    setLoading(true)
    const datas=formData
    const datamodel = new FormData()
    datamodel.append('idVendeur',userConnected?.id);
    datamodel.append('role',userConnected?.role);
    for (const key in datas) {
      if (key === 'profile') {
        if (datas.profile && datas.profile.length > 0) {
          datamodel.append('profile', datas?.profile?.[0])
        }
      }else if(key==='variations'){
        datamodel.append("variations", JSON.stringify(datas.variations));
      } else if (datas[key] !== undefined && datas[key] !== null) {
        datamodel.append(key, datas[key])
      }
    }
    try {
      if(datas?.hasVariation){
        await dispatch(createProduitVariant(datamodel)).unwrap()
      }else{
        await dispatch(createProduitSimple(datamodel)).unwrap()
      }
    
      toast({
        title: 'Enregistrement reussie'
      })
      // reset()
    } catch (error) {
      toast({
        title: 'Enregistrement échouée',
        description: error?.toString(),
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const moiVendeur=produits?.filter((x)=>x?.idVendeur===userConnected?.id)
   const TotalActif=produits?.filter((x)=>x?.idVendeur===userConnected?.id && x.status===1).length
    const TotalNonActif=produits?.filter((x)=>x?.idVendeur===userConnected?.id && x.status===0).length
  const total= moiVendeur?.length

    const data = [
    {
      title: 'Tous les produits',
      nbre: total,
      previousNbre: 10,
      icon: PackageIcon,
      color: 'bg-blue-600'
    },
    {
      title: 'Produits actifs',
      nbre: TotalActif,
      previousNbre: 18,
      icon: CheckCircleIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Produits désactivés',
      nbre: TotalNonActif,
      previousNbre: 11,
      icon: XCircleIcon,
      color: 'bg-red-500'
    }
  ]

   const getTotalVariantSock=(id)=>{
    const totalPrix = produitVariants?.filter((x)=>x.idProduit===id).reduce((sum, item) => sum + item.qte, 0);
    return totalPrix
  }
   const getPrixVariantSock=(id)=>{
    const variants = produitVariants?.filter((x)=>x.idProduit===id).map((y)=> y?.pu);
    const min= Math.min(...variants)
    const max= Math.max(...variants)
    let result='$'+min;
    if(min!==max){
      result +=' - $'+max
    }
    return result
  }

   const getCategorieName=(id)=>{
    const result = categories?.find((x)=>x.idcategorie===id);
    return result?.nom
  }
   const getSubcategName=(id)=>{
    const result = subcategories?.find((x)=>x.idsubcateg===id);
    return result?.nom
   }

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'>
          <FiPackage /> Produits{' '}
        </h1>
        <div className='flex gap-42 items-center'>
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary'>
            <FaFilePdf /> Télécharger en pdf
          </button>
          <button
            onClick={() => setOpenCreate(true)}
            className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'
          >
            <FaPlus stroke={0.5} /> Nouveau produit
          </button>
        </div>
      </div>
      <ClientStats data={data} />
      <div className='bg-white flex flex-col gap-6 border rounded-[6px] p-7'>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>
            Liste des produits
          </h1>
          <div className='flex w-[50%] items-center gap-3'>
            <input
              className='border-2 text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]'
              type='text'
              placeholder='Recherchez ...'
            />
          </div>
        </div>
        <div className='rounded-[7px] overflow-hidden bg-white'>
          <Table>
            <TableHeader className='bg-gray-300'>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Sous-catégorie</TableHead>
                <TableHead>Qte</TableHead>
                <TableHead>Pu</TableHead>
                <TableHead>Variant?</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className='text-right'>actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moiVendeur.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className='text-center py-8'>
                    Pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                moiVendeur?.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/5 capitalize cursor-pointer'
                    key={index}
                  >
                    <TableCell className='font-medium'>{index+1}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3.5'>
                        <img
                          className='w-12 h-12 object-contain rounded-[6px]'
                          src={BaseUrl+''+species?.profile}
                          alt={species?.idproduits}
                        />
                        <div className='flex flex-col'>
                          <h2 className='text-[.92rem]'>{species?.nom}</h2>
                          <StarRating rating={0} size='16px'/>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {getCategorieName(species?.idCategorie)}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {getSubcategName(species?.idsubcateg)}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {species?.hasVariation===0?species?.qte:getTotalVariantSock(species?.idproduits)}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {species?.hasVariation===0?'$ '+species?.pu:getPrixVariantSock(species?.idproduits)}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {species?.hasVariation===0?'Non':'Oui'}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {parseInt(species?.status)===1?
                      <div className='badge flex px-2.5 uppercase items-center justify-center rounded-[50px] text-[.6rem] font-extrabold bg-green-100 text-green-700'>
                        Oui
                      </div>:
                      <div className='badge flex px-2.5 uppercase items-center justify-center rounded-[50px] text-[.6rem] font-extrabold bg-red-100 text-red-700'>
                        Non
                      </div>}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='capitalize'
                            size='icon'
                          >
                            <FaChevronDown className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>action</DropdownMenuLabel>
                          <DropdownMenuSeparator className='bg-black/10' />
                          <DropdownMenuItem>
                            <FiEye className='mr-2 h-4 w-4' />
                            Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-blue-500">
                            <FaEdit className='mr-2 h-4 w-4' />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-500'
                            // onClick={() => handleDelete(species.id)}
                            onClick={() => handleDelete(species?.nom)}
                          >
                            <FaTrash className='mr-2 h-4 w-4' />
                            delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className='bg-black/10' />
                          <DropdownMenuItem className={`${species?.status===0?'text-green-500':'text-red-500'}`}>
                            {species?.status===0?'Visible':'Invisible'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <CreateProduct
        open={openCreate}
        setOpen={setOpenCreate}
        subcategories={subcategories}
        categories={categories}
        attributeValues={attributeValues}
        attributes={attributes}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSave={onSubmit}
      />
      <ModaleDelete
        open={openDelete}
        setOpen={setOpenDelete}
        itemName={selectedItemName}
      />
    </div>
  )
}

export default Product

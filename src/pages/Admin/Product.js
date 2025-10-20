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
import { FiPackage } from 'react-icons/fi'
import produits from '../../datas/produits.json'
import CreateProduct from '../../components/Admin/Dahboard/Product/CreateProctuctForm'
import ModaleDelete from '../../components/Admin/Dahboard/ModalDelete'
import { ClientStats } from './Clients'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCateg } from '../../store/slices/categories.slice'
import { getAllSubCateg } from '../../store/slices/sousCategorie.slice'
import LoaderUltra from '../../components/ui/LoaderUltra'
import { getAllAttrs } from '../../store/slices/attribute.slice.js'
import { getAllAttrValues } from '../../store/slices/attributeValue.slice'

function Product () {
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(0)
  const [selectedItemName, setSelectedItemName] = useState('')
  const dispatch= useDispatch()
  const { subcategories } = useSelector(state => state.souscategorie)
  const { attributeValues } = useSelector(state => state.attributeValue)
  const { attributes } = useSelector(state => state.attribute)
    const { categories } = useSelector(state => state.categorie)

  const handleDelete = productName => {
    setSelectedItemName(productName)
    setOpenDelete(true)
  }

  const data = [
    {
      title: 'Tous les produits',
      nbre: 10,
      previousNbre: 10,
      icon: PackageIcon,
      color: 'bg-blue-600'
    },
    {
      title: 'Produits actifs',
      nbre: 0,
      previousNbre: 18,
      icon: CheckCircleIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Produits désactivés',
      nbre: 15,
      previousNbre: 11,
      icon: XCircleIcon,
      color: 'bg-red-500'
    }
  ]

  useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true)
        const start = performance.now()
        try {
          await Promise.all([
            dispatch(getAllCateg()).unwrap(),
            dispatch(getAllSubCateg()).unwrap(),
            dispatch(getAllAttrs()).unwrap(),
            dispatch(getAllAttrValues()).unwrap()
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
      {/* <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='py-16 bg-white border rounded-[6px] shadow-sm'></div>
        <div className='py-16 bg-white border rounded-[6px] shadow-sm'></div>
        <div className='py-16 bg-white border rounded-[6px] shadow-sm'></div>
      </div> */}
      <ClientStats data={data} />
      <div className='bg-white flex flex-col gap-6 border rounded-[6px] p-7'>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>
            Liste des produits
          </h1>
          <div className='flex w-[50%] items-center gap-3'>
            <input
              className='border text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]'
              type='text'
              placeholder='Recherchez ...'
            />
          </div>
        </div>
        <div className='rounded-[7px] overflow-hidden bg-white'>
          <Table>
            <TableHeader className='bg-gray-200'>
              <TableRow>
                <TableHead>uuid</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className='text-right'>actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-center py-8'>
                    pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                produits.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/10 cursor-pointer'
                    key={index}
                  >
                    <TableCell className='font-medium'>{species?.id}</TableCell>
                    <TableCell>
                      <img
                        className='w-12 h-12 object-contain rounded-[6px]'
                        src={species?.image}
                        alt={species?.id}
                      />
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      {species?.titre}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      Jus de Fruit
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {species?.qte + ' ' + species?.meter}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      3mois
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <div className='badge flex items-center justify-center rounded-[50px] text-[.6rem] font-bold bg-green-100 text-green-900'>
                        Disponible
                      </div>
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
                            <FaEdit className='mr-2 h-4 w-4' />
                            edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-destructive'
                            // onClick={() => handleDelete(species.id)}
                            onClick={() => handleDelete(species?.titre)}
                          >
                            <FaTrash className='mr-2 h-4 w-4' />
                            delete
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

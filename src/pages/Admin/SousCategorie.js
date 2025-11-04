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
import { FiTag } from 'react-icons/fi'
import CreateSousCategorie from '../../components/Admin/Dahboard/SousCategories/CreateSousCategorieForm'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../hook/use-toast'
import { useForm } from 'react-hook-form'
import { getAllCateg } from '../../store/slices/categories.slice'
import LoaderUltra from '../../components/ui/LoaderUltra'
import {
  createSubCateg,
  getAllSubCateg
} from '../../store/slices/sousCategorie.slice'
import { IconRenderer } from '../../lib/IconeRenderer'
import { getAllProduits } from '../../store/slices/produits.slice'

function SousCategorie () {
  const [openCreate, setOpenCreate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(0)
  const { categories } = useSelector(state => state.categorie)
  const { subcategories } = useSelector(state => state.souscategorie)
  const { produits } = useSelector(state => state.produit)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const {
    register: connexion,
    control,
    handleSubmit,
    reset,
    formState: { errors: errorLog }
  } = useForm({
    defaultValues: {
      idCategorie: ''
    }
  })

  const onSubmit = async datas => {
    setLoading(true)
    try {
      await dispatch(createSubCateg(datas)).unwrap()
      toast({
        title: 'Enregistrement reussie'
      })
      reset()
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

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      const start = performance.now()
      try {
        await Promise.all([
          dispatch(getAllCateg()).unwrap(),
          dispatch(getAllSubCateg()).unwrap(),
          dispatch(getAllProduits()).unwrap()
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

  const GetCategorie = ({x}) => {
    const cat = categories?.find(y => y.idcategorie === x)
    return (
      <div className='flex items-center gap-2'>
        <IconRenderer iconName={cat?.icon} size={18} />
        {cat.nom}
      </div>
    )
  }

  const getTotalProductBySousCategorie=(id)=>{
    const total = produits?.filter((x)=>x.idsubcateg===id)?.length
    const nbreFormatted = String(total).padStart(2, "0");
    return nbreFormatted
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'>
          <FiTag /> Sous catégories{' '}
        </h1>
        <div className='flex gap-42 items-center'>
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary'>
            <FaFilePdf /> Télécharger en pdf
          </button>
          <button
            onClick={() => setOpenCreate(true)}
            className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'
          >
            <FaPlus stroke={0.5} /> Nouvelle sous-catégorie
          </button>
        </div>
      </div>

      <div className='bg-white flex flex-col gap-6 border rounded-[6px] p-7'>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>
            Liste des sous catégories
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
                <TableHead>#</TableHead>
                {/* <TableHead>uuid</TableHead> */}
                <TableHead>Noms</TableHead>
                <TableHead>Catégories</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subcategories?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center py-8'>
                    Pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                subcategories?.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/5 cursor-pointer'
                    key={index}
                  >
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      {species?.nom}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <GetCategorie x={species?.idCategorie} />
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      ({getTotalProductBySousCategorie(species?.idsubcateg)}) produits
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
                            <span className='sr-only uppercase'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>action</DropdownMenuLabel>
                          <DropdownMenuSeparator className='bg-black/10' />
                          <DropdownMenuItem className='text-blue-600'>
                            <FaEdit className='mr-2 h-4 w-4' />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600'
                            // onClick={() => handleDelete(species.id)}
                          >
                            <FaTrash className='mr-2 h-4 w-4' />
                            Supprimer
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
      <CreateSousCategorie
        open={openCreate}
        setOpen={setOpenCreate}
        onSubmit={handleSubmit(onSubmit)}
        connexion={connexion}
        control={control}
        errorLog={errorLog}
        loading={loading}
        categories={categories}
      />
    </div>
  )
}

export default SousCategorie

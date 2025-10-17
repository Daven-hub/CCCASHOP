import React, { useState,useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/Dropdown-menu'
import { FaChevronDown, FaCog, FaEdit, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { FiPackage, FiTag } from 'react-icons/fi';
import produits from "../../datas/produits.json"
import { useNavigate } from 'react-router-dom'
import CreateAttribute from '../../components/Admin/Dahboard/Attributes/CreateAttribut'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../hook/use-toast'
import { useForm } from 'react-hook-form'
import { createAttr, getAllAttrs } from '../../store/slices/attribute.slice.js'
import LoaderUltra from '../../components/ui/LoaderUltra.js'
import { getAllSubCateg } from '../../store/slices/sousCategorie.slice'
import { getAllCateg } from '../../store/slices/categories.slice'
import { IconRenderer } from '../../lib/IconeRenderer.js'

function Attribute() {
  const [openCreate, setOpenCreate] = useState(false);

  const navigate = useNavigate()
  const handleNavigateValue = (id) => {
    navigate('/admin/attributs/value/' + id)
  }

  const [loading, setLoading] = useState(false)
    const [loadTime, setLoadTime] = useState(0)
    const { subcategories } = useSelector(state => state.souscategorie)
    const { categories } = useSelector(state => state.categorie)
    const { attributes } = useSelector(state => state.attribute)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const { toast } = useToast()
  
    const {
      register: connexion,
      control,
      handleSubmit,
      watch: watchSave,
      reset,
      setValue,
      formState: { errors: errorLog }
    } = useForm({
      defaultValues: {
        idSubcategorie: '',
        type: ''
      }
    })
  
    const onSubmit = async datas => {
      setLoading(true)
      try {
        await dispatch(createAttr(datas)).unwrap()
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
        setIsLoading(true)
        const start = performance.now()
        try {
          await Promise.all([
            dispatch(getAllAttrs()).unwrap(),
            dispatch(getAllSubCateg()).unwrap(),
            dispatch(getAllCateg()).unwrap()
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
  
    const GetSubCategorieName = (x) => {
      const cat = subcategories?.find(y => y?.idsubcateg === x)
      return cat?.nom
    }

    const GetCategorie = ({x}) => {
       const subcat = subcategories?.find(y => y?.idsubcateg === x)
        const cat = categories?.find(y => y.idcategorie === subcat?.idCategorie)
        return (
          <div className='flex items-center gap-2'>
            <IconRenderer iconName={cat?.icon} size={18} />
            {cat.nom}
          </div>
        )
      }
  

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'><FiTag /> Attributs </h1>
        <div className="flex gap-42 items-center">
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary'><FaFilePdf /> Télécharger en pdf</button>
          <button onClick={() => setOpenCreate(true)} className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'><FaPlus stroke={.5} /> Nouvel Attribut</button>
        </div>
      </div>

      <div className="bg-white flex flex-col gap-6 border rounded-[6px] p-7">
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>Liste des Attributs</h1>
          <div className='flex w-[50%] items-center gap-3'>
            <input className='border text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]' type='text' placeholder='Recherchez ...' />
          </div>
        </div>
        <div className="rounded-[7px] overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>#No</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Type de valeur</TableHead>
                <TableHead>Sous catégorie</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                attributes?.map((species, index) => (
                  <TableRow onClick={() => handleNavigateValue(species?.idAttribute)} className="hover:bg-primary/10 cursor-pointer" key={index}>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell className="hidden sm:table-cell">{species?.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <input type={species?.type} placeholder='ex: 4XL' className='border text-[0.6rem] py-1 px-2 bg-gray-100 w-[60%] h-[30px] rounded-[6px]' disabled/></TableCell>
                    <TableCell className="hidden sm:table-cell">{GetSubCategorieName(species?.idSubcategorie)}</TableCell>
                    <TableCell className="hidden sm:table-cell"><GetCategorie x={species?.idSubcategorie} /></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className='capitalize' size="icon">
                            <FaChevronDown className="h-4 w-4" />
                            <span className="sr-only uppercase">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>action</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-black/10" />
                          <DropdownMenuItem
                            onClick={() => handleNavigateValue(species?.idAttribute)}
                          >
                            <FaCog className="mr-2 h-4 w-4" />
                            Value
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-blue-600"
                          >
                            <FaEdit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                          // onClick={() => handleDelete(species.id)}
                          >
                            <FaTrash className="mr-2 h-4 w-4" />
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
      <CreateAttribute
        open={openCreate}
        setOpen={setOpenCreate}
        onSubmit={handleSubmit(onSubmit)}
        connexion={connexion}
        control={control}
        errorLog={errorLog}
        loading={loading}
        subcategories={subcategories}
      />
    </div>
  )
}

export default Attribute

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/Table'
import { FaEdit, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { FiPackage, FiTag } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
// import CreateValeur from '../../components/Admin/Dahboard/Valeurs/CreateValeur'
import ModalDelete from '../../components/Admin/Dahboard/ModalDelete'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../hook/use-toast'
import { useForm } from 'react-hook-form'
import {
  createAttrValue,
  getAllAttrValues
} from '../../store/slices/attributeValue.slice'
import { getAllSubCateg } from '../../store/slices/sousCategorie.slice'
import { getAllCateg } from '../../store/slices/categories.slice'
import { getAttrById } from '../../store/slices/attribute.slice.js'
import { IconRenderer } from '../../lib/IconeRenderer'
import LoaderUltra from '../../components/ui/LoaderUltra.js'
import CreateValeur from '../../components/Admin/Dahboard/Valeurs/CreateValeurForm.js'

function AttributeValue () {
  const { id } = useParams()
  const [openCreate, setOpenCreate] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(0)
  const { subcategories } = useSelector(state => state.souscategorie)
  const { categories } = useSelector(state => state.categorie)
  const { attributeId } = useSelector(state => state.attribute)
  const { attributeValues } = useSelector(state => state.attributeValue)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [openCreat, setOpenCreat] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState('')
  const handleDelete = productName => {
    setSelectedItemName(productName)
    setOpenCreat(true)
  }

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
      idAttribute: id,
      value: ''
    }
  })

  const onSubmit = async datas => {
    setLoading(true)
    try {
      await dispatch(createAttrValue(datas)).unwrap()
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
          dispatch(getAttrById(id)).unwrap(),
          dispatch(getAllAttrValues()).unwrap(),
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
  }, [dispatch,id])

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />
  }


  const valuesAttribute = attributeValues?.filter(
    y => y.idAttribute === attributeId?.idAttribute
  )
  const valuesSubCategorie = subcategories?.find(
    y => y.idsubcateg === attributeId?.idSubcategorie
  )
  const valuesCategorie = categories?.find(
    y => y.idcategorie === valuesSubCategorie?.idCategorie
  )

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'>
          <FiTag /> Valeurs de l'attribut : {attributeId?.name}
        </h1>
        <div className='flex gap-42 items-center'>
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary'>
            <FaFilePdf /> Télécharger en pdf
          </button>
          <button
            onClick={() => setOpenCreate(true)}
            className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'
          >
            <FaPlus stroke={0.5} /> Nouvelle valeur
          </button>
        </div>
      </div>
      <div className='gap-2 flex flex-col'>
        <button
          className='w-fit bg-primary/70 text-white flex items-center gap-1.5 border rounded-[6px] px-7 py-1.5'
          onClick={() => {
            window.history.scrollRestoration = 'auto'
            window.history.back()
          }}
        >
          <MoveLeft /> Retour
        </button>
        <div className='flex gap-8'>
          <div className='w-[30%] flex flex-col h-fit gap-3 bg-white overflow-hidden border rounded-[6px]'>
            <div className='bg-primary/70 h-[110px] relative w-full'>
              <div className='absolute w-[90px] h-[90px] rounded-full -bottom-[40%] bg-white left-[37%] flex items-center justify-center'>
                <IconRenderer iconName={valuesCategorie?.icon} size={45} />
              </div>
            </div>
            <div className='px-7 flex flex-col pt-6 gap-2.5 pb-7'>
              <h2 className='text-2xl text-center border-b-2 font-semibold py-2.5'>
                {attributeId?.name}
              </h2>
              <div className='flex flex-col gap-2 font-medium pt-2'>
                <div className='flex items-center justify-between'>
                  <span>Sous Catégorie :</span>{' '}
                  <span>{valuesSubCategorie?.nom}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Catégorie :</span> <span>{valuesCategorie?.nom}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white w-[70%] flex flex-col gap-6 border rounded-[6px] p-7'>
            <div className='flex justify-between items-center gap-4'>
              <h1 className='text-[1.6rem] font-bold text-primary'>
                Liste des valeurs
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
                <TableHeader className='bg-gray-100'>
                  <TableRow>
                    <TableHead>#No</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {valuesAttribute?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className='text-center py-8'>
                        Pas de resultat
                      </TableCell>
                    </TableRow>
                  ) : (
                    valuesAttribute?.slice(0, 5)?.map((species, index) => (
                      <TableRow
                        className='hover:bg-primary/10 cursor-pointer'
                        key={index}
                      >
                        <TableCell className=''>{index + 1}</TableCell>
                        <TableCell className='table-cell'>
                          {attributeId?.type === 'color' ? (
                            <div className='flex items-center gap-3'>
                              <div
                                className={`w-[35px] h-[35px] rounded-full`}
                                style={{
                                  background: species?.value.toString()
                                }}
                              />
                              {species?.value}
                            </div>
                          ) : (
                            species?.value
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end items-center gap-4'>
                            <Button className='text-blue-500 p.1.5 hover:bg-blue-200 !bg-blue-100'>
                              <FaEdit className='h-4 w-4' />
                              {/* Modifier */}
                            </Button>
                            <Button
                              className='text-red-600 bg-red-100 p-1.5 hover:bg-red-200'
                              // onClick={() => handleDelete(species.id)}
                            >
                              <FaTrash className='h-4 w-4' />
                              {/* Supprimer */}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <CreateValeur
        open={openCreate}
        setOpen={setOpenCreate}
        onSubmit={handleSubmit(onSubmit)}
        connexion={connexion}
        control={control}
        errorLog={errorLog}
        loading={loading}
        type={attributeId?.type}
      />
      <ModalDelete
        open={openCreat}
        setOpen={setOpenCreat}
        itemName={selectedItemName}
      />
    </div>
  )
}

export default AttributeValue

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
  FaTrash,
  FaUserClock
} from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { FiPackage } from 'react-icons/fi'
import produits from '../../datas/produits.json'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVendor, updateVendor } from '../../store/slices/vendeur.slice'
import { BaseUrl } from '../../config'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { getAllUsers } from '../../store/slices/user.slice'
import moment from 'moment/moment'
import StarRating from '../../components/ui/StarRating'
import { useToast } from '../../hook/use-toast'
import {
  UsersIcon,
  UserCheckIcon,
  UserXIcon,
  UserClock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function FournisseurStats({data}) {
  const formatted = data.map((item) => {
  const diff = item.nbre - item.previousNbre;
  const percent = ((diff / item.previousNbre) * 100).toFixed(1);

  const nbreFormatted = String(item.nbre).padStart(2, "0");
  const previousFormatted = String(item.previousNbre).padStart(2, "0");

  return {
    ...item,
    nbre: nbreFormatted,
    previousNbre: previousFormatted,
    evolution: `${percent > 0 ? "+" : ""}${percent}%`,
    isUp: percent >= 0,
  };
});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {formatted.map((item, index) => (
        <div
          key={index}
          className={`${item.color} text-white rounded-[6px] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <item.icon size={40} />
            </div>
            <div
              animate={{ y: item.isUp ? [0, -4, 0] : [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className={`flex items-center gap-1 text-sm font-semibold ${
                item.isUp ? "text-green-100" : "text-red-100"
              }`}
            >
              {item.isUp ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              <span>{item.evolution}</span>
            </div>
          </div>

          <div>
            <p className="text-4xl font-bold">{item.nbre}</p>
            <p className="text-sm opacity-90">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


function FournisseurAdmin () {
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(false)
  const { vendeurs } = useSelector(state => state.vendeur)
  const { users } = useSelector((state) => state.users);
  const {toast}= useToast()

  useEffect(() => {
    dispatch(getAllVendor())
    dispatch(getAllUsers());
  }, [dispatch])

  const getVariable=(x,id)=>{
    let result;
      if(x==='profile'){
       result= users?.find((x)=>x?.idUsershop===id)?.profile
      }else if(x==='email'){
        result= users?.find((x)=>x?.idUsershop===id)?.email
      }
      // console.log(result)
      return result
  }

  const handleUpdateStatus=async(id,x)=>{
    try {
      const datas={status:x}
          await dispatch(updateVendor({id,datas})).unwrap();
          toast({
            title: "Modification",
            description:`status ${x===1?'activé':'désactivé'} avec succes`
          });
        } catch (error) {
          toast({
            title: error?.toString(),
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
  }

  const vendeurActif= vendeurs?.filter((x)=>parseInt(x?.status)===1)?.length
  const vendeurOff= vendeurs?.filter((x)=>parseInt(x?.status)===0)?.length
  const vendeurWarning= vendeurs?.filter((x)=>parseInt(x?.status)===-1)?.length

  const data = [
  {
    title: "Tous les fournisseurs",
    nbre: vendeurs?.length,
    previousNbre: 10,
    icon: UsersIcon,
    color: "bg-blue-600",
  },
  {
    title: "Fournisseurs actifs",
    nbre: vendeurActif,
    previousNbre: 18,
    icon: UserCheckIcon,
    color: "bg-green-500",
  },
  {
    title: "Fournisseurs désactivés",
    nbre: vendeurOff,
    previousNbre: 11,
    icon: UserXIcon,
    color: "bg-red-500",
  },
  {
    title: "Fournisseurs en attente",
    nbre: vendeurWarning,
    previousNbre: 30,
    icon: FaUserClock,
    color: "bg-amber-500",
  },
];

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'>
          <FiPackage /> Fournisseurs{' '}
        </h1>
        <div className='flex gap-42 items-center'>
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white/90 font-semibold text-primary'>
            <FaFilePdf /> Télécharger en pdf
          </button>
          {/* <button className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'>
            <FaPlus stroke={0.5} /> Nouveau Fournisseur
          </button> */}
        </div>
      </div>
      <FournisseurStats data={data} ></FournisseurStats>
      <div className='bg-white flex flex-col gap-6 border rounded-[6px] p-7'>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>
            Liste des Fournisseurs
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
                <TableHead>UUID</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>forme juridique</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créer le</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
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
                vendeurs?.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/5 cursor-pointer'
                    key={index}
                  >
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell className='flex items-center space-x-3'>
                       <Avatar>
                          {getVariable("profile",species?.userId) && <AvatarImage className='object-cover' src={BaseUrl+''+getVariable("profile",species?.userId)} />}
                          <AvatarFallback>
                            {species?.shopname?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{species?.shopname}</p>
                          <p className='text-xs text-gray-500'>{getVariable("email",species?.userId)}</p>
                        </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      {species?.shopname}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      N/A
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      N/A
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <StarRating rating={0} />
                    </TableCell>
                  
                    <TableCell className='hidden capitalize md:table-cell'>
                      {parseInt(species?.status)===1?
                      <div className='badge flex px-2.5 uppercase items-center justify-center rounded-[50px] text-[.6rem] font-extrabold bg-green-100 text-green-700'>
                        Activer
                      </div>:
                      <div className='badge flex px-2.5 uppercase items-center justify-center rounded-[50px] text-[.6rem] font-extrabold bg-red-100 text-red-700'>
                        Desactiver
                      </div>}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                     {moment(species?.created_at).format('DD/MM/YYYY')}
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
                          <DropdownMenuLabel className='text-gray-700 font-semibold'>
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className='bg-black/10' />
                          <DropdownMenuItem className={`${parseInt(species?.status)===1?'text-red-600':'text-green-600'}`}
                            onClick={()=>handleUpdateStatus(species?.id,parseInt(species?.status)===0?1:0)}
                          >
                            {/* <FaEdit className='mr-2 h-4 w-4' /> */}
                            {parseInt(species?.status)===0?'Activer':'Desactiver'}
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                            <FaEdit className='mr-2 h-4 w-4' />
                            edit
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            className='text-destructive'
                            // onClick={() => handleDelete(species.id)}
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
    </div>
  )
}

export default FournisseurAdmin

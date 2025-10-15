import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/Dropdown-menu'
import { FaChevronDown, FaCog, FaEdit, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { FiPackage, FiTag } from 'react-icons/fi';
import produits from "../../datas/produits.json"
import { useNavigate } from 'react-router-dom'
import CreateAttribute from '../../components/Admin/Dahboard/Attributes/CreateAttributForm'
import ModalDelete from '../../components/Admin/Dahboard/ModalDelete'

function Attribute() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCreat, setOpenCreat] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const handleDelete = (productName) => {
    setSelectedItemName(productName);
    setOpenCreat(true);
  };
  const handleCreateAttribute = (data) => {
    //
  };

  const navigate = useNavigate()

  const handleNavigateValue = (id) => {
    navigate('/admin/attributs/value/' + id)
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
                <TableHead>Sous catégorie</TableHead>
                <TableHead className="text-right">actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                produits.map((species, index) => (
                  <TableRow onClick={() => handleNavigateValue(species.id)} className="hover:bg-primary/10 cursor-pointer" key={index}>
                    <TableCell className="font-medium">{species?.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">{species?.titre}</TableCell>
                    <TableCell className="hidden sm:table-cell">{species?.titre}</TableCell>
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
                            onClick={() => handleNavigateValue(species.id)}
                          >
                            <FaCog className="mr-2 h-4 w-4" />
                            Value
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-blue-500"
                          >
                            <FaEdit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            // onClick={() => handleDelete(species.id)}
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleDelete(species?.titre);
                            }}
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
        onCreate={handleCreateAttribute}
      />

      <ModalDelete open={openCreat}
        setOpen={setOpenCreat}
        itemName={selectedItemName}
      />
    </div>
  )
}

export default Attribute

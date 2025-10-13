import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/Dropdown-menu'
import { FaChevronDown, FaEdit, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '../../components/ui/Button'
import { FiPackage, FiTag } from 'react-icons/fi';
import produits from "../../datas/produits.json"
import CreateCategorie from '../../components/Admin/Dahboard/Categories/CreateCategorieForm'

function Categorie() {

  const [openCreate, setOpenCreate] = useState(false);
  const handleCreateCategorie = (data) => {
    //
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'><FiTag /> Catégories </h1>
        <div className="flex gap-42 items-center">
          <button className='py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary'><FaFilePdf /> Télécharger en pdf</button>
          <button onClick={() => setOpenCreate(true)} className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'><FaPlus stroke={.5} /> Nouvelle catégorie</button>
        </div>
      </div>

      <div className="bg-white flex flex-col gap-6 border rounded-[6px] p-7">
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>Liste des catégories</h1>
          <div className='flex w-[50%] items-center gap-3'>
            <input className='border text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]' type='text' placeholder='Recherchez ...' />
          </div>
        </div>
        <div className="rounded-[7px] overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>#No</TableHead>
                <TableHead>uuid</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>Quantité</TableHead>
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
                  <TableRow className="hover:bg-primary/10 cursor-pointer" key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="hidden sm:table-cell">{species?.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">{species?.titre}</TableCell>
                    <TableCell className="hidden md:table-cell">{species?.qte + " " + species?.meter}</TableCell>
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
                          >
                            <FaEdit className="mr-2 h-4 w-4" />
                            edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                          // onClick={() => handleDelete(species.id)}
                          >
                            <FaTrash className="mr-2 h-4 w-4" />
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
      <CreateCategorie
        open={openCreate}
        setOpen={setOpenCreate}
        onCreate={handleCreateCategorie}
      />
    </div>
  )
}

export default Categorie

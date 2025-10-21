import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/Dropdown-menu";
import {
  FaChevronDown,
  FaEdit,
  FaFilePdf,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { FiPackage, FiTag } from "react-icons/fi";
// import CreateCategorie from "../../components/Admin/Dahboard/Categories/CreateCategorie";
import { useForm } from "react-hook-form";
import { createCateg, getAllCateg } from "../../store/slices/categories.slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hook/use-toast";
import LoaderUltra from "../../components/ui/LoaderUltra";
import { BaseUrl } from "../../config";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { IconRenderer } from "../../lib/IconeRenderer";
import CreateCategorie from "../../components/Admin/Dahboard/Categories/CreateCategorieForm";

function Categorie() {
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector(state => state.categorie)
   const [isLoading, setIsLoading] = useState(true);
   const [loadTime, setLoadTime] = useState(0)
  const dispatch = useDispatch()
  const {toast}= useToast()

  const {
    register: connexion,
    control,
    handleSubmit,
    watch: watchSave,
    reset,
    setValue,
    formState: { errors: errorLog },
  } = useForm({
    defaultValues: {
      icon: null,
    },
  });

  const onSubmit = async (datas) => {
    setLoading(true);
    const datamodel = new FormData();
    for (const key in datas) {
      if (key === "profile") {
        if (datas.profile && datas.profile.length > 0) {
          datamodel.append("profile", datas?.profile?.[0]);
        }
      } else if (datas[key] !== undefined && datas[key] !== null) {
        datamodel.append(key, datas[key]);
      }
    }
    try {
      await dispatch(createCateg(datamodel)).unwrap();
      toast({
        title: "Enregistrement reussie",
      });
      reset();
    } catch (error) {
      toast({
        title: "Enregistrement échouée",
        description: error?.toString(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const start = performance.now()
    new Promise((resolve, reject) => {
      dispatch(getAllCateg())
        .unwrap()
        .then((res) => {
          const end = performance.now()
          const duration = end - start
          setLoadTime(duration.toFixed(0))
        })
        .catch((err) => {
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [dispatch])


  if(isLoading){
    return <LoaderUltra loading={isLoading} duration={loadTime}/>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5">
          <FiTag /> Catégories{" "}
        </h1>
        <div className="flex gap-42 items-center">
          <button className="py-2.5 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border border-primary bg-white font-semibold text-primary">
            <FaFilePdf /> Télécharger en pdf
          </button>
          <button
            onClick={() => setOpenCreate(true)}
            className="py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white"
          >
            <FaPlus stroke={0.5} /> Nouvelle catégorie
          </button>
        </div>
      </div>

      <div className="bg-white flex flex-col gap-6 border rounded-[6px] p-7">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-[1.6rem] font-bold text-primary">
            Liste des catégories
          </h1>
          <div className="flex w-[50%] items-center gap-3">
            <input
              className="border text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]"
              type="text"
              placeholder="Recherchez ..."
            />
          </div>
        </div>
        <div className="rounded-[7px] overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead>#No</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Icone</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((species, index) => (
                  <TableRow
                    className="hover:bg-primary/10 cursor-pointer"
                    key={index}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Avatar>
                                              {species?.thumbnail && (
                                                <AvatarImage
                                                  className="object-contain border w-[150px] overflow-hidden"
                                                  src={BaseUrl + "" + species?.thumbnail}
                                                />
                                              )}
                                              <AvatarFallback>
                                                {species?.nom?.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <IconRenderer iconName={species?.icon} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {species?.nom}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {species?.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      (00) produits
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="capitalize"
                            size="icon"
                          >
                            <FaChevronDown className="h-4 w-4" />
                            <span className="sr-only uppercase">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>action</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-black/10" />
                          <DropdownMenuItem>
                            <FaEdit className="mr-2 h-4 w-4" />
                            edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
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
        onSubmit={handleSubmit(onSubmit)}
        connexion={connexion}
        control={control}
        errorLog={errorLog}
        loading={loading}
      />
    </div>
  );
}

export default Categorie;

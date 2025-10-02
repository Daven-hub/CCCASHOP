import  { useEffect } from "react";
import EventList from "../../../components/Admin/EventList";
import { Calendar02Icon, GraduateMaleIcon, NewReleasesIcon, NewsIcon } from "hugeicons-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvenement } from "../../../store/slices/evenements.slice";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/table";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../Components/dropdown-menu";
// import { FaChevronDown, FaEdit, FaTrash } from "react-icons/fa";
// import { Button } from "@headlessui/react";

export default function DashAdmin() {
  const data=[
    {
      title:'Newsletter',
      date:'',
      nbre:'100',
      symb:'',
      icon:<NewsIcon size={60}/>,
      color:'blue-600'
    },
    {
      title:'CCCA Revue',
      date:'',
      nbre:'20',
      symb:'',
      icon:<NewReleasesIcon size={60}/>,
      color:'secondary'
    },
    {
      title:'Évenements',
      date:'',
      nbre:'10',
      symb:'',
      icon:<Calendar02Icon size={60}/>,
      color:'green-500'
    },
    {
      title:'Formation',
      date:'',
      nbre:'27',
      symb:'',
      icon:<GraduateMaleIcon size={60}/>,
      color:'primary'
    },
  ]

  const dispatch = useDispatch();
  const { Evenements } = useSelector((state) => state.evenements);
  useEffect(() => {
    dispatch(getAllEvenement());
  }, [dispatch]);

  // const paginatedSpecies=[
  //   {
  //     uuid:"1234",
  //     scienticname:"hhfhh",
  //     origin:"iduf"
  //   },
  //   {
  //     uuid:"1234",
  //     scienticname:"hhfhh",
  //     origin:"iduf"
  //   }
  // ]
  
  return (
    // <div className="flex flex-col flex-1 bg-gray-100">
    <> 
    <h2 className="m-0 text-[1.5rem] font-semibold text-primary mb-4">Dashboard</h2>
    <div className="flex w-full flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cards for metrics in French */}
        {data?.map((x)=>
          <div className={`px-7 py-7 relative bg-${x.color} bg-opacity-20 shadow flex flex-col gap-3.5 rounded-lg`}>
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold">{x.title}</h3>
              <span className="text-[.8rem]">{x.date}</span>
            </div>
            <p className={`text-[1.5rem] text-${x.color} font-semibold`}>{x.nbre}$ <sup className="text-md">{x.symb}</sup></p>
            <div className={`absolute w-[80px] text-${x.color} top-1/2 -translate-y-1/2 right-4 h-[80px] flex items-center justify-center rounded-[50px] opacity-75 border-secondary`}>{x?.icon}</div>
          </div>
        )}
      </div>

      <div className="flex w-full  max-md:flex-col gap-6">
        <div className="w-[60%] max-md:w-full flex flex-col gap-4 bg-white p-6 rounded-md">
          <span className="text-[1rem] font-semibold">Liste des évenements</span>
          <EventList event={Evenements}/>
        </div> 
        <div className="w-[40%] max-md:w-full py-8 bg-white px-4 rounded-md shadow">
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>tes</TableHead>
              <TableHead>tes</TableHead>
              <TableHead className="hidden sm:table-cell">tes</TableHead>
              <TableHead className="hidden md:table-cell">tes</TableHead>
              <TableHead className="text-right">actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSpecies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  pas de resultat
                </TableCell>
              </TableRow>
            ) : (
              paginatedSpecies.map((species, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{species?.uuid}</TableCell>
                  <TableCell>{species?.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{species?.scienticname}</TableCell>
                  <TableCell className="hidden md:table-cell">{species?.origin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <FaChevronDown className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
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
        </Table> */}
        </div>
      </div>
    </div>
    </>
  );
}

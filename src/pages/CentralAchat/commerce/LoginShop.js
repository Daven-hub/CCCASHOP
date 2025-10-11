import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Circle, CircleCheck, Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { login } from '../../../store/slices/auth.slice'
import { useToast } from '../../../hook/use-toast'
import { useAuth } from '../../../context/authContext'
import FormLogin from '../form/FormLogin'
import FormRegister from '../form/FormRegister'

export const BreadShop = ({ data }) => {
      return (
            <div className='bg-gray-100 flex justify-center py-7'>
                  <Breadcrumb data={data} />
            </div>
      )
}

function LoginShop() {
      const { t } = useTranslation()
      const {id}= useParams();
      const navigate = useNavigate();
      const [loading, setIsLoading] = useState(false)
      const dispatch = useDispatch();
      const {userConnected} = useAuth()
      const { toast } = useToast();
      const roles=[
             {
                  label:"je suis acheteur",
                  lien:"acheteur"
            },
            {
                  label:"je suis fournisseur",
                  lien:"fournisseur"
            }
      ]
      // const bread = [
      //       { label: t("accueille"), path: "/a" },
      //       { label: "Login Shop", path: "/login" }
      // ];

      // useEffect(() => {
      //       if(usershop?.role==="admin"){
      //             console.log("admin")
      //       }else if(usershop?.role==="fournisseur"){
      //             console.log("hey fournisseur")
      //       }else if(usershop?.role==="acheteur"){
      //             console.log("How are you?")
      //       }
      // }, [usershop?.role])

      useEffect(() => {
            if (userConnected) {
              navigate("/");
            }
          }, [userConnected, navigate]);
      
      const { register: connexion, control: controle, handleSubmit: handleSubmite, watch: watchs, formState: { errors: errorLog } } = useForm({
            defaultValues: {
                  username: '',
                  password: '',
            }
      });
      const { register: Enregistrement, control: controlE, handleSubmit: handleEnregistrement, watch: watchE, formState: { errors: errorLogE } } = useForm({
            defaultValues: {
                  role:roles[0]?.lien ?? '',
                  username: '',
                  password: '',
            }
      });

  
      const handleLogin = async () => {
            setIsLoading(true);
            const body = watchs()
            try {
                  await dispatch(login(body)).unwrap();
                  toast({
                        title: "Connexion reussie",
                        description: "Bienvenue",
                  });
                  navigate("/")
            } catch (error) {
                  toast({
                        title: "Connexion echouée",
                        description: error?.toString(),
                        variant: "destructive",
                  });
            } finally {
                  setIsLoading(false);
            }
      };

      const liensNav=[
            {
                  label:"Connexion",
                  lien:"connexion"
            },
            {
                  label:"Enregistrement",
                  lien:"enregistrement"
            }
      ]

   
      return (
            <div className='flex flex-col'>
                  {/* <BreadShop data={bread} /> */}
                  <div className='px-[33%] bg-gray-200 py-12 md:py-14'>
                        <div className='bg-white flex flex-col gap-10 px-10 py-12 rounded-[6px] border'>
                              <ul className='grid nav-login grid-cols-2 gap-2 text-[1.7rem] font-extrabold'>
                                    {liensNav?.map((x,ind)=>
                                          <li key={ind}><NavLink className="w-full py-2 capitalize flex items-center justify-center" to={"/mon-compte/"+x.lien}>{x.label}</NavLink></li>
                                    )}
                              </ul>
                              {id==="connexion" ?<FormLogin onSubmit={handleSubmite(handleLogin)} loading={loading} connexion={connexion} errorLog={errorLog} />:
                              <FormRegister watchE={watchE} roles={roles} controle={controlE} onSubmit={handleEnregistrement(handleLogin)} loading={loading} connexion={Enregistrement} errorLog={errorLogE} />}
                        </div>
                  </div>
            </div>
      )
}

export default LoginShop



{/* <div className='flex flex-col gap-0.5'>
                                          <span className='text-gray-500 text-[.7rem]'>Vous vous connectez en tant que * :</span>
                                          <Controller
                                                name="role"
                                                control={controle}
                                                render={({ field }) => (
                                                      <div className='grid md:grid-cols-3 text-black/80 grid-cols-1 gap-1'>
                                                            {datas?.map((x, ind) =>
                                                                  <div key={ind} onClick={() => field.onChange(x.toLowerCase())} className={`px-4 flex ${x.toLowerCase() === field.value && "bg-primary/70 text-white"} items-center gap-1.5 cursor-pointer hover:bg-gray-50 py-4 justify-center border rounded-[7px] font-semibold text-[.9rem]`}>{x.toLowerCase() !== field.value ? <Circle size={17} /> : <CircleCheck className='text-green-700' size={17} />} {x}</div>
                                                            )}
                                                      </div>
                                                )}
                                          />
                                    </div> */}
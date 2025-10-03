import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { Circle, CircleCheck, Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { login } from '../../../store/slices/auth.slice'
import { useToast } from '../../../hook/use-toast'
import { useAuth } from '../../../context/authContext'

export const BreadShop = ({ data }) => {
      return (
            <div className='bg-gray-100 flex justify-center py-7'>
                  <Breadcrumb data={data} />
            </div>
      )
}

function LoginShop() {
      const { t } = useTranslation()
      const navigate = useNavigate();
      const [loading, setIsLoading] = useState(false)
      const dispatch = useDispatch();
      const {userConnected} = useAuth()
      const datas = [
            "Fournisseur", "Acheteur"
      ]
      const { toast } = useToast();
      const bread = [
            { label: t("accueille"), path: "/a" },
            { label: "Login Shop", path: "/login" }
      ];

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
                  role: datas[0].toLowerCase() || '',
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
   
      return (
            <div className='flex flex-col'>
                  <BreadShop data={bread} />
                  <form onSubmit={handleSubmite(handleLogin)} className='px-[27%] flex text-[.9rem] flex-col gap-4 py-12 md:py-14'>
                        <div className='flex flex-col gap-0.5'>
                              <span className='text-gray-500 text-[.7rem]'>Vous vous connectez en tant que * :</span>
                              <Controller
                                    name="role"
                                    control={controle}
                                    render={({ field }) => (
                                          <div className='grid md:grid-cols-2 text-black/80 grid-cols-1 gap-1'>
                                                {datas?.map((x, ind) =>
                                                      <div key={ind} onClick={() => field.onChange(x.toLowerCase())} className={`px-4 flex ${x.toLowerCase() === field.value && "bg-primary/70 text-white"} items-center gap-1.5 cursor-pointer hover:bg-gray-50 py-4 justify-center border rounded-[7px] font-semibold text-[.9rem]`}>{x.toLowerCase() !== field.value ? <Circle size={17} /> : <CircleCheck className='text-green-700' size={17} />} {x}</div>
                                                )}
                                          </div>
                                    )}
                              />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                              <input type='text' className='flex border w-full p-3 rounded-[5px] outline-0' placeholder='Email *'
                                    {...connexion('username', { required: "Vous deviez renseigner le champs email" })} />
                              {errorLog.email && <p className="text-[.7rem] leading-0  text-red-600">{errorLog.username.message}</p>}
                        </div>
                        <div className='flex flex-col gap-0.5'>
                              <input type='password' className='flex border w-full p-3 rounded-[5px] outline-0' placeholder='Password *'
                                    {...connexion('password', { required: true })} />
                              {errorLog.email && <p className="text-[.7rem] text-red-600">Vous deviez renseigner le champs password</p>}
                        </div>
                        <div className='flex flex-col gap-2 mt-1.5'>
                              <NavLink className="underline text-[.9rem]" to={""}>Mot de passe oublié ?</NavLink>
                              <div className='grid font-bold text-[1rem] grid-cols-2 gap-4'>
                                    <button
                                          type="submit"
                                          disabled={loading}
                                          className="bg-primary transition-all duration-500 hover:opacity-85 cursor-pointer py-3 px-5 flex items-center justify-center rounded-[5px] text-white disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                          {loading ? (
                                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                                          ) : (
                                                "Se connecter"
                                          )}
                                    </button>
                                    <NavLink to={"/enregistrement"} className='flex cursor-pointer transition-all duration-500 hover:opacity-85 justify-center items-center rounded-[5px] text-primary border-2 border-primary'>Creer mon compte</NavLink>
                              </div>
                        </div>
                  </form>
            </div>
      )
}

export default LoginShop

import React from 'react'
import { Loader2} from 'lucide-react'
import { NavLink } from 'react-router-dom'

function FormLogin({onSubmit, loading,connexion,errorLog}) {
  return (
    <form onSubmit={onSubmit} className='flex text-[.9rem] flex-col gap-4'>
                                    <div className='flex flex-col gap-0.5'>
                                          <input type='text' className='flex border w-full px-3 py-3 rounded-[5px] outline-0' placeholder="Nom d'utilisateur ou Email *"
                                                {...connexion('username', { required: "Vous deviez renseigner le champs email" })} />
                                          {errorLog.username && <p className="text-[.7rem] leading-0  text-red-600">{errorLog.username.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-0.5'>
                                          <input type='password' className='flex border w-full px-3 py-3 rounded-[5px] outline-0' placeholder='Password *'
                                                {...connexion('password', { required: "Vous deviez renseigner le champs password" })} />
                                          {errorLog.password && <p className="text-[.7rem] text-red-600">{errorLog.password.message}</p>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                                                <input
                                                      type="checkbox"
                                                      name="rememberMe"
                                                      className="w-3 h-3 accent-blue-600 rounded cursor-pointer"
                                                />
                                                <span>Se souvenir de moi</span>
                                          </label>

                                          <NavLink
                                          to="/forgot-password"
                                          className="text-sm text-gray-600 font-medium hover:text-primary-light underline"
                                          >
                                                Mot de passe oublié ?
                                          </NavLink>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3.5 mt-2'>
                                                <button
                                                      type="submit"
                                                      disabled={loading}
                                                      className="bg-primary font-semibold w-full transition-all duration-500 hover:opacity-85 cursor-pointer py-3 px-5 flex items-center justify-center rounded-[5px] text-white disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                      {loading ? (
                                                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                                                      ) : (
                                                            "Se connecter"
                                                      )}
                                                </button>
                                                 <span className="text-[.9rem] text-gray-800 flex items-center gap-1">Je n'ai pas encore de compte ! <NavLink className="underline text-gray-500 font-semibold hover:text-primary-light" to={"/mon-compte/enregistrement"}>S'enregistrer</NavLink></span>
                                    </div>
                              </form>
  )
}

export default FormLogin
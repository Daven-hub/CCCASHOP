import React from 'react'
import { Circle, CircleCheck, Loader2, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function FormLogin({onSubmit, loading,connexion,errorLog}) {
  return (
    <form onSubmit={onSubmit} className='flex text-[.9rem] flex-col gap-4'>
                                    <div className='flex flex-col gap-0.5'>
                                          <input type='text' className='flex border w-full px-3 py-4 rounded-[5px] outline-0' placeholder='Email *'
                                                {...connexion('username', { required: "Vous deviez renseigner le champs email" })} />
                                          {errorLog.username && <p className="text-[.7rem] leading-0  text-red-600">{errorLog.username.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-0.5'>
                                          <input type='password' className='flex border w-full px-3 py-4 rounded-[5px] outline-0' placeholder='Password *'
                                                {...connexion('password', { required: "Vous deviez renseigner le champs password" })} />
                                          {errorLog.password && <p className="text-[.7rem] text-red-600">{errorLog.password.message}</p>}
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3.5 mt-3.5'>
                                                <button
                                                      type="submit"
                                                      disabled={loading}
                                                      className="bg-primary font-semibold w-full transition-all duration-500 hover:opacity-85 cursor-pointer py-4 px-5 flex items-center justify-center rounded-[5px] text-white disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                      {loading ? (
                                                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                                                      ) : (
                                                            "Se connecter"
                                                      )}
                                                </button>
                                                 <NavLink className="underline text-[.9rem] text-secondary/80" to={""}>Mot de passe oublié ?</NavLink>
                                    </div>
                              </form>
  )
}

export default FormLogin
import React from 'react'
import { Circle, CircleCheck, Loader2, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

function FormRegister ({
  onSubmit,
  watchE,
  roles,
  controle,
  loading,
  connexion,
  errorLog
}) {
  let datas = watchE()
//   console.log('watchE', datas)

  return (
    <form onSubmit={onSubmit} className='flex text-[.9rem] flex-col gap-4'>
      <div className='flex flex-col gap-0.5'>
        <input
          type='text'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='Email *'
          {...connexion('email', {
            required: 'Vous deviez renseigner le champs email'
          })}
        />
        {errorLog.email && (
          <p className='text-[.7rem] leading-0  text-red-600'>
            {errorLog.email.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-0.5'>
        <input
          type='password'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='Password *'
          {...connexion('password', { required: true })}
        />
        {errorLog.email && (
          <p className='text-[.7rem] text-red-600'>
            Vous deviez renseigner le champs password
          </p>
        )}
      </div>
      <div className='flex flex-col gap-0.5'>
        <input
          type='password'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='Confimer le mot de passe *'
          {...connexion('confimPass', { required: true })}
        />
        {errorLog.email && (
          <p className='text-[.7rem] text-red-600'>
            Vous deviez renseigner le champs password
          </p>
        )}
      </div>
      <div className='flex flex-col gap-0.5'>
        <input
          type='text'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='Nom *'
          {...connexion('nom', {
            required: 'Vous deviez renseigner le champs password'
          })}
        />
        {errorLog.nom && (
          <p className='text-[.7rem] text-red-600'>{errorLog.nom.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-0.5'>
        <input
          type='text'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='prenom *'
          {...connexion('prenom', { required: false })}
        />
        {errorLog.prenom && (
          <p className='text-[.7rem] text-red-600'>
            Vous deviez renseigner le champs password
          </p>
        )}
      </div>
      <div className='flex flex-col gap-0.5'>
        <input
          type='file'
          className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
          placeholder='profile *'
          {...connexion('profile', { required: false })}
        />
        {errorLog.profile && (
          <p className='text-[.7rem] text-red-600'>
            Vous deviez renseigner le champs password
          </p>
        )}
      </div>
      {datas?.role === 'fournisseur' && (
        <>
          <div className='flex flex-col gap-0.5'>
            <input
              type='text'
              className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
              placeholder='Nom de la boutique *'
              {...connexion('shop_name', {
                required: 'Vous deviez renseigner le champs password'
              })}
            />
            {errorLog.shop_name && (
              <p className='text-[.7rem] text-red-600'>
                {errorLog.shop_name.message}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-0.5'>
            <input
              type='text'
              className='flex border w-full px-3 py-3 rounded-[5px] outline-0'
              placeholder='Telephone du vendeur *'
              {...connexion('shop_tel', {
                required: 'Vous deviez renseigner le champs password'
              })}
            />
            {errorLog.shop_tel && (
              <p className='text-[.7rem] text-red-600'>
                {errorLog.shop_tel.message}
              </p>
            )}
          </div>
        </>
      )}
      <div className='flex flex-col  py-2 gap-0.5'>
        <Controller
          name='role'
          control={controle}
          render={({ field }) => (
            <div className='flex items-center justify-between text-black/80 gap-2'>
              {roles.map((role, index) => (
                <div
                  key={index}
                  onClick={() => field.onChange(role?.lien?.toLowerCase())}
                  className={`flex items-center gap-2 cursor-pointer justify-center font-semibold text-[.85rem] transition `}
                >
                  <input
                    type='radio'
                    checked={role?.lien?.toLowerCase() === field.value}
                    onChange={() => field.onChange(role?.lien?.toLowerCase())}
                    className='accent-primary w-4 h-4 cursor-pointer'
                  />
                  <label className='cursor-pointer'>{role?.label}</label>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-3.5 mt-3.5'>
        <button
          type='submit'
          disabled={loading}
          className='bg-primary font-semibold w-full transition-all duration-500 hover:opacity-85 cursor-pointer py-4 px-5 flex items-center justify-center rounded-[5px] text-white disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {loading ? (
            <Loader2 className='animate-spin h-5 w-5 text-white' />
          ) : (
            'Enregistrer'
          )}
        </button>
        <NavLink className='underline text-[.9rem] text-secondary/80' to={''}>
          Mot de passe oublié ?
        </NavLink>
      </div>
    </form>
  )
}

export default FormRegister

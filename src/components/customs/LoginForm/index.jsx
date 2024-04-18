import React from 'react'
import { Link } from 'react-router-dom'
import InputPhoneNumber from '../InputPhoneNumber'

import useLogin from '../../../models/hooks/useLogin'

import './login-form.css'


export default function LoginForm() {
    const { formValues,updateForm, setPhoneNumber, onLogin } = useLogin()
    const { password, rememberMe } = formValues
     
    
  return (
    <div className='h-fit w-96 border rounded-3xl p-4 shadow bg-white'>
        <h1 className='font-bold my-4 font-content'>Connexion</h1>
        <form action="" onSubmit={onLogin}>
            <div className='mb-4'>
                <div className='my-1'>
                    <label htmlFor="" className='text-xs font-bold'>Numero de telephone</label>
                </div>
                <InputPhoneNumber setFinalValue={setPhoneNumber} international />
            </div>

            <div className='mb-4'>
                <div className='my-1'>
                    <label htmlFor="password" className='text-xs font-bold'>Mot de passe</label>
                </div>
                <input 
                    name='password'
                    id='password' 
                    type="password" 
                    className='py-2 px-4 rounded-xl bg-slate-50 border focus:outline-none w-full'
                    value={password}
                    onChange={updateForm}
                    required
                />
            </div>

            <div className='flex items-center gap-4 text-xs font-bold my-4'>
                <input type="checkbox" name='rememberMe' value={rememberMe} onChange={updateForm} />
                <div>Se souvenir de moi</div>
            </div>
            <button type='submit' onClick={onLogin} className='bg-emerald-500 text-sm w-full text-white font-bold p-2 rounded'>Se connecter</button>
        </form>
        <div className='my-2 text-sm'>
            <div className='flex items-center gap-2'>
               <div>
                    Vous etes nouveau ?
                </div>
                <div>
                    <Link to={'/sign-up'} className='font-bold font-content'>S'inscrire</Link>

                </div> 
            </div>
        </div>
        
        
    </div>
  )
}

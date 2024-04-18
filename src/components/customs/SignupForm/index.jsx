import React  from 'react'
import { Link } from 'react-router-dom'
import InputPhoneNumber from '../InputPhoneNumber'
import useSignup from '../../../models/hooks/useSignup'
import './signup-form.css'



export default function SignupForm() {
    const { formValues, updateForm, setPhoneNumber, onSignup } = useSignup()
    const { enterpriseName, password, activity } = formValues

    return (
        <div className='h-fit  border rounded-3xl p-4 shadow bg-white'>
            <h1 className='font-bold my-4 font-content'>Inscription</h1>
            <form action="" onSubmit={onSignup}>
                <div className="flex gap-4">
                    <div className='mb-4'>
                        <div className='my-1'>
                            <label htmlFor="enterprise-name" className='text-xs font-bold'>Nom entreprise</label>
                        </div>
                        <input 
                            name="enterpriseName"
                            id='enterprise-name' 
                            type="text" 
                            className='py-2 px-4 rounded-xl bg-slate-50 border focus:outline-none w-full'
                            value={enterpriseName}
                            onChange={updateForm}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <div className='my-1'>
                            <label htmlFor="" className='text-xs font-bold'>Numero de telephone</label>
                        </div>
                        <InputPhoneNumber setFinalValue={setPhoneNumber} international />
                    </div>
                </div>


                <div className='mb-4'>
                    <div className='my-1'>
                        <label htmlFor="password" className='text-xs font-bold'>Mot de passe</label>
                    </div>
                    <input 
                        name="password"
                        id='password' 
                        type="password" 
                        className='py-2 px-4 rounded-xl bg-slate-50 border focus:outline-none w-full'
                        value={password}
                        onChange={updateForm}
                        required
                    />
                </div>

                <div className='mb-4'>
                    <div className='my-1'>
                        <label htmlFor="activity" className='text-xs font-bold'>Enoncer l'activite de l'entreprise</label>
                    </div>
                    <textarea
                        name='activity'
                        id='activity'
                        rows={10}
                        className='py-2 px-4 rounded-xl bg-slate-50 border focus:outline-none w-full'
                        value={activity}
                        onChange={updateForm}
                        required
                    ></textarea>
                </div>

                <button type='submit' onClick={onSignup} className='bg-emerald-500 text-sm w-full text-white font-bold p-2 rounded'>S'inscrire</button>
            </form>
            <div className='my-2 text-sm'>
                <div className='flex items-center gap-2'>
                <div>
                        Vous avez deja un compte ?
                    </div>
                    <div>
                        <Link to={'/login'} className='font-bold font-content'>Se connecter</Link>

                    </div> 
                </div>
            </div>
            
            
        </div>
    )
}

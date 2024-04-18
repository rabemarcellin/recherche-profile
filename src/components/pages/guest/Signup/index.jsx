import React from 'react'
import SignupForm from '../../../customs/SignupForm'
import { SignupProvider } from '../../../../models/contexts/userSignupContext'

export default function Signup() {

  return (
    <SignupProvider>
      <div className='max-w-5xl mx-auto  py-4'>
        <div className="flex items-center justify-center min-h-screen h-full">
          <SignupForm />
        </div>
      </div>  
    </SignupProvider>
  )
}

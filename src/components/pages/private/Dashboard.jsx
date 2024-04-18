import React from 'react'
import useAuth from '../../../models/hooks/useAuth'


export default function Dashboard() {

  const auth = useAuth()
  const { logout } = auth
   
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <button onClick={logout} className='border shadow p-2 rounded-lg bg-white'>Se deconnecter</button>
    </div>
  )
}

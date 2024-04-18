import React from 'react'
import ShowIcon from '../ShowIcon'
import AppLink from '../AppLink'


export default function MenuDashboard() {
  return (
    <div className='p-2 bg-white'>
    <div className="flex justify-between items-center">
      <div className="flex-none">
        <h3>Logo</h3>
      </div>
      <div className="flex-none">
        <div className="flex gap-4 items-center">
          <div>
            <AppLink to={'/dashboard'} iconName={'ri-home'} size={24} />
          </div>
          <div>
            <AppLink to={'/search'} iconName={'md-search'} size={24} />
          </div>
          <div>
            <button className='hover:bg-slate-100 p-2 rounded-full'>
              <ShowIcon name="ri-notification" size={24} />
            </button>
          </div>
          <div>
            <AppLink to={'/subscriptions'} iconName={'fa-money'} size={24} />
          </div>
          <div>
            <button className='hover:bg-slate-100 p-2 rounded-full'>
              <ShowIcon name="ri-settings" size={24} />
            </button>
          </div>
          <div>
            <button>
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <div className='w-full h-full bg-blue-500'></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

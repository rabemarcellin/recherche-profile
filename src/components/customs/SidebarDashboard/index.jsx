import React, { useEffect } from 'react'
import AppLink from '../AppLink'
import menuLinks from './menu-sidebar.list'

import './sidebar-dashboard.css'


export default function SidebarDashboard() {

    return (
    <div className='max-w-72 w-full mt-4'>
        <nav>
            <ul>
                {
                    menuLinks.map(menu => (
                        <li key={`menu-sidebar-time--${menu.index}`}>
                            <AppLink {...menu} />
                        </li>
                        
                    ))
                }
            </ul>
        </nav>
    </div>
  )
}

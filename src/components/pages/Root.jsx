import { Outlet } from 'react-router-dom'
import AppProvider from '../providers/AppProvider'
import '../../config/react-pdf'
import '../../styles/global.css'


export default function Root() {
  
  return (
    <AppProvider>
        <Outlet />
    </AppProvider>

  )
}

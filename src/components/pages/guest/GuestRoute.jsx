import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { isGuestRoute } from '../../routes/guestRoutes';
import useAuth from '../../../models/hooks/useAuth';


export default function GuestRoute() {
    const location = useLocation();
    
    const navigate = useNavigate();

    const auth = useAuth()
    const { user } = auth

    
    /** 
     * Handle route redirection in case if guest user attempts to rich content page for auth user only, 
     * or in the reverse case.
     */
    useEffect(() => {
        const { pathname } = location;
        const isGuestPage = isGuestRoute(pathname);

        console.log(user)

        console.log(isGuestPage)
        
        if(user && isGuestPage) navigate('/dashboard')
    }, [user]);
  
    return <Outlet />    
}

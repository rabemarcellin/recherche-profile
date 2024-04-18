import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function useRouteInclude(route) {
    const [status, setStatus] = useState(null)
    const location = useLocation()

    const verify = () => {
        const regexPattern = new RegExp(`^${route}/?$`);

        // Check if the route matches the regex pattern
        if (regexPattern.test(route)) {
            const baseRoute = route.split('/')[1]
            setStatus(location.pathname === `/${baseRoute}`)
        }
    }

    useEffect(() => {
        verify()
    }, [location])
    

    return status
}

import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ShowIcon from '../ShowIcon'
import useRouteInclude from '../../../models/hooks/useRouteInclude'
import { isTrialPlan } from '../../../models/redux/plan/pricingPlansSelectors';

import './app-link.css'
import { currentSubscriptionSelector } from '../../../models/redux/subscription/subscriptionsSelectors';


export default function AppLink({ to, iconName, size }) {

    const useTrialPlan = useSelector(isTrialPlan)

    const isRoute = useRouteInclude(to)
    
    return (
        <NavLink to={to}>
            <div className={`${isRoute ? "link--active": ""} link`}>
                <div className="relative">
                    <ShowIcon name={iconName} size={size || 16} />
                    {(useTrialPlan && to === '/subscriptions') && (
                        <div className="absolute top-0 left-0 -translate-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow"></div>
                        </div>
                    )}
                </div>
            </div>
        </NavLink>
    )
}


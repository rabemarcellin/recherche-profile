import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isGuestRoute } from '../../routes/guestRoutes';
import { getPricingPlansAction } from '../../../models/redux/plan/pricingPlansActions';
import MenuDashboard from '../../customs/MenuDashboard'
import { currentSubscriptionSelector, subscriptionsSelector } from '../../../models/redux/subscription/subscriptionsSelectors';
import { getUserSubscriptionsAction } from '../../../models/redux/subscription/subscriptionsActions';
import useAuth from '../../../models/hooks/useAuth';
import { selectPricingPlans } from '../../../models/redux/plan/pricingPlansSelectors';
import Modal from '../../customs/Modal';
import RequireSubscribe from '../../customs/RequireSubscribe';


export default function ProtectedRoute() {
    const [endSubscription, setEndSubscription] = useState(false)
    

    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const auth = useAuth()
    const { user } = auth

    const pricingPlans = useSelector(selectPricingPlans)

    const userSubscriptions = useSelector(subscriptionsSelector)

    const userHaveSubscription = useSelector(currentSubscriptionSelector)

    const isSubscriptionEmpty = userSubscriptions.length === 0

    useEffect(() => {

        if(!pricingPlans)
        {
            dispatch(getPricingPlansAction());
        } 
    }, [])

    useEffect(() => {
        const { pathname } = location;
        const isGuestPage = isGuestRoute(pathname);

        if(user)
        {
            if (isGuestPage) {
                navigate('/dashboard');
            } 

            if(!user.isLogout && isSubscriptionEmpty) 
            {
                dispatch(
                    getUserSubscriptionsAction(user.id)
                )
            }

            if(!isSubscriptionEmpty && !userHaveSubscription) // if user doesn't have any subscription
            {
                console.warn(
                    'TO DO',
                    'disallowed any interaction on the plateform',
                    'tell user to susbscribe'
                )

                setEndSubscription(true)
            }
            else if(userHaveSubscription)
            {
                setEndSubscription(false)
            }
        }
        else if (!user  && !isGuestPage) {
            navigate('/login');
        }    
    }, [user, userSubscriptions, userHaveSubscription]);

    return (
        <div className='max-w-5xl mx-auto flex flex-col min-h-screen'>
            <div className="flex-none">
                <MenuDashboard />
            </div>
            <div className="flex-1">
                <div className="flex divide-x gap-4 h-full">
                    <div className="flex-1 my-4 p-4 ">
                        <Outlet />
                        {endSubscription && (
                            <Modal isOpen={endSubscription}>
                                <RequireSubscribe />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


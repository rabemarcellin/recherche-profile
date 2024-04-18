import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/auth/authSelectors'
import { deleteUserAction, logoutAction, setUserAction, signupUserAction } from '../redux/userAuth/userAuthActions'
import { userAuthSelector } from '../redux/userAuth/userAuthSelectors'
import { deleteTokensAction, loginAction } from '../redux/auth/authActions'
import { deleteSavingSubscriptionAction, subscribeAction } from '../redux/subscription/subscriptionsActions'
import { useState } from 'react'
import { setEndSubscriptionDate } from '../../helpers/subscription'
import { trialPlanSelector } from '../redux/plan/pricingPlansSelectors'

export default function useAuth() {
    const auth = useSelector(authSelector)

    const user = useSelector(userAuthSelector)

    const [userData, setUserData] = useState(null)

    const dispatch = useDispatch()

    const trialPlan = useSelector(trialPlanSelector)

    const token = auth?.accessToken


    const login = (phoneNumber, password, rememberMe) => {
        const credentials = { phoneNumber, password, rememberMe }
        dispatch(loginAction(credentials))
    }

    const signup = (enterpriseName, phoneNumber, password, activity, email) => {
        setUserData(
            {
                name: enterpriseName,
                email: email,
                password: password,
                phone_number: phoneNumber,
                activity: activity
            }
        )
        
        dispatch(signupUserAction(userData))
    }

    const logout = () => {
        dispatch(logoutAction())
    }

    // on logout 
    useEffect(() => {
        if(user?.isLogout)
        {
            // delete user authentication tokens
            dispatch(deleteTokensAction())

            // delete user subscriptions caches in the app
            dispatch(deleteSavingSubscriptionAction())

            // delete user status logout
            dispatch(deleteUserAction())
        }    
    }, [user])

    // on login
    useEffect(() => {

        if(token && !user)
        {
            dispatch(setUserAction())
        }
    }, [token, user])

    // on signup
    useEffect(() => {
        if 
        (userData && user.isSignupSuccess) 
        {
            dispatch(loginAction({ phoneNumber: userData.phone_number, password: userData.password }));
        } 
        else if 
        (userData && trialPlan && user.id)
        {
            /**
            * If user ending signup, assign trial plan to him.
            * - Guess the end date of the subscription in correspondance of the trial plan delay
            * - Trigger new subscription action as trial
            */
            const endSubscriptionDate = setEndSubscriptionDate(trialPlan.delay)

            dispatch(
                subscribeAction(
                    userAuthAfterSignup.id,
                    trialPlan.id,
                    endSubscriptionDate,
                    userAuthAfterSignup.phone_number
                )
            )
        }
    }, [userData, user]);
  
    return { user, login, signup, logout }
}

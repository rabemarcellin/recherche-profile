import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUserAction } from '../redux/userAuth/userAuthActions'
import { userAuthSelector } from '../redux/userAuth/userAuthSelectors'
import { trialPlanSelector } from '../redux/plan/pricingPlansSelectors'
import { setEndSubscriptionDate } from '../../helpers/subscription'
import { subscribeAction } from '../redux/subscription/subscriptionsActions'
import { loginAction } from '../redux/auth/authActions'
import UserSignupContext from '../contexts/userSignupContext'
import useAuth from './useAuth'


export default function useSignup() {
    
    const resetValue = 
    {
        enterpriseName: '',
        phoneNumber: '',
        password: '',
        activity: ''
    }

    const [formValues, setFormValues] = useState(resetValue)
    
    const auth = useAuth()
    const { signup } = auth

    /**
     * Update signup form using directly the event
     * - Guess form using name attribute, means input name attribute should same of the form state name
     * @param {*} event 
     */
    const updateForm = (event) => {
        const name = event.target.name 
        const value = event.target.value
        setFormValues({...formValues, [name]: value})
    }

    /**
     * Update phone number in national or international format.
     * @param {string} value 
     */
    const setPhoneNumber = (value) => {
        setFormValues({...formValues, phoneNumber: value })
    }

    /**
     * Signup user.
     * - Use validation for all form 
     * - Generate fake email, for bubble app purpose
     * - Trigger signup action
     * 
     * @param {*} event 
     * @returns 
     */
    const onSignup = (event) => {

        event.preventDefault()
        const { enterpriseName, phoneNumber, password, activity } = formValues

        try {
            if(
                enterpriseName.length === 0
                ||
                phoneNumber === "not-ready-yet"
                ||
                password.length === 0
                ||
                activity.length === 0
            ) {
                throw new Error('Verify user credentials.')
            }
        } catch (error) {
            // todo: tell user to verify credentials rules 
            console.error(error)
        }
        
        // Bubble use email and password for authentication, as it application is migration from bubble, 
        // we set the fake email in cas to use the same data providing by here there 
        const fakeBubbleEmail = `${phoneNumber}@gmail.com`
        
        signup(
            enterpriseName,
            phoneNumber,
            password,
            activity,
            fakeBubbleEmail
        )
    }
   
    return { formValues, updateForm, setPhoneNumber, onSignup }
}

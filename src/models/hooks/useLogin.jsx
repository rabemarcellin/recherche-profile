import { useState } from 'react'

import useAuth from './useAuth'

export default function useLogin() {
    
    const resetValue = 
    {
        phoneNumber: '',
        password: '',
        rememberMe: false
    }

    const auth = useAuth()
    const { login } = auth

    const [formValues, setFormValues] = useState(resetValue)
    
    /**
     * Update login form using directly the event
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
     * Login user.
     * - Use validation for all form 
     * - Trigger login action
     * 
     * @param {*} event 
     * @returns 
     */
    const onLogin = (event) => {
            
            event.preventDefault()

            const { phoneNumber, password, rememberMe } = formValues
            
            try {
                if(
                    phoneNumber === "not-ready-yet"
                    ||
                    password.length === 0
                ) {
                    throw new Error('Verify user credentials.')
                }
            } catch (error) {
               // todo: tell user to verify credentials rules 
               console.error(error)
            }

            login(phoneNumber, password, rememberMe)
    }
    
    return { formValues, updateForm, setPhoneNumber, onLogin }
}

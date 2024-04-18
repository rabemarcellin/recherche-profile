import React, { useEffect, useState } from 'react'
import useAuth from '../../models/hooks/useAuth'
import InputPhoneNumber from './InputPhoneNumber'
import { phoneFormData } from '../../helpers/phone-number'
import { PAYMENT_PHONE_NUMBER } from '../../models/constants'
import { useDispatch, useSelector } from 'react-redux'
import { currentSubscriptionSelector } from '../../models/redux/subscription/subscriptionsSelectors'
import { selectPaidPlan } from '../../models/redux/plan/pricingPlansSelectors'
import { setEndSubscriptionDate } from '../../helpers/subscription'
import { subscribeAction } from '../../models/redux/subscription/subscriptionsActions'

export default function RequireSubscribe() {
    const [userSuscribe, setUserSubscribe] = useState(null)
    const [isValidateByLoop, verifyLoop] = useState(false)
    
    const auth = useAuth()
    const user = auth.user

    const dispatch = useDispatch()

    const paymentNumber = phoneFormData(PAYMENT_PHONE_NUMBER)

    const userHaveSubscription = useSelector(currentSubscriptionSelector)

    const paidSubscription = useSelector(selectPaidPlan)    
    
    useEffect(() => {
        
        if(user && !userSuscribe)
        {
            setUserSubscribe(user)
        }
    }, [user, userSuscribe])
    
    const setSubscriptionNumber = (newValue) => {
        setUserSubscribe({...userSuscribe, phone_number: newValue})
    }

    useEffect(() => {

        if(!userHaveSubscription)
        {
            /**
             * todo : replace the resubscription function by the real function to resubscribe the user
             *  constraints: 
             *  * trial plan cannot be resubscribe 
             * */ 
            
            setTimeout(() => {
                 verifyLoop(true)

                 if(isValidateByLoop && paidSubscription && userSuscribe.phone_number !== 'not-ready-yet')
                 {
                    const endSubscriptionDate = setEndSubscriptionDate(paidSubscription.delay)

                    dispatch(
                        subscribeAction(
                            user.id,
                            paidSubscription.id,
                            endSubscriptionDate,
                            userSuscribe.phone_number
                        )
                    )
                 }
            }, 5000)
        }

       
    }, [userHaveSubscription, isValidateByLoop])

    return (
        <div className='max-w-4xl'>
            <div className="grid grid-cols-2">
                <div>
                    <div className='text-sm text-gray-500 mb-4'>
                        <p className='mb-2 text-black font-bold text-base'>
                            Veuillez envoyer a ce numero l'abonnement
                        </p>
                        <div className="my-4">
                            <div className="text-blue-500 font-bold flex gap-2 items-end">
                                <div className='text-7xl'>1000</div>
                                <div>Ariary</div>
                                <div className='text-black'>pour un mois</div>
                            </div>  
                        </div>
                        <p className='mb-2'>
                            Nous verifions automatiquement si vous avez envoyes le frais d'abonnement.
                        </p>
                    </div>
                    <div className="w-fit mx-auto">
                        <div className="flex gap-4">
                            <div className="border shadow p-2 text-3xl font-bold rounded-xl bg-slate-50">
                                {`0${paymentNumber.operatorSuffix}`}
                            </div>
                            
                            <div className="border shadow p-2 text-3xl font-bold rounded-xl bg-slate-50">
                                {paymentNumber.firstTwo}
                            </div>
                            
                            <div className="border shadow p-2 text-3xl font-bold rounded-xl bg-slate-50">
                                {paymentNumber.middleThree}
                            </div>
                            
                            <div className="border shadow p-2 text-3xl font-bold rounded-xl bg-slate-50">
                                {paymentNumber.lastTwo}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {userSuscribe && (
                        <div>
                            <div>
                                <h1 className='font-bold mb-2'>Votre Numero de transaction</h1>
                                <div className='text-sm text-gray-500 mb-4'>
                                    <p className='mb-2'>
                                        Nous prenons compte que c'est avec ce numero que vous allez payer l'abonnement.
                                        Veuillez le modifier au cas ou ce n'est pas le cas.
                                    </p>
                                    
                                </div>
                            </div>
                            <div className='w-fit'>
                                <InputPhoneNumber 
                                    defaultValue={phoneFormData(userSuscribe.phone_number)} 
                                    setFinalValue={setSubscriptionNumber}
                                    disabled 
                                />
                            </div>
                            
                            <div className='my-2 flex'>
                                <button className='bg-blue-500 p-2 rounded-lg text-white'>Modifier</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

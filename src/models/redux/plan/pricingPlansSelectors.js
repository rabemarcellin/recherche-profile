import { currentSubscriptionSelector } from "../subscription/subscriptionsSelectors"

export const getPricingPlans = state => state.pricingPlans

export const selectPricingPlans = state => state.pricingPlans

export const selectPaidPlan = state => getPricingPlans(state).find(plan => plan.name === 'paid')

export const isTrialPlan = (state) => {
    try {
        const currentSubscription = currentSubscriptionSelector(state)
        if(!currentSubscription) return false

        const trialPlan = state.pricingPlans.find(plan => plan.name === 'trial')
        if(!trialPlan) throw new Error('Trial plan not found')

        return currentSubscription.plan_id === trialPlan.id 
    } catch (error) {
        console.error(error)
    }
}

export const trialPlanSelector = state => {
    return state.pricingPlans?.find(plan => plan.name === 'trial')
}
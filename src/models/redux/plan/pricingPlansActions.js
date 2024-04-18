import getPlansService from "../../../services/pricingPlan/getPlans";
import pricingPlanActions from "./action.type";

export const getPricingPlansAction = () => {
    return async dispatch => {
        const pricingPlans = await getPlansService()

        return dispatch({ type: pricingPlanActions.GET_PRICING_PLANS, payload: pricingPlans })
    }
}

export const deletePlansAction = () => {
    return dispatch({ type: pricingPlanActions.DELETE_ALL_PLANS })
}

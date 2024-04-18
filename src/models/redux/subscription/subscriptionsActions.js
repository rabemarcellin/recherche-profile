import subscribeUserService from "../../../services/subscription/subscribe";
import getUserSubscriptions from "../../../services/subscription/userSubscriptions";
import subscriptionAction from "./action.type";

export const getUserSubscriptionsAction = (userId) => {
    return async dispatch => {
        const subscriptions = await getUserSubscriptions(userId)
        return dispatch({ type: subscriptionAction.GET_USER_SUBSCRIPTIONS, payload: subscriptions })
    }
}

export const subscribeAction = (userId, planId, endDate, phoneNumber) => {
    return async dispatch => {
        
        const newSubscription = await subscribeUserService(userId, planId, endDate, phoneNumber)

        
        return dispatch({ type: subscriptionAction.SUBSCRIBE , payload: newSubscription })
    }
}

export const deleteSavingSubscriptionAction = () => {
    return dispatch => dispatch({ type: subscriptionAction.DELETE_SAVING_SUBSCRIPTION })
}


import { parseFromJSON } from "../../../helpers/json";
import { appendExistingLocalStorage, deleteInLocalStorage, getFromLocalStorage, saveInLocalStorage } from "../../../helpers/localStorage";
import subscriptionActions from "./action.type";

const defaultValue = parseFromJSON(
    getFromLocalStorage('subscriptions')
) || []


const subscriptionsReducer = (state = defaultValue, action) => {
    const type = action.type

    switch(type) {
        case subscriptionActions.SUBSCRIBE: {
            const data = appendExistingLocalStorage('subscriptions', action.payload)
            return data
        }

        case subscriptionActions.GET_USER_SUBSCRIPTIONS: {
            const data = action.payload
            saveInLocalStorage('subscriptions', JSON.stringify(data))
            return data
        }
    
        case subscriptionActions.DELETE_SAVING_SUBSCRIPTION: {
            deleteInLocalStorage('subscriptions')
            return []
        }
        
        default: {
            return state
        }
    }
}
export default subscriptionsReducer
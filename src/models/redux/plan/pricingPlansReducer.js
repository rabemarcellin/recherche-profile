import { parseFromJSON, parseToJSON } from "../../../helpers/json";
import { deleteInLocalStorage, getFromLocalStorage, saveInLocalStorage } from "../../../helpers/localStorage";
import planActions from "./action.type";



const defaultValue = parseFromJSON(
    getFromLocalStorage('pricing-plans')
) || []


const pricingPlansReducer = (state = defaultValue, action) => {
    const type = action.type

    switch(type) {
        case planActions.GET_PRICING_PLANS: {
            const data = action.payload
            saveInLocalStorage('pricing-plans', parseToJSON(data))
            return data
        }
       
        case planActions.DELETE_ALL_PLANS: {
            deleteInLocalStorage('pricing-plans')
            return null
        }
        default: {
            return state
        }
    }
}
export default pricingPlansReducer
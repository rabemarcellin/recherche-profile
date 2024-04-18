import { parseFromJSON, parseToJSON } from "../../../helpers/json";
import { appendExistingLocalStorage, deleteInLocalStorage, getFromLocalStorage, saveInLocalStorage } from "../../../helpers/localStorage";
import authActions from "./action.type";


const initialAuthState = parseFromJSON(getFromLocalStorage('auth')) || null


const authReducer = (state = initialAuthState, action) => {
    const type = action.type

    switch(type) {
        case authActions.LOGIN: {
            const data = action.payload
            saveInLocalStorage('auth', parseToJSON(data))
            return data
        }
        case authActions.REFRESH_TOKEN: {
            const data = appendExistingLocalStorage('auth', action.payload)
            return data
        }

        case authActions.DELETE_ALL_TOKENS: {
            deleteInLocalStorage('auth')
            return null
        }
        default: {
            return state
        }
    }
}
export default authReducer
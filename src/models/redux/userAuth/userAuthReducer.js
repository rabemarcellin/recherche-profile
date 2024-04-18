import { parseFromJSON, parseToJSON } from "../../../helpers/json";
import { saveInLocalStorage, deleteInLocalStorage, getFromLocalStorage } from "../../../helpers/localStorage";
import userAuthActions from "./action.type";


const initialUserAuthState = parseFromJSON(getFromLocalStorage('user-auth')) || null


const userAuthReducer = (state = initialUserAuthState, action) => {
    const type = action.type

    switch(type) {
        case userAuthActions.GET_USER_AUTH: {
            const data = action.payload
            saveInLocalStorage('user-auth', parseToJSON(data))
            return data
        }

        case userAuthActions.LOG_USER_OUT: {
            const data = { isLogout: true }
            deleteInLocalStorage("user-auth")
            return data
        }

        case userAuthActions.SIGNUP_USER: {
            const data = { isSignupSuccess: true }
            return data
        }

        case userAuthActions.DELETE_USER: {
            return null
        }

        default: {
            return state
        }
    }
}
export default userAuthReducer
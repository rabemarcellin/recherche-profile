import signupUserService from "../../../services/auth/signupUser";
import getUserAuthService from "../../../services/auth/userAuth";
import userAuthActions from "./action.type";

export const setUserAction = () => {
    return async dispatch => {
        const user = await getUserAuthService()
        return dispatch({ type: userAuthActions.GET_USER_AUTH, payload: user })
    }
}

export const logoutAction = () => {
    return dispatch => dispatch({ type: userAuthActions.LOG_USER_OUT })
}

export const deleteUserAction = () => {
    return dispatch => dispatch({ type: userAuthActions.DELETE_USER })
}

export const signupUserAction = (userData) => {
    return async dispatch => {
        await signupUserService(userData)
        return dispatch({ type: userAuthActions.SIGNUP_USER  })
    }
}


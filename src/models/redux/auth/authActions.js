import loginService from "../../../services/auth/login";
import authActions from "./action.type";

export const loginAction = (credentials) => {
    return async dispatch => {
        const { phoneNumber, password, rememberMe } = credentials
        const { accessToken, refreshToken } = await loginService(phoneNumber, password)
        const payload = { accessToken, refreshToken, rememberMe: rememberMe || false }
        return dispatch({ type: authActions.LOGIN, payload })
    }
}

export const refreshTokenAction = (newAccessToken) => {
        return dispatch => {
            const payload = newAccessToken
            return dispatch({ type: authActions.REFRESH_TOKEN, payload })
    }
}

export const deleteTokensAction = () => {
    return dispatch => dispatch({ type: authActions.DELETE_ALL_TOKENS })
}

import axios from "axios";
import { API_URL } from "../models/constants";
import store from "../models/redux/store";
import { refreshTokenAction } from "../models/redux/auth/authActions";
import refreshTokenService from "./auth/refreshToken";

const createAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return axiosInstance
}

const axiosInstance = createAxiosInstance()

export const addHeaderJWT = (customAxios) => {
    const api = customAxios || axiosInstance
    api.interceptors.request.use(
        config => {
            const accessToken = store.getState().auth?.accessToken
            if(accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config;
        },
        error => Promise.reject(error)
    )

    api.interceptors.response.use(
        response => response,
        async error => {
                const errorRequestConfig = error.config
                if(error.response.status === 401 && !errorRequestConfig._retry) {
                    errorRequestConfig._retry = true
                    try {
                        const refreshToken = store.getState().auth.refreshToken

                        const newAccessToken = await refreshTokenService(refreshToken)

                        store.dispatch(refreshTokenAction(newAccessToken))

                        errorRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`
                        return axiosInstance(errorRequestConfig);
                    } catch(error) {
                        // throw error for status 403 and message, refresh token expired
                        console.error('Refresh token failed', error);
                    }
                } else {
                    return Promise.reject(error);
                }
        } 
    )

    return api
} 

export default axiosInstance

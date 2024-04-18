import { API_URL } from '../../models/constants'
import  axiosInstance from '../axiosInstance'
import axios from 'axios'

const refreshTokenService = async (refreshToken) => {
    const refreshTokenUri = `${API_URL}/auth/refresh-token`
    const response = await axios.post(refreshTokenUri, {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    })
    const newAccessToken = response.data
    return newAccessToken
}
export default refreshTokenService
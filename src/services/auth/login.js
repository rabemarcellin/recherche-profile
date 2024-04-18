import axiosInstance, { addHeaderJWT } from "../axiosInstance";


const loginService = async (phoneNumber, password) => {
    const uri = '/auth/login'
    const credentials = { phone_number: phoneNumber, password: password }
    const response = await axiosInstance.post(uri, credentials)
    if(response.status !== 200) {
        // error on request login 
    }
    const { token } = response.data
    
    return (
        { 
            accessToken: token.accessToken,
            refreshToken: token.refreshToken 
        }
    )
}
export default loginService
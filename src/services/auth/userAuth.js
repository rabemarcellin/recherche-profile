import { addHeaderJWT } from "../axiosInstance";


const getUserAuthService = async () => {
    try {
        const uri = '/auth/me'
        const axiosInstance = addHeaderJWT()
        const response = await axiosInstance.post(uri)
        if(response.status !== 200) {
            // error on request login 
            throw new Error('Failed to log user request')
        } else {
            const userAuth = response.data
            return userAuth
        }
    } catch (error) {
       console.error(error) 
    }
    
}
export default getUserAuthService
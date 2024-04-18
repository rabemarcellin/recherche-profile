import { addHeaderJWT } from "../axiosInstance";


/**
 * Get all subscriptions belongs to the current user
 * @param {number} userId 
 */
const getUserSubscriptions = async (userId) => {
    try {
        const uri = `/subscription/${userId}`
        const axiosInstance = addHeaderJWT()
        const response = await axiosInstance.post(uri)
        if(response.status === 200) {
            const subscriptions = response.data
            return subscriptions
        } else {
            throw new Error('Failed to fetch subscriptions belongs to the user. Request failed')
        }
    } catch (error) {
        console.error(error)
    }
}
export default getUserSubscriptions
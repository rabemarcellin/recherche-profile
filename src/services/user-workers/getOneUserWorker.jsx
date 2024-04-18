import { addHeaderJWT } from "../axiosInstance";


/**
 * Get one user worker profile
 * @param {number} userWorkerId 
 */
const getUserWorkerService = async (userWorkerId) => {
    try {
        const uri = `/profiles/${userWorkerId}`
        const axiosInstance = addHeaderJWT()
        const response = await axiosInstance.get(uri)
        if(response.status === 200) {
            const userWorker = response.data
            return userWorker
        } else {
            throw new Error('Failed to fetch the user worker profile information. Request failed')
        }
    } catch (error) {
        console.error(error)
    }
}
export default getUserWorkerService




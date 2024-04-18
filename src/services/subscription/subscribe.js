import { addHeaderJWT } from "../axiosInstance"

const subscribeUserService = async (userId, planId, endDate, phoneNumber) => {
    try {
        const uri = '/subscription'
        const data = { enterprise_id: userId, plan_id: planId, end_in: endDate, phone_number: phoneNumber}

        const axiosInstance = addHeaderJWT()

        const response = await axiosInstance.post(uri, data)
        if(response.status === 200)
        {
            const newSubscription = response.data
            return newSubscription
        }
        else {
            throw new Error('Request fail to do new subscription for user')
        }
    } catch (error) {
       console.error(error) 
    }
} 
export default subscribeUserService
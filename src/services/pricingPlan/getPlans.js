import axiosInstance from "../axiosInstance";


const getPlansService = async () => {
    try {
        const uri = '/pricing_plan'
        const response = await axiosInstance.get(uri)
        if(response.status === 200) {
            const pricingPlans = response.data
            return pricingPlans
        } else {
            throw new Error('Failed to fetch pricing plan')
        }
    } catch (error) {
        console.log(error)
    }
}
export default getPlansService
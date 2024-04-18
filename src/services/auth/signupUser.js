import axiosInstance from "../axiosInstance"

const signupUserService = async (userData) => {
    const uri = '/enterprises'
    const response = await axiosInstance.post(uri, userData)
    if(response.status !== 200) {
        // error on request login 
    }
    const newUser = response.data
    return newUser
}
export default signupUserService
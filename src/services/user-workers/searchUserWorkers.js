import axios from "axios";
import { API_ALGOLIA_SEARCH } from "../../models/constants";

export const searchUserWorkersService = async (filters) => {

    try {
        const uri = '/search'

        const axiosInstance = axios.create({
            baseURL: API_ALGOLIA_SEARCH,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = {queries: filters}
        const response = await axiosInstance.post(uri, data)

        console.log(response)

        if(response.status === 200)
        {
            return response.data
        }
    } catch (error) {
        console.log(error)
        return []
    }
    
}
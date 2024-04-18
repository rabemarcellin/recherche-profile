import { parseFromJSON, parseToJSON } from "../../../helpers/json";
import { saveInLocalStorage, deleteInLocalStorage, getFromLocalStorage } from "../../../helpers/localStorage";
import userAuthActions from "./action.type";


const userWorkerStruct = {
    searchs: {
        filters: [],
        results: []
    },
    seeUser: null
}
const initialUserAuthState = parseFromJSON(getFromLocalStorage('user-workers')) || userWorkerStruct


const userWorkersReducer = (state = initialUserAuthState, action) => {
    const type = action.type

    switch(type) {
        case userAuthActions.SEARCH: {

            try {
                const saveAboutWorkers = parseFromJSON(getFromLocalStorage('user-workers'))
                const data = {
                    searchs: action.payload,
                    seeUser: saveAboutWorkers.seeUser
                }
                saveInLocalStorage('user-workers', parseToJSON(data))
                return data
            } catch (error) {
                console.error(error)
                return state
            }
        }

        case userAuthActions.RESET_SEARCH: {
            // when removing search results, remove also user profile gets/related from search results 
            deleteInLocalStorage("user-workers")
            return userWorkerStruct
        }

        case userAuthActions.GET_ONE: {
            try {
                const saveAboutWorkers = parseFromJSON(getFromLocalStorage('user-workers'))
                const data = {
                    searchs: saveAboutWorkers.searchs,
                    seeUser: action.payload
                }
                saveInLocalStorage('user-workers', parseToJSON(data))
                return data
            } catch (error) {
                console.error(error)
                return state
            }
        }

        default: {
            return state
        }
    }
}
export default userWorkersReducer
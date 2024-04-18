import signupUserService from "../../../services/auth/signupUser";
import getUserAuthService from "../../../services/auth/userAuth";
import getUserWorkerService from "../../../services/user-workers/getOneUserWorker";
import { searchUserWorkersService } from "../../../services/user-workers/searchUserWorkers";
import userWorkersAction from "./action.type";

export const searchUserWorkersAction = (filters) => {
    return async dispatch => {
        const userWorkers = await searchUserWorkersService(filters)
        const payload = {
            filters: filters,
            results: userWorkers
        }
        return dispatch({ type: userWorkersAction.SEARCH, payload })
    }
}

export const resetWorkersSearchAction = () => {
    return dispatch => dispatch({ type: userWorkersAction.RESET_SEARCH })
}

export const getOneWorkerAction = (id) => {
    return async dispatch => {
        const userWorker = await getUserWorkerService(id)
        dispatch({ type: userWorkersAction.GET_ONE, payload: userWorker })
    }
}



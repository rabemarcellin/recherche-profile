import { isArrayEmpty } from "../../../helpers/array"

export const selectSearchFilters = state => {
    const searchFilters = state.userWorkers?.searchs?.filters
    if(Array.isArray(searchFilters) && !isArrayEmpty(searchFilters)) {
        return searchFilters
    }
    return []
}

export const selectUserSearchs = state => {
    const userWorkers = state.userWorkers?.searchs?.results
    if(Array.isArray(userWorkers) && !isArrayEmpty(userWorkers)) {
        return userWorkers
    }
    return []
}

export const selectSeeUser = state => {
    return state.userWorkers?.seeUser
}
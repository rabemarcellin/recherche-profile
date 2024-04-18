import { parseFromJSON, parseToJSON } from "./json"

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key) || null
}

export const saveInLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
        return true
    } catch(err) {
        return false
    }
}

export const appendExistingLocalStorage = (key, valueToAdd) => {
    try {
        const data = parseFromJSON(getFromLocalStorage(key)) || []
        const newData = [...data, valueToAdd]
        saveInLocalStorage(key, parseToJSON(newData))
        return newData
    } catch (error) {
        return false
    }
}

export const deleteInLocalStorage = (key) => {
    try {
        localStorage.removeItem(key)
        return true
    } catch(err) {
        return false
    }
}

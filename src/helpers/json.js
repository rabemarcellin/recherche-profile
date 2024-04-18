/**
 * Object to JSON
 */
export const parseToJSON = (object) => {
    return JSON.stringify(object)
}

/**
 * JSON to Object
 */
export const parseFromJSON = (JSONData) => {
    return JSON.parse(JSONData)
}
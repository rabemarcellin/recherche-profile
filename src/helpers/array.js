/**
 * Fonction de reclassement de l'ordre des items dans un tableau, a l'ordre decroissant
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export const descendingItemsById = (a, b) => {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
}

export const isArrayEmpty = (arrayObject) => {
    return Array.isArray(arrayObject) && arrayObject.length === 0
}

export const removeItemFromArray = (array, itemToRemove) => {
    let index = array.indexOf(itemToRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
    console.log(array)
    return array
}